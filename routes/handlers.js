const express = require('express');
const axios = require('axios');
const con = require('../config/connection');
const orm = require('../config/orm');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/list-products', (req, res) => {
  orm.selectAll(function (error, data) {
    res.render('list-products', { data, cart: true });
  });
});

router.get('/add-to-cart', (req, res) => {
  orm.selectCartAll(function (error, data) {
    res.send(data);
  });
});

module.exports = router;
