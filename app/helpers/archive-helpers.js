const fs = require('fs');
const path = require('path');
const http = require('http');
const ObjectId = require('mongodb').ObjectID;
const Url = require('../models/UrlModel.js');

const htmlQueue = path.join(__dirname, '../html-queue.txt');

module.exports = {
  queueUrl: (url) => {
    // Insert URL into job's queue
    const formattedUrl = `${url} \n`;
    fs.appendFile(htmlQueue, formattedUrl, (err) => {
      if (err) {
        throw new Error(`Error adding url to queue: ${err}`);
      }
    });
  },

  readListOfUrls: (cb) => {
    // Put all URLs in the job queue into an array
    fs.readFile(htmlQueue, (err, data) => {
      if (err) {
        throw new Error(`Error reading the list of urls: ${err}`);
      }
      let urls = data.toString('utf8');
      urls = urls.split('\n');
      cb(urls);
      return urls;
    });
  },

  downloadUrls: (urls, cb) => {
    // Go to websites and grab the URL data
    let counter = 0;
    urls.forEach((datum) => {
      // Each line from job queue comes with both the URL and id for database querying
      // Just in case there are more than one requests for a single URL
      const data = datum.split(',');
      const url = data[0];
      let jobId = data[1];
      let html = '';
      if (jobId) {
        // jobId comes with extra space at the end, so need to trim it
        jobId = jobId.trim();
        http.get(`http://${url}`, (res) => {
          console.log(`Archiving ${url}`);
          res.on('data', (chunk) => {
            html += chunk;
            Url.findOne({ _id: ObjectId(jobId) }, (err, queriedUrl) => {
              if (err) {
                throw new Error(`Error inserting ${url} data into database: ${err}`)
              }
              // Update line item information
              queriedUrl.url_data = html;
              queriedUrl.status = 'Fetched';
              queriedUrl.save();
            });
          });
        });
      }
      counter++;
      if (counter === urls.length) {
        cb();
      }
    });
  },
};
