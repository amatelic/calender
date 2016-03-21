"use strict";
var test = require('tape');
var MockBrowser = require('mock-browser').mocks.MockBrowser;
var CalenderView = require('../dis/calenderView');
var Calender = require('../dis/calender');

test('Create table body structure', (t) => {
  t.plan(1);
  var mock = new MockBrowser();
  var document = mock.getDocument();
  var el = document.createElement('div');
  var view = new CalenderView({$el: el, data: new Calender()});
  console.log(view);

  console.log(view.createTables([[1,2,3],[1,2,3]]));
  t.equal(1,1);
});
//| tap-dot
