const ObjectId = require('mongodb').ObjectID;
const Url = require('../models/UrlModel.js');
const archiveHelper = require('../helpers/archive-helpers.js');
const urlHelper = require('../helpers/url-helpers.js');

module.exports = {
  submitUrl: (req, res) => {
    // Handle requests to get URL data
    const url = req.query.url;
    // Validate URL before proceeding
    if (!urlHelper.isValidUrl(url)) {
      const msg = 'Please submit a correct url of form "www.website.domain"';
      res.status(400).send(msg);
    } else {
      Url.find({}, (err, data) => {
        if (err) {
          res.status(500).send(`Error fetching data from url table: ${err}`);
        }
        const curr = new Url({
          status: 'Not fetched',
          submitted_url: url,
          url_data: null,
        });
        curr.save((err) => {
          if (err) {
            res.status(500).send(`Error saving ${url} into database: ${err}`);
          }
          // Put URL into job queue
          var queuedUrl = `${url},${curr._id}`
          archiveHelper.queueUrl(queuedUrl);
          const jobId = curr.get('_id');
          const idResponse = { jobId: curr.get('_id') };
          res.status(201).send(idResponse);
        });
      });
    }
  },

  checkStatus: (req, res) => {
    // Handle requests to check status of URL data
    const jobId = req.query.job_id;
    Url.findOne({ _id: ObjectId(jobId) }, (err, data) => {
      if (err) {
        res.status(500).send(`Error checking the status of job ${jobId}, with error: ${err}`);
      }
      if (data) {
        // Check to see if worker has gotten the URL's data yet
        if (data.get('status') === 'Fetched') {
          const html = data.get('url_data');
          const urlResponse = { html: html };
          res.status(200).send(urlResponse);
        } else {
          const msg = 'Data not fetched yet. The worker will be on it!';
          res.status(200).send(msg);
        }
      } else {
        const msg = 'This id does not exist. Please submit a valid id.';
        res.status(200).send(msg);
      }
    });
  },
};
