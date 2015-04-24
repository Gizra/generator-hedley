'use strict';

describe('Service: stackTrace', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var stackTrace;
  beforeEach(inject(function (_stackTrace_) {
    stackTrace = _stackTrace_;
  }));

  it('should do something', function () {
    expect(!!stackTrace).toBe(true);
  });

});
