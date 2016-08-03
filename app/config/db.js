const MongoClient = require('mongodb').MongoClient;

// Connect to database
MongoClient.connect(process.env.DB_URL, (err, db) => {
  if (err) {
    throw new Error(`Error connecting to the database: ${err}`);
  } else {
    console.log('Successfully connected to database');
  }
});
