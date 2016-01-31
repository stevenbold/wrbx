(function() {
    'use strict';

    angular
        .module('app.components.assistant-manager')
        .controller('PageController', PageController)
        .controller('SquadController', SquadController)
        .controller('PlayerController', PlayerController)
        .filter('humanize', function(){
            return function humanize(number) {
                if(number < 1000) {
                    return number;
                }
                var thous = parseInt(number/1000);
                var ones = number - (1000*thous);
                var result = thous + ',' + ones;
                var valid = isNaN(ones)
                if (valid) {return ''}
                else {return result};
            };
        });

    /* @ngInject */
    function PageController() {
        var vm = this;
        vm.testData = [];
    }

    function SquadController($http, API_CONFIG,$scope) {
    }

    function PlayerController($http, API_CONFIG,$scope) {
    }

})();