require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

// Your routes will go here

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));
const indexRoutes = require('./routes/users');

app.use('/', indexRoutes);
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));
