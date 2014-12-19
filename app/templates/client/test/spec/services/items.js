'use strict';

describe('Service: items', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var items;
  beforeEach(inject(function (_items_) {
    items = _items_;
  }));

  it('should do something', function () {
    expect(!!items).toBe(true);
  });

});
