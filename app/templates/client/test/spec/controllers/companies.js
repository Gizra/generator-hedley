'use strict';

describe('Controller: CompaniesCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var CompaniesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CompaniesCtrl = $controller('CompaniesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
