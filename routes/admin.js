const path = require('path');

const express = require('express');

const routes = express.Router();

routes.get('/add-products', (req, res, next) => {
  // res.send('<form action="/admin/add-products" method="POST"><input type="text" name="title"><button type="submit">Add</button></form>');

  // res.sendFile('/views/add-product.html');
  res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));


});

routes.post('/add-products', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports= routes;