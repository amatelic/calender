"use strict";
var test = require('tape');
var Calender = require('../dis/calender');
test('check default calnedr', (t) => {
  t.plan(2);
  var dDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var dMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
   'August', 'September', 'October', 'November', 'December'];
  var calender = new Calender();
  t.deepEqual(calender.getMonths(), dMonths);
  t.deepEqual(calender.getDays(), dDays);
});

test('check calender with parameters', (t) => {
  t.plan(2);
  var nDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  var nMonths = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  var calender = new Calender({
    days: nDays,
    months: nMonths,
  });
  t.deepEqual(calender.getMonths(), nMonths);
  t.deepEqual(calender.getDays(), nDays);
});

test('Get all days in a month', (t) => {
  t.plan(1);
  var days = [
    [undefined, undefined, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31],
  ];
  var calender = new Calender();
  t.deepEqual(calender.getDaysInMonth(2, 2016), days);
});
