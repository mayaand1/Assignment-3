const express = require('express');
const router = express.Router();
const Candy = require('../models/candy');

// Add candy
router.post('/add', (req, res) => {
  const newCandy = new Candy({
    name: req.body.name,
    flavor: req.body.flavor,
    price: req.body.price,
    stock: req.body.stock
  });
  newCandy.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

// Read (display list of candies)
router.get('/', (req, res) => {
  Candy.find()
    .then(candies => {
      res.render('candies', { candies });
    })
    .catch(err => console.log(err));
});

// Update candy
router.post('/update/:id', (req, res) => {
  Candy.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

// Delete candy
router.post('/delete/:id', (req, res) => {
  Candy.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

module.exports = router;
