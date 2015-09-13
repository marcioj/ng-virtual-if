(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    factory();
  }
}(this, function () {

    'use strict';

    var ngVirtualIf = angular.module('ng-virtual-if', [])
      .directive('vIf', function() {
        return {
          restrict: 'M',
          link: function($scope,elem, $attr) {
            var bounds = getVirtualIfBounds(elem);
            var morph = new Morph(bounds.start, bounds.end);

            $scope.$watch($attr.vIf, function(value) {
              morph.toggle(value);
            });

            $scope.$on('$destroy', function () {
              morph.teardown();
              morph = null;
            });
          }
        };
      });

    function getVirtualIfBounds(elem) {
      var start = elem[0];
      var end = start.nextSibling;
      while(end.nodeType !== 8 || end.nodeValue.trim() !== 'vEnd') {
        end = end.nextSibling;
      }
      return { start: start, end: end };
    }

    function Morph(start, end) {
      var range = document.createRange();
      range.setStartAfter(start);
      range.setEndBefore(end);
      this.range = range;
      this.prev = undefined;
    }

    Morph.prototype.toggle = function(truth) {
      if (truth) {
        this.restore();
      } else {
        this.remove();
      }
    };

    Morph.prototype.remove = function() {
      this.prev = this.range.extractContents();
    };

    Morph.prototype.restore = function() {
      if (this.prev) {
        this.range.insertNode(this.prev);
      }
    };

    Morph.prototype.teardown = function () {
      this.range.deleteContents();
    };

    return ngVirtualIf;
}));
