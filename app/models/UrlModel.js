const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  status: String,
  submitted_url: String,
  url_data: String,
},
  {
    timestamps: { createdAt: 'created_at' }
  }
);

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
