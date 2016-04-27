"use strict";
//@TODO create model for test data
var View = require('./view');

class ListView extends View {
  constructor(conf) {
    super(conf);
    this.textData = [];
  }
  events() {
    return {
      'click .addItem': 'addItem',
    };
  }

  addItem(e) {
    var data = Array.from(this.$el.querySelectorAll('input')).map(node => node.value);
    var description = this.$el.querySelector('textarea').value;
    var tmp = this.addEvent({title: data[0], description, startDate: new Date(data[1]), endDate: new Date(data[2])});
    var div = document.createElement('div');
    div.innerHTML = tmp;
    this.$el.querySelector('.lists').appendChild(div);
  }

  template() {
    return `
    <h3>Reminders:</h3>
    <div>
      <div class="lists">
        ${this.data.map(this.addEvent).join('')}
      </div>
      <hr/>
      <div class="add__list__item">
        <h3>Title:</h3>
        <input type="text">
        <h3>Body:</h3>
        <textarea></textarea>
        <h3>From:</h3>
        <input type="date">
        <h3>To:</h3>
        <input type="date">
        <button class="addItem">Submit</button>
      </div>
    </div>`;
  }

  addEvent(model) {
    return `
      <div class="list__items">
        <h4>${model.title}</h4>
        <p>${model.description}</p>
        <blockquote>From: ${convertDate(model.startDate)} - ${convertDate(model.endDate)}</blockquote>
      </div>
    `;
  }
}

function convertDate(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

module.exports = ListView;
