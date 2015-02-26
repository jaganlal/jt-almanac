'use strict';

describe('Directive: ngAlmanac', function () {

  // load the directive's module
  beforeEach(module('jtAlmanacApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ng-almanac></ng-almanac>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ngAlmanac directive');
  }));
});
