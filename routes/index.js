var express = require('express');
var router = express.Router();
const axios = require('axios');
const _ = require('lodash');
const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=`;
let drinkData = [];

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

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function errorMessage(res) {
  res.send(
    {
    "message": "no tags exist",
    }
    )
    console.error('no tags exist')
}

function getPage(liquorChoice, res) {
  axeHit(liquorChoice)
  const sortedDrinks = _.sortBy(concatData(drinkData), 'strDrink')
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

function axeHit(liquorChoice) {
  liquorChoice.forEach((arg) => {
    axios.get(`${URL}${arg}`)
    .then(response => {
      drinkData.push(response.data.drinks)
    })
    .catch(error => {
      console.log(error);
    });
  })
}

function concatData(drinkData) {
  if (drinkData.length === 2) {
    drinkData = drinkData[0].concat(drinkData[1])
  }
  else if (drinkData.length === 3) {
    drinkData = drinkData[0].concat(drinkData[1]).concat(drinkData[2])
  }
  else if (drinkData.length === 4) {
    drinkData = drinkData[0].concat(drinkData[1]).concat(drinkData[2]).concat(drinkData[3])
  }
  return drinkData
}

module.exports = router;