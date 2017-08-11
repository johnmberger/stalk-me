'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

  const json = require('../../scraper/output.json');
  var moment = require('moment-timezone');
  moment().tz('America/Denver').format();

  let data = Object.keys(json).map(key => json[key]);
  let ratings = data.map(checkIn => checkIn.rating_score).filter(rating => rating > 0);
  let styles = data.map(checkIn => checkIn.beer.beer_style);

  let avgRating = parseFloat((ratings.reduce((a, b) => a + b) / ratings.length).toFixed(2));
  let checkinCount = data.length;

  let days = [];
  let months = [];
  let hours = [];

  data.map(checkIn => {
    let day = moment(checkIn.created_at).format('dddd');
    let month = moment(checkIn.created_at).format('MMMM');
    let hour = moment(checkIn.created_at).format('HH');
    days.push(day);
    months.push(month);
    hours.push(hour);
  });

  let styleCount = countInstances(styles);

  let ratingCount = countInstances(ratings);
  ratingCount = ratingCount.sort((a, b) => a.name - b.name);

  let dayCount = countInstances(days);
  dayCount = putDaysInOrder(dayCount);

  let monthCount = countInstances(months);
  monthCount = putMonthsInOrder(monthCount);

  let hourCount = countInstances(hours);
  hourCount = hourCount.sort((a, b) => parseInt(a.name) - parseInt(b.name));

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

// helper functions

function countInstances(list) {
  return [...new Set(list)]
    .map(name => {
      let obj = { name, count: 0 };
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
  let output = [];
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
  let output = [];
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
