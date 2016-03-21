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
