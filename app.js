const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Candy = require('./models/candy');

app.get('/candies', async (req, res) => {
    try {
      const candies = await Candy.find(); // Fetch all candies from the database
      res.render('candies', { candies }); // Pass candies to the candies.ejs view
    } catch (error) {
      console.error("Error fetching candies:", error);
      res.status(500).send('Error fetching candies'); // Send error response
    }
  });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files like CSS
app.use(express.static(path.join(__dirname, 'public')));

// Use express middleware to parse POST form data
app.use(express.urlencoded({ extended: true }));

// Route to render the index page
app.get('/', (req, res) => {
  res.render('index'); // This will render index.ejs
});

// Route to render the candy inventory page and fetch candy data from MongoDB
app.get('/candies', async (req, res) => {
  try {
    const candies = await Candy.find(); // Fetch candies from database
    res.render('candies', { candies }); // Pass candies to the candies.ejs view
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching candies');
  }
});

// Route to handle adding a candy
app.post('/candies/add', async (req, res) => {
  const { name, flavor, price, stock } = req.body;
  const newCandy = new Candy({ name, flavor, price, stock });
  await newCandy.save();
  res.redirect('/candies');
});

// Route to handle updating a candy (if you want to handle editing)
app.post('/candies/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name, flavor, price, stock } = req.body;
  await Candy.findByIdAndUpdate(id, { name, flavor, price, stock });
  res.redirect('/candies');
});

// Route to handle deleting a candy
app.post('/candies/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Candy.findByIdAndDelete(id);
  res.redirect('/candies');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


