var express = require('express');
var router = express.Router();
const axios = require('axios');
var url = require('url');
const _ = require('lodash')
let liquor;
const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=`;


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

function getPageAdvanced(liquor1, liquor2, res) {
let drinkData = []
axios.get(`${URL}${liquor1}`)
.then(response => {
  drinkData.push(response.data.drinks)
})
axios.get(`${URL}${liquor2}`)
.then(response => {
  drinkData.push(response.data.drinks)
  let semifinalDrinkData = drinkData[0].concat(drinkData[1])
  let finalDrinkData = {drinks: semifinalDrinkData}
  const sortedDrinks = _.sortBy(finalDrinkData.drinks, 'strDrink')
  finalDrinkData = {drinks: sortedDrinks}
  res.send(finalDrinkData)
})
.catch(error => {
  console.log(error);
});
}

function getPageSuperAdvanced(liquor1, liquor2, liquor3, res) {
let drinkData = []
axios.get(`${URL}${liquor1}`)
.then(response => {
  drinkData.push(response.data.drinks)
})
axios.get(`${URL}${liquor2}`)
.then(response => {
  drinkData.push(response.data.drinks)
})
axios.get(`${URL}${liquor3}`)
.then(response => {
  drinkData.push(response.data.drinks)
  let demifinalDrinkData = drinkData[0].concat(drinkData[1])
  let semifinalDrinkData = demifinalDrinkData.concat(drinkData[2])
  let finalDrinkData = {drinks: semifinalDrinkData}
  const sortedDrinks = _.sortBy(finalDrinkData.drinks, 'strDrink')
  finalDrinkData = {drinks: sortedDrinks}
  res.send(finalDrinkData)
})
.catch(error => {
  console.log(error);
});
}

function getPageSuperDuperAdvanced(liquor1, liquor2, liquor3, liquor4, res) {
let drinkData = []
axios.get(`${URL}${liquor1}`)
.then(response => {
  drinkData.push(response.data.drinks)
})
axios.get(`${URL}${liquor2}`)
.then(response => {
  drinkData.push(response.data.drinks)
})
axios.get(`${URL}${liquor3}`)
.then(response => {
  drinkData.push(response.data.drinks)
})
axios.get(`${URL}${liquor4}`)
.then(response => {
  drinkData.push(response.data.drinks)
  let demifinalDrinkData = drinkData[0].concat(drinkData[1])
  let cremifinalDrinkData = demifinalDrinkData.concat(drinkData[2])
  let semifinalDrinkData = cremifinalDrinkData.concat(drinkData[3])
  let finalDrinkData = {drinks: semifinalDrinkData}
  const sortedDrinks = _.sortBy(finalDrinkData.drinks, 'strDrink')
  finalDrinkData = {drinks: sortedDrinks}
  res.send(finalDrinkData)
})
.catch(error => {
  console.log(error);
});
}

// /* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/drinks/:drinkId/', (req, res) => {
  const liquorChoice = req.params.drinkId
  getPage(liquorChoice, res)
})

router.get('/api/drinks/:drinkId/:drinkId2', (req, res) => {
  console.log('Advanced')
  let liquorChoice = [];
  liquorChoice.push(req.params.drinkId)
  liquorChoice.push(req.params.drinkId2)
  getPageAdvanced(liquorChoice[0], liquorChoice[1], res)
})

router.get('/api/drinks/:drinkId/:drinkId2/:drinkId3', (req, res) => {
  console.log('Super Advanced')
  let liquorChoice = [];
  liquorChoice.push(req.params.drinkId)
  liquorChoice.push(req.params.drinkId2)
  liquorChoice.push(req.params.drinkId3)
  getPageSuperAdvanced(liquorChoice[0], liquorChoice[1], liquorChoice[2], res)
})

router.get('/api/drinks/:drinkId/:drinkId2/:drinkId3/:drinkId4', (req, res) => {
  console.log('Super Duper Advanced')
  let liquorChoice = [];
  liquorChoice.push(req.params.drinkId)
  liquorChoice.push(req.params.drinkId2)
  liquorChoice.push(req.params.drinkId3)
  liquorChoice.push(req.params.drinkId4)
  getPageSuperDuperAdvanced(liquorChoice[0], liquorChoice[1], liquorChoice[2], liquorChoice[3], res)
})


module.exports = router;
