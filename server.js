const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

//SERVE STATIC ASSETS
app.use('/', express.static(path.join(__dirname, 'public')));

//ROUTES
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// })



//UNKNOWN ROUTE HANDLER
app.use((req, res) => {
  res.send('unknown path!')
})

//APP LISTENING ON PORT
app.listen(port, () => {
  console.log(`Server listening to port ${port}`);
})