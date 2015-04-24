'use strict';

describe('Service: errorLogService', function () {

  // load the service's module
  beforeEach(module('clientApp'));

  // instantiate service
  var errorLogService;
  beforeEach(inject(function (_errorLogService_) {
    errorLogService = _errorLogService_;
  }));

  it('should do something', function () {
    expect(!!errorLogService).toBe(true);
  });

});
