"use strict";
//@TODO  Can make fetch request
//@TODO create http parser
//@TODO create error handling
class Model {
  constructor(data) {
    this.attributes = {};
    this.url = '';
    this.setAttributes(data);
  }

  setAttributes(data) {
    Object.assign(this.attributes, data);
  }

  setUrl({url, param = ''}) {
    var url = 'http://localhost:3000';//(url) ? url : this.url;
    var param = (param) ? `/${param}` : ``;
    this.url = url + param;
  }

  fetchData(param) {
    return fetch(this.url, param)
      .then(this.parse.bind(this))
      .then(data => {
        Object.assign(this.attributes, data);
        return data;
      })
      .catch(this.error);
  }

  parse(response) {
    return response.json();
  }

  error(error) {
    return [];
  }

};

module.exports = Model;
