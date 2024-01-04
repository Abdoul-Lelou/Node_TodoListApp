const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

var cors = require('cors')

const routes = require('./routes/routes');

const databaseLink = process.env.DATABASE_URL

mongoose.connect(databaseLink,{ useNewUrlParser: true, useUnifiedTopology: true }, () => {});

const database = mongoose.connection

const app = express();
app.use(cors());
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*"); 
   // res.header("Access-Control-Allow-Origin", "https://react-todo-list-app-fun.vercel.app"); 

   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
   next();
});

app.use(express.json());

app.use('/api/v1', routes)


database.on('error', (error) => {
   console.log(error)
})

database.once('connected', () => {})

app.listen(3001, () => {})
