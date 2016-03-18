//@TODO create model for test data
class ToastView extends View {
  constructor(conf) {
    super(conf);
    this.textData = [];
  }

  /** Function for showing the toast.
   * @param number id of post
   * @return undefined
   */
  showNotification(id) {
    let text = this.textData[id];
    if (!text) return;
    this.$el.innerHTML = text;
    this.classList('remove', 'toast--show');
    this.classList('add', 'toast--show');
    this.removeNotification();
  }

  /**
   * Function for removing the notification
   */
  removeNotification() {
    setTimeout(_ => this.classList('remove', 'toast--show'), 5000);
  }

  /** Function for manipulating with the classList property
   * @param String name of classList method
   * @param String value for the method
   */
  classList(method, value) {
    this.$el.classList[method](value);
  }

  addData(data) {
    this.textData = data;
  }
}
