'use strict';

describe('Service: exceptionHandler', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var exceptionHandler;
  beforeEach(inject(function (_exceptionHandler_) {
    exceptionHandler = _exceptionHandler_;
  }));

  it('should do something', function () {
    expect(!!exceptionHandler).toBe(true);
  });

});
