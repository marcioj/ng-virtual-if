'use strict';

describe('ng-virtual-if', function () {

  beforeEach(module('test-app'));

  it('works', inject(function ($compile, $rootScope) {

    var elem = $compile(
      '<div>' +
      '<!-- directive: vIf message -->' +
      '<span>{{message}}</span>' +
      '<!-- vEnd -->' +
      '</div>'
    )($rootScope);

    $rootScope.$digest();

    expect(elem.html()).to.equal(
      '<!-- directive: vIf message -->' +
      '<!-- vEnd -->'
    );

    $rootScope.message = 'hello';

    $rootScope.$digest();

    expect(elem.html()).to.equal(
      '<!-- directive: vIf message -->' +
      '<span class="ng-binding">hello</span>' +
      '<!-- vEnd -->'
    );
  }));

});
