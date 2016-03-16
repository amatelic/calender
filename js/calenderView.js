
class CalenderView extends View {
  constructor(obj) {
    super(obj);
    this.toast = new ToastView({el: '.toast'});
  }

  events() {
    return {
      'click .right': 'changeMonth',
      'click .left': 'changeMonth',
      'click .calender__body': 'show',
    };
  }

  template({days, months, now, today}) {
    let month = now.getMonth();
    let year = now.getFullYear();
    return `
        <h1 class="calender__title">Calender</h1>
        <table class="calender__table">
          <thead class="calender__thead">
            <tr>
              <td class="year" colspan="7"><h3>${year}</h3></td>
            </tr>
            <tr>
              <td data-direction="-1" class="left" style="text-align:left;" ><</td>
              <td class="month" colspan="5">${months[month]}</td>
              <td data-direction="1" class="right" style="text-align:right;" >></td>
            <tr>
            <tr class="calender__header">
              <td>${days.join('</td><td>')}</td>
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
      .then(data =>data.json())
      .then(this.displayNotifications.bind(this));
  }

  displayNotifications(data) {
    var table = Array.from(this.$el.querySelector('tbody').querySelectorAll('td'));
    table.forEach((e) => {
      let day = parseInt(e.innerHTML);
      let dayIndex = data.days.indexOf(day);
      if (day === this.data.today || dayIndex !== -1) {
        if (dayIndex !== -1) {
          e.dataset.id = dayIndex;
          e.classList.add('calender__events');
          return;
        }
        e.classList.add('calender__pointer');
      }
    });
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
  }
  /**
   * Creating the table for the dates
   * @param Array
   * @param String
   */
  createTables(days) {
    var data = days.map((data) => {
      return `<td>${data.join('</td><td>')}</td>`;
    });
    return `<tr>${data.join('</tr><tr>')}</tr>`;
  }

  show(e) {
    if(e.target.localName === 'td') {
      var id = e.target.getAttribute('data-id');
      this.toast.showNotification();
    }
  }

}
