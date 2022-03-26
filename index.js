const express = require('express');
const app = express();
require('./models/dbConfig')

const booksRoutes = require ('./routes/booksController')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

//Rendre api public
const cors = require('cors')



app.use(bodyParser.json())
app.use(cors())
app.use('/', booksRoutes)

app.listen(3000, () => console.log('Server started: 3000'));