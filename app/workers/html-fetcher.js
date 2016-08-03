const fs = require('fs');
const path = require('path');
const archiveHelper = require('../helpers/archive-helpers.js');

module.exports = {
  htmlFetcher: () => {
    // Read from job queue and download data from URLs
    const unfetched = [];
    archiveHelper.readListOfUrls((data) => {
      data.forEach((url) => {
        unfetched.push(url);
      });
      archiveHelper.downloadUrls(unfetched, () => {
        // Empty out the queue
        const htmlQueue = path.join(__dirname, '../html-queue.txt');
        fs.writeFile(htmlQueue, '', () => { console.log('Finished with queue') });
      });
    });
  },
};
