'use strict';

const express = require('express');
const router = express.Router();
const https = require('https');
const listUrl = 'https://api.untappd.com/v4/user/checkins/mustached';
const topTenUrl = 'https://api.untappd.com/v4/user/beers/mustached';
const clientId = 'client_id=xxxx';
const clientSecret = 'client_secret=xxxx';

router.get('/beer-list', (req, res, next) => {
  https.get(`${listUrl}?${clientId}&${clientSecret}`, (response) => {
    let body = '';
    response.on('data', (d) => {
      body += d;
    });
    response.on('end', () => {
      let parsed = JSON.parse(body);
      res.status(200).json(parsed);
    });
  });
});

router.get('/top-ten', (req, res, next) => {
  let param1 = 'limit=10';
  let param2 = 'sort=highest_rated_you';

  https.get(`${topTenUrl}?${clientId}&${clientSecret}&${param1}&${param2}`, (response) => {
    let body = '';
    response.on('data', (d) => {
      body += d;
    });
    response.on('end', () => {
      let parsed = JSON.parse(body);
      res.status(200).json(parsed);
    });
  });
});

module.exports = router;
