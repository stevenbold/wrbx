(function() {
    'use strict';

    angular
        .module('triangular.directives')
        .directive('countupto', countupto);

    /* @ngInject */
    function countupto($timeout) {
        // Usage:
        //
        // ```html
        // <h1 countupto="100"></h1>
        // ```
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                'countupto': '=',
                'options': '='
            }
        };
        return directive;

        function link($scope, $element, attrs) {
            var options = {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: ''
            };

            var numAnim;

            // override default options?
            if ($scope.options) {
                for(var option in options) {
                    if(angular.isDefined($scope.options[option])) {
                        options[option] = $scope.options[option];
                    }
                }
            }

            attrs.from = angular.isUndefined(attrs.from) ? 0 : parseInt(attrs.from);
            attrs.decimals = angular.isUndefined(attrs.decimals) ? 2 : parseFloat(attrs.decimals);
            attrs.duration = angular.isUndefined(attrs.duration) ? 2 : parseFloat(attrs.duration);

            $timeout(function() {
                numAnim = new CountUp($element[0], attrs.from, $scope.countupto, attrs.decimals, attrs.duration, options);
                numAnim.start();

                $scope.$watch('countupto', function(value, oldValue) {
                    if (angular.isDefined(value) && value != oldValue) {
                        numAnim.update(value);
                    }
                });

            }, 500); 

        }
    }

})();