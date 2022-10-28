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
app.post('/task', async (req, res) => {
  console.log('inside post /task');
  console.log('req.body', req.body)
  const { name } = req.body;
  const newTask = new Task({ name: name });
  await newTask.save(function (err) {
    if (err) return res.status(404).json({message: "failed to save newTask"})
    // saved!
  });
  res.status(200).json(newTask);
})

//READ
app.get('/task', async (req, res) => {
  console.log('inside get /task');
  try {
    const allTasks = await Task.find({});
    return res.status(200).json(allTasks);
  } catch (error) {
    return console.log(error);
  }
})

//UPDATE
app.patch('/task', async (req, res) => {
  console.log('inside patch /task');
  try {
    const { _id, name } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(_id, {
      name: name
    });
    console.log('updatedTask', updatedTask);
    return res.status(200).json(updatedTask);
  } catch (error) {
    return console.log(error);
  }
})

//DELETE
app.delete('/task', async (req, res) => {
  console.log('inside delete /task');
  try {
    const { _id } = req.body;
    const deletedTask = await Task.findByIdAndDelete(_id);
    console.log('deletedTask', deletedTask);
    return res.status(200).json(deletedTask);
  } catch (error) {
    return console.log(error);
  }
})

//UNKNOWN ROUTE HANDLER
app.use((req, res) => {
  res.send('unknown path!')
})

//APP LISTENING ON PORT
app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
})