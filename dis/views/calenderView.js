"use strict";
var View = require('./view');
var ToastView = require('./toastView');
var h = require('../helpers');
var valueExist  = h.valueExist;

class CalenderView extends View {
  constructor(obj) {
    super(obj);
  }

  events() {
    return {
      'click .right': 'changeMonth',
      'click .left': 'changeMonth',
      'click .calender__body': 'show',
    };
  }

  template(obj) {
    let month = obj.getNow().getMonth();
    let year = obj.getNow().getFullYear();
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
          <tbody class="calender__body calender--mini--body">
            ${this.createTables(this.model.getDaysInMonth(month, year))}
          </tbody>
    `;
  }

  renderAfter() {
    var month = this.model.getNow().getMonth();
    this.model.setUrl({param: month});
    this.model.fetchData({param: month})
      .then(this.displayNotifications.bind(this));
  }

  displayNotifications(model) {
    let table = Array.from(this.$el.querySelector('tbody').querySelectorAll('td'));
    let days = model.days;

    table.filter((el) => {
      let day = parseInt(el.innerHTML);
      return valueExist(days, day) || day === this.model.getToday();
    }).map(this.addCalenderEvents.bind(model));

  }

  addCalenderEvents(el) {
    let days = this.days; //binding the array with the bind function line 55
    let day = parseInt(el.innerHTML);
    let className = (valueExist(days, day))
      ? 'calender__events--mini' : 'calender__pointer--mini';
    el.dataset.id = days.indexOf(day);
    el.classList.add(className);
  }

  updateDOM(month, year) {
    this.$el.querySelector('.month').innerHTML = this.model.getMonths()[month];
    this.$el.querySelector('.year').innerHTML = `<h3>${year}</h3>`;
    this.$el.querySelector('tbody').innerHTML = this.createTables(this.model.getDaysInMonth(month, year));
  }
  /**
   * Update the the date now varible for new dates
   * @param DOM.Event
   * @return undefined
   */
  changeMonth(e) {
    let direction = parseInt(e.target.dataset.direction);
    console.log(this.model.getNow());
    let month = direction + this.model.getNow().getMonth();
    this.model.getNow().setMonth(month);
    let year = this.model.getNow().getFullYear();
    month = this.model.getNow().getMonth();
    this.updateDOM(month, year);
    this.renderAfter();
  }
  /**
   * Creating the table for the dates
   * @param Array
   * @param String
   */
  createTables(days) {
    return `<tr> ${days.map((model) => {
      return `<td>${model.join('</td><td>')}</td>`;
    }).join('</tr><tr>')} </tr> `;
  }

  show(e) {
    if (e.target.localName === 'td') {
      var id = e.target.getAttribute('data-id');
      // this.toast.showNotification(id);
    }
  }

}
module.exports = CalenderView;
