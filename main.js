class Calender {
  constructor(el) {
    this.months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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

};
