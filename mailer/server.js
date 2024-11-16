const express = require('express');
const appRoute = require('./routes/routes.js');

const app = express();
const PORT =  process.env.PORT || 5000;

app.use(express.json());

app.use('/api', appRoute);

//console.log(appRoute);

app.listen(PORT, () => {
  console.log('Server is running on port 5000');
});