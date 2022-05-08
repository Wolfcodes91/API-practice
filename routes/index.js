var express = require('express');
const Logger = require('nodemon/lib/utils/log');
var router = express.Router();
const axios = require('axios');
var url = require('url');
let liquor;
const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=`


function getPage(liquorChoice, res) {liquor = liquorChoice;
  console.log(liquor)
axios.get(`${URL}${liquor}`)
.then(response => {
  const drinkData = response.data;
  res.send(drinkData)
})
.catch(error => {
  console.log(error);
});
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/drinks/vodka', (req, res, next) => {
  const address = url.parse(req.url, true).path.split('/')[3]
  getPage(address, res)
})
router.get('/api/drinks/tequila', (req, res, next) => {
  const address = url.parse(req.url, true).path.split('/')[3]
  getPage(address, res)
})
router.get('/api/drinks/rum', (req, res, next) => {
  const address = url.parse(req.url, true).path.split('/')[3]
  getPage(address, res)
})
router.get('/api/drinks/gin', (req, res, next) => {
  const address = url.parse(req.url, true).path.split('/')[3]
  getPage(address, res)
})

module.exports = router;
