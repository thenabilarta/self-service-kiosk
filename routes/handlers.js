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

router.get('/get-order', (req, res) => {
  res.send([
    {
      id: 1,
      product_name: 'Pisang',
      product_qty: 2,
      product_price: 4500,
    },
    {
      id: 2,
      product_name: 'Pepaya',
      product_qty: 3,
      product_price: 12000,
    },
  ]);
});

module.exports = router;
