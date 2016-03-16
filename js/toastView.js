class ToastView extends View {
  constructor(conf) {
    super(conf);
  }

  showNotification() {
    this.$el.innerHTML = 'this is a test';
    this.$el.classList.add('toast--show');
    this.removeNotification();
  }

  removeNotification() {
    setTimeout(_ => this.$el.classList.remove('toast--show'), 5000);
  }
}
