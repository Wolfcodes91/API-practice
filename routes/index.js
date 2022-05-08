var express = require('express');
const Logger = require('nodemon/lib/utils/log');
var router = express.Router();
const axios = require('axios');
const URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/drinks', (req, res, next) => {
  axios.get(URL)
  .then(response => {
    res.send(response.data);
    console.log(response.data);
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
})

module.exports = router;
