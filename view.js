//what dose it need
//support for  rendering
//support for eevents
const config = {
  $el: '',
  el: '',
};

class View {
  constructor(viewConfig) {
    Object.assign(this, config, viewConfig);
    this.$el = document.querySelector(this.el);
    this.renderBefore();
    this.render();
    this.renderAfter();
    this.addEvents();
  }

  renderBefore() {};

  render() {
    return this.$el.innerHTML = this.template(this.data);
  }

  renderAfter() {};

  events() {
    return {};
  }

  addEvents() {
    let events = this.events();
    for (event of Object.keys(events)) {
      const args = event.split(' '); //split arguments from events object Example['click', '.test']
      const els  = (args.length <= 1) ? this.$el : this.$el.querySelectorAll(args[1]);
      if (!this[events[event]]) {
        throw Error(`Method ${events[event]} dosen\'t exsist `);
      }
      Array.from(els).forEach((el) => {
        el.addEventListener(args[0], this[events[event]].bind(this));
      });
    }
  }
  template() {}
}
