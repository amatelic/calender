var Calender = require('./calender');
var CalenderView = require('./calenderView');
var ToastView = require('./toastView');
var CalenderLargeView = require('./largeCalenderView');

var cal = document.querySelector('.calender--mini');
var calL = document.querySelector('.calender--large');

var toast = document.querySelector('.toast');

var calender = new Calender();
new CalenderView({
  $el: cal,
  data: calender,
  toast: new ToastView({$el: toast}),
});


var calender = new Calender();
new CalenderLargeView({
  $el: calL,
  data: calender,
  toast: new ToastView({$el: toast}),
});
