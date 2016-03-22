var Model = require('./model');
"use strict";

var dates = {
  months: ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'],
  days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  now: new Date(),
  today: (new Date()).getDate(),
};

class Calender  extends Model{
  constructor(config) {
    super(config = {});
    this.url = 'http://localhost:3000';
    this.date  = {};
    Object.assign(this.date, dates);
  }

  getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    var tmp = new Array(date.getDay());
    tmp.fill(undefined, 0, date.getDay());
    while (date.getMonth() === month) {
      tmp.push(new Date(date).getDate());
      if (tmp.length >= 7) {
        days.push(tmp);
        tmp = [];
      }

      date.setDate(date.getDate() + 1);

    }

    days.push(tmp);
    return days;
  }

  getNow() {  return this.date.now; }

  getToday() { return this.date.today; }

  getMonths() { return this.date.months; }

  getDays() { return this.date.days; }

};

module.exports = Calender;
