var express = require('express');
var router = express.Router();
const axios = require('axios');
// var url = require('url');
const _ = require('lodash')
const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=`;
let drinkData = []

function axeHit(liquorChoice) {
  console.log(liquorChoice)
  liquorChoice.forEach(async (arg) => {
    axios.get(`${URL}${arg}`)
    .then(response => {
      drinkData.push(response.data.drinks)
    })
    .catch(error => {
      console.log(error);
    });
  })
return drinkData
}

function getPage(res, liquorChoice) {
  axeHit(liquorChoice)
  let semifinalDrinkData = drinkData;
  if (drinkData.length === 1) {
    res.send(drinkData)
    return
  }
  else if (drinkData.length === 2) {
    semifinalDrinkData = drinkData[0].concat(drinkData[1])
  }
  else if (drinkData.length === 3) {
    semifinalDrinkData = drinkData[0].concat(drinkData[1]).concat(drinkData[2])
  }
  else if (drinkData.length === 4) {
    semifinalDrinkData = drinkData[0].concat(drinkData[1]).concat(drinkData[2]).concat(drinkData[3])
  }
  let sortedDrinks = _.sortBy(semifinalDrinkData, 'strDrink')
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

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/drinks', async (req, res) => {
  const {tags} = req.query
  if (tags) { 
    let liquorChoice = tags.split(',')
    await getPage(res, liquorChoice)
  }
  else {
    console.error('no tags exist')
  }
})

module.exports = router;