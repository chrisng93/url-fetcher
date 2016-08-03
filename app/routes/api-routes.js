const UrlController = require('../controllers/UrlController.js');

module.exports = (app) => {
  app.post('/api/urls/submit', UrlController.submitUrl);
  app.get('/api/urls/status', UrlController.checkStatus);
};
