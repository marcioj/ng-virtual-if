'use strict';

describe('ng-virtual-if', function () {

  beforeEach(module('test-app'));

  it('adds or removes content basead on the expression', inject(function ($compile, $rootScope) {

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

  it('ends in the vEnd comment and ignore others', inject(function ($compile, $rootScope) {

    var elem = $compile(
      '<div>' +
      '<!-- outer top -->' +
      '<h1>Top title</h1>' +
      '<!-- directive: vIf message -->' +
      '<h2>If title</h2>' +
      '<!-- inner -->' +
      '<span>{{message}}</span>' +
      '<!-- vEnd -->' +
      '<!-- outer bottom -->' +
      '</div>'
    )($rootScope);

    $rootScope.$digest();

    expect(elem.html()).to.equal(
      '<!-- outer top -->' +
      '<h1>Top title</h1>' +
      '<!-- directive: vIf message -->' +
      '<!-- vEnd -->' +
      '<!-- outer bottom -->'
    );

    $rootScope.message = 'hello';

    $rootScope.$digest();

    expect(elem.html()).to.equal(
      '<!-- outer top -->' +
      '<h1>Top title</h1>' +
      '<!-- directive: vIf message -->' +
      '<h2>If title</h2>' +
      '<!-- inner -->' +
      '<span class="ng-binding">hello</span>' +
      '<!-- vEnd -->' +
      '<!-- outer bottom -->'
    );
  }));

  it('teardown the range and watchers', inject(function ($compile, $rootScope) {
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

    $rootScope.$destroy();

    expect(elem.html()).to.equal('<!-- directive: vIf message --><!-- vEnd -->');
  }));
});
