var express = require('express');
var router = express.Router();
const axios = require('axios');
const {sortBy} = require('lodash');
const drinksURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=`;

router.get('/api/drinks', (req, res) => {
  const {tags} = req.query
  if (tags) { 
    const liquorChoice = tags.split(',')
    getPage(liquorChoice, res)
  }
  else {
    errorMessage(res)
  }
})

function errorMessage(res) {
  res.send(
    {
    "message": "no tags exist",
    }
    )
    console.error('no tags exist')
}

async function getPage(liquorChoice, res) {
  const dbResponse = await getDrinksData(liquorChoice)
  console.log(dbResponse)
  const sortedDrinks = sortBy(dbResponse, 'strDrink')
  const uniqueDrinkData = sortedDrinks.reduce((acc, current) => {
    const x = acc.find(item => item['strDrink'] === current['strDrink']);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);
  let finalDrinkData = {drinks: uniqueDrinkData}
  res.send(finalDrinkData)
}

async function getDrinksData(liquorChoice) {
  try {
    const promiseArray = liquorChoice.map((liquor) => axios.get(`${drinksURL}${liquor}`))
    const response = await Promise.all(promiseArray)
    const drinksArr = response.reduce((previous, current) => {
      previous.push(...current.data.drinks)
      return previous
    }, [])
    return drinksArr
  }
  catch(err) {
    console.error(err, 'error')
  }
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;