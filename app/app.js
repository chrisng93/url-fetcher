const express = require('express');
const app = express();
const http = require('http').Server(app);
const environment = require('dotenv');
const mongoose = require('mongoose');
const fetcher = require('./workers/html-fetcher.js');

// Load environment variables
environment.config({ path: './env/development.env' });

// Set up database
mongoose.connect(process.env.DB_URL);

// Initial Configuration, Static Assets, & View Engine Configuration
require('./config/initialize.js')(app, express);

// API Routes
require('./routes/api-routes.js')(app);
app.get('/*', (req, res) => {
  var msg = 'Please send \'POST\' requests to \'/api/urls/submit\' and \'GET\' requests to \'/api/urls/status\''
  res.status(404).send(msg);
});

// Set fetcher to run at 5 second intervals
setInterval(fetcher.htmlFetcher, 5000);

http.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}...`);
});
