'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

  const json = require('../../scraper/output.json');
  const moment = require('moment-timezone');
  moment().tz('America/Denver').format();

  const data = Object.keys(json).map(key => json[key]);
  const ratings = data.map(checkIn => checkIn.rating_score).filter(rating => rating > 0);
  const styles = data.map(checkIn => checkIn.beer.beer_style);

  const avgRating = parseFloat((ratings.reduce((a, b) => a + b) / ratings.length).toFixed(2));
  const checkinCount = data.length;

  const days = [];
  const months = [];
  const hours = [];

  data.map(checkIn => {
    const day = moment(checkIn.created_at).format('dddd');
    const month = moment(checkIn.created_at).format('MMMM');
    const hour = moment(checkIn.created_at).format('HH');
    days.push(day);
    months.push(month);
    hours.push(hour);
  });

  const styleCount = countInstances(styles);
  const ratingCount = countInstances(ratings).sort((a, b) => a.name - b.name);
  const dayCount = putDaysInOrder(countInstances(days));
  const monthCount = putMonthsInOrder(countInstances(months));
  const hourCount = countInstances(hours).sort((a, b) => parseInt(a.name) - parseInt(b.name));

  res.status(200).json({
    checkinCount,
    avgRating,
    styleCount,
    ratingCount,
    dayCount,
    monthCount,
    hourCount
  });

});

module.exports = router;

// helpers

function countInstances(list) {
  return [...new Set(list)]
    .map(name => {
      const obj = { name, count: 0 };
      list.forEach(nonUniqueStyle => {
        if (nonUniqueStyle === name) {
          obj.count++;
        }
      });
      return obj;
    })
    .sort((a, b) => b.count - a.count);
}

function putDaysInOrder(arr) {
  const output = [];
  arr.forEach(day => {
    if (day.name === 'Monday') {
      output[0] = day;
    } else if (day.name === 'Tuesday') {
      output[1] = day;
    } else if (day.name === 'Wednesday') {
      output[2] = day;
    } else if (day.name === 'Thursday') {
      output[3] = day;
    } else if (day.name === 'Friday') {
      output[4] = day;
    } else if (day.name === 'Saturday') {
      output[5] = day;
    } else if (day.name === 'Sunday') {
      output[6] = day;
    }
  });
  return output;
}

function putMonthsInOrder(arr) {
  const output = [];
  arr.forEach(day => {
    if (day.name === 'January') {
      output[0] = day;
    } else if (day.name === 'February') {
      output[1] = day;
    } else if (day.name === 'March') {
      output[2] = day;
    } else if (day.name === 'April') {
      output[3] = day;
    } else if (day.name === 'May') {
      output[4] = day;
    } else if (day.name === 'June') {
      output[5] = day;
    } else if (day.name === 'July') {
      output[6] = day;
    } else if (day.name === 'August') {
      output[7] = day;
    } else if (day.name === 'September') {
      output[8] = day;
    } else if (day.name === 'October') {
      output[9] = day;
    } else if (day.name === 'November') {
      output[10] = day;
    } else if (day.name === 'December') {
      output[11] = day;
    }
  });
  return output;
}
