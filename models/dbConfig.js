const mongoose = require('mongoose');

/*
mongoose.connect('mongodb://localhost/node-api')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
*/

mongoose.connect(
    "mongodb://localhost:27017/node-api",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (!err) console.log("Mongodb est connecté");
      else console.log("Connection Mongodb error :" + err);
    }
  )