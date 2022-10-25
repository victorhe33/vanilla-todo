const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const dotenv = require('dotenv').config();
const Task = require('./Task');

//MONGOOSE
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb+srv://victorhe33:${process.env.MONGOPASS}@cluster0.ugidgmi.mongodb.net/?retryWrites=true&w=majority`, {
    dbName: "todo"
  });
  console.log('MongoDB connected')
}

//BODY PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//SERVE STATIC ASSETS
app.use('/', express.static(path.join(__dirname, 'public')));

//ROUTES
//CREATE
app.post('/task', (req, res) => {
  const { name } = req.body;
  const newTask = new Task({ name: name });
  newTask.save(function (err) {
    if (err) return res.status(404).json({message: "failed to save newTask"})
    // saved!
  });
  
  res.status(200).json(newTask)
})

//READ

//UPDATE

//DELETE

//UNKNOWN ROUTE HANDLER
app.use((req, res) => {
  res.send('unknown path!')
})

//APP LISTENING ON PORT
app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
})