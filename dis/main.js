var Calender = require('./calender');
var CalenderView = require('./views/calenderView');
var ToastView = require('./views/toastView');
var CalenderLargeView = require('./views/largeCalenderView');
var ListView = require('./views/listView');

var cal = document.querySelector('.calender--mini');
var calL = document.querySelector('.calender--large');
var listView = document.querySelector('.calender__list');
var toast = document.querySelector('.toast');

var calender = new Calender();
new CalenderView({
  $el: cal,
  model: calender,
});

var calender = new Calender();
new CalenderLargeView({
  $el: calL,
  model: calender,
});

var endT = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
var endY = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

var data = [
  {
    title: 'Work on project',
    description: 'blb blat',
    startDate: new Date(),
    endDate: endT,
  },
  {
    title: 'Create project',
    description: 'Haha thi is a test',
    startDate: new Date(),
    endDate: endY,
  },
];

new ListView({
  $el: listView,
  data: data,
});

window.cal = calender;
