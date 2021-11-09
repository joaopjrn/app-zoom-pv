const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const materiasRoutes = require('./routes/materias');
const aulasRoutes = require('./routes/aulas');
const usuariosRoutes = require('./routes/usuarios');
const anotacoesRoutes = require('./routes/anotacoes');
// const userRoutes = require('./routes/user');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.use("/images", express.static(path.join("backend/images")));


//d8T0M0vYlVspKwu8 mdb pw
mongoose.connect("mongodb+srv://joaomdb:"+process.env.MONGO_ATLAS_PW+"@cluster0.xlkqz.mongodb.net/app-zoom?retryWrites=true&w=majority")
.then(() => {
  console.log('Connected to DB')
})
.catch(()=> {
  console.log('Connection Failed')
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, materias');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use("/api/materia", materiasRoutes);
app.use("/api/aula", aulasRoutes);
app.use("/api/usuario", usuariosRoutes);
app.use("/api/anotacao", anotacoesRoutes);
// app.use("/api/user", userRoutes);

module.exports = app;
