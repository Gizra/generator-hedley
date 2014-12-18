'use strict';

describe('Service: itemVariants', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var itemVariants;
  beforeEach(inject(function (_itemVariants_) {
    itemVariants = _itemVariants_;
  }));

  it('should do something', function () {
    expect(!!itemVariants).toBe(true);
  });

});
