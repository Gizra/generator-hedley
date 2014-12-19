'use strict';

describe('Controller: AccountCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var AccountCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccountCtrl = $controller('AccountCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
