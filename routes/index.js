var express = require('express');
var router = express.Router();
const axios = require('axios');
var url = require('url');
const _ = require('lodash')
let liquor;
let drinkData = [];
const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=`;

function axeHit(liquor) {
  axios.get(`${URL}${liquor}`)
.then(response => {
  drinkData.push(response.data.drinks)
})
.catch(error => {
  console.log(error);
});
}

function getPage(liquorChoice, res) {liquor = liquorChoice;
  axios.get(`${URL}${liquor}`)
.then(response => {
  const drinkData = response.data;
  res.send(drinkData)
})
.catch(error => {
  console.log(error);
});
}

function loop(liquorChoice, req) {
  for (let i = 0; i < Object.keys(req.params).length; i++) {
    liquorChoice.push(req.params[`drinkId${i}`])
  }
}

function getPageAdvanced(liquor1, liquor2, res) {
axios.get(`${URL}${liquor1}`)
axeHit(liquor1)
axios.get(`${URL}${liquor2}`)
.then(response => {
  drinkData.push(response.data.drinks)
  let semifinalDrinkData = drinkData[0].concat(drinkData[1])
  let sortedDrinks = _.sortBy(semifinalDrinkData, 'strDrink')
  let finalDrinkData = {drinks: sortedDrinks}
  res.send(finalDrinkData)
})
.catch(error => {
  console.log(error);
});
}

function getPageSuperAdvanced(liquor1, liquor2, liquor3, res) {
axeHit(liquor1)
axeHit(liquor2)
axios.get(`${URL}${liquor3}`)
.then(response => {
  drinkData.push(response.data.drinks)
  let semifinalDrinkData = drinkData[0].concat(drinkData[1]).concat(drinkData[2])
  let sortedDrinks = _.sortBy(semifinalDrinkData, 'strDrink')
  let finalDrinkData = {drinks: sortedDrinks}
  res.send(finalDrinkData)
})
.catch(error => {
  console.log(error);
});
}

function getPageSuperDuperAdvanced(liquor1, liquor2, liquor3, liquor4, res) {
axeHit(liquor1)
axeHit(liquor2)
axeHit(liquor3)
axios.get(`${URL}${liquor4}`)
.then(response => {
  drinkData.push(response.data.drinks)
  let semifinalDrinkData = drinkData[0].concat(drinkData[1]).concat(drinkData[2]).concat(drinkData[3])
  let sortedDrinks = _.sortBy(semifinalDrinkData, 'strDrink')
  let finalDrinkData = {drinks: sortedDrinks}
  res.send(finalDrinkData)
})
.catch(error => {
  console.log(error);
});
}

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/drinks/:drinkId/', (req, res) => {
  let liquorChoice = req.params.drinkId
  getPage(liquorChoice, res)
})

router.get('/api/drinks/:drinkId0/:drinkId1', (req, res) => {
  let liquorChoice = [];
  loop(liquorChoice, req)
  getPageAdvanced(liquorChoice[0], liquorChoice[1], res)
})

router.get('/api/drinks/:drinkId0/:drinkId1/:drinkId2', (req, res) => {
  let liquorChoice = [];
  loop(liquorChoice, req)
  getPageSuperAdvanced(liquorChoice[0], liquorChoice[1], liquorChoice[2], res)
})

router.get('/api/drinks/:drinkId0/:drinkId1/:drinkId2/:drinkId3', (req, res) => {
  let liquorChoice = [];
  loop(liquorChoice, req)
  getPageSuperDuperAdvanced(liquorChoice[0], liquorChoice[1], liquorChoice[2], liquorChoice[3], res)
})

module.exports = router;
