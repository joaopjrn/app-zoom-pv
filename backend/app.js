const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const materiasRoutes = require('./routes/materias');
// const userRoutes = require('./routes/user');
const path = require('path');

const app = express();
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

// app.use("/images", express.static(path.join("backend/images")));


//d8T0M0vYlVspKwu8 mdb pw
mongoose.connect("mongodb+srv://joaomdb:d8T0M0vYlVspKwu8@cluster0.xlkqz.mongodb.net/app-zoom?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to DB')
})
.catch(()=> {
  console.log('Connection Failed')
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use("/materia", materiasRoutes);
// app.use("/api/user", userRoutes);

module.exports = app;
