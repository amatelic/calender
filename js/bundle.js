(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
class Calender {
  constructor(config) {
    config = config || {};
    this.months = config.months || ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    this.days = config.days || ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.now = new Date();
    this.today = (new Date()).getDate();
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

  getMonths() {
    return this.months;
  }

  getDays() {
    return this.days;
  }

};

module.exports = Calender;

},{}],2:[function(require,module,exports){
"use strict";
var View = require('./view');
var ToastView = require('./toastView');
var h = require('./helpers');
var valueExist  = h.valueExist;

class CalenderView extends View {
  constructor(obj) {
    super(obj);
    console.log(this);
    // this.toast = new ToastView({el: '.toast'});
  }

  events() {
    return {
      'click .right': 'changeMonth',
      'click .left': 'changeMonth',
      'click .calender__body': 'show',
    };
  }

  template(obj) {
    let month = obj.now.getMonth();
    let year = obj.now.getFullYear();
    return `
        <h1 class="calender__title">Calender</h1>
        <table class="calender__table">
          <thead class="calender__thead">
            <tr>
              <td class="year" colspan="7"><h3>${year}</h3></td>
            </tr>
            <tr>
              <td data-direction="-1" class="left" style="text-align:left;" ><</td>
              <td class="month" colspan="5">${obj.getMonths()[month]}</td>
              <td data-direction="1" class="right" style="text-align:right;" >></td>
            <tr>
            <tr class="calender__header">
              <td>${obj.getDays().join('</td><td>')}</td>
            </tr>
          </thead>
          <tbody class="calender__body">
            ${this.createTables(this.data.getDaysInMonth(month, year))}
          </tbody>
    `;
  }

  renderAfter() {
    //have to get better solution
    fetch('http://localhost:3000/dates')
      .then(data => data.json())
      .then(this.displayNotifications.bind(this));
  }

  displayNotifications(data) {
    this.toast.addData(data.text);
    let table = Array.from(this.$el.querySelector('tbody').querySelectorAll('td'));
    let days = data.days;

    table.filter((el) => {
      let day = parseInt(el.innerHTML);
      return valueExist(days, day) || day === this.data.today;
    }).map(this.addCalenderEvents.bind(data));

  }

  addCalenderEvents(el) {
    let days = this.days; //binding the array with the bind function line 55
    let day = parseInt(el.innerHTML);
    let className = (valueExist(days, day))
      ? 'calender__events' : 'calender__pointer';
    el.dataset.id = days.indexOf(day);
    el.classList.add(className);
  }

  updateDOM(month, year) {
    this.$el.querySelector('.month').innerHTML = this.data.months[month];
    this.$el.querySelector('.year').innerHTML = `<h3>${year}</h3>`;
    this.$el.querySelector('tbody').innerHTML = this.createTables(this.data.getDaysInMonth(month, year));
  }
  /**
   * Update the the date now varible for new dates
   * @param DOM.Event
   * @return undefined
   */
  changeMonth(e) {
    let direction = parseInt(e.target.dataset.direction);
    let month = direction + this.data.now.getMonth();
    this.data.now.setMonth(month);
    let year = this.data.now.getFullYear();
    month = this.data.now.getMonth();
    this.updateDOM(month, year);
    this.renderAfter();
  }
  /**
   * Creating the table for the dates
   * @param Array
   * @param String
   */
  createTables(days) {
    return `<tr> ${days.map((data) => {
      return `<td>${data.join('</td><td>')}</td>`;
    }).join('</tr><tr>')} </tr> `;
  }

  show(e) {
    if (e.target.localName === 'td') {
      var id = e.target.getAttribute('data-id');
      this.toast.showNotification(id);
    }
  }

}
module.exports = CalenderView;

},{"./helpers":3,"./toastView":5,"./view":6}],3:[function(require,module,exports){
"use strict";

function valueExist(collection, value) {
  return collection.indexOf(value) !== -1;
}


module.exports = {
  valueExist,
};

},{}],4:[function(require,module,exports){
var Calender = require('./calender');
var CalenderView = require('./calenderView');
var ToastView = require('./toastView');

var cal = document.querySelector('.calender');
var toast = document.querySelector('.toast');

var calender = new Calender();
new CalenderView({
  $el: cal,
  data: calender,
  toast: new ToastView({$el: toast}),
});

},{"./calender":1,"./calenderView":2,"./toastView":5}],5:[function(require,module,exports){
"use strict";
//@TODO create model for test data
var View = require('./view');
class ToastView extends View {
  constructor(conf) {
    super(conf);
    this.textData = [];
  }

  /** Function for showing the toast.
   * @param number id of post
   * @return undefined
   */
  showNotification(id) {
    let text = this.textData[id];
    if (!text) return;
    this.$el.innerHTML = text;
    this.classList('remove', 'toast--show');
    this.classList('add', 'toast--show');
    this.removeNotification();
  }

  /**
   * Function for removing the notification
   */
  removeNotification() {
    setTimeout(_ => this.classList('remove', 'toast--show'), 5000);
  }

  /** Function for manipulating with the classList property
   * @param String name of classList method
   * @param String value for the method
   */
  classList(method, value) {
    this.$el.classList[method](value);
  }

  addData(data) {
    this.textData = data;
  }
}

module.exports = ToastView;

},{"./view":6}],6:[function(require,module,exports){
"use strict";
const config = {
  $el: '',
};

class View {
  constructor(viewConfig) {
    Object.assign(this, config, viewConfig);
    this.renderBefore();
    this.render();
    this.renderAfter();
    this.addEvents();
  }

  /**
   * Method that fires before render
   */
  renderBefore() {};
  /**
   * Method for rendering the template
   * @return DOM element
   */
  render() {
    console.log(this.$el);
    return this.$el.innerHTML = this.template(this.data);
  }
  /**
   * Method that fires after render
   */
  renderAfter() {};

  events() {
    return {};
  }

  template() {}

  addEvents() {
    let events = this.events();
    for (event of Object.keys(events)) {
      const args = event.split(' '); //split arguments from events object Example['click', '.test']
      const els  = (args.length <= 1) ? this.$el : this.$el.querySelectorAll(args[1]);
      if (!this[events[event]]) {
        throw Error(`Method ${events[event]} dosen\'t exsist in class`);
      }
      Array.from(els).forEach((el) => {
        el.addEventListener(args[0], this[events[event]].bind(this));
      });
    }
  }
}

module.exports = View;

},{}]},{},[4]);