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
