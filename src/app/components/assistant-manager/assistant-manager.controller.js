(function() {
    'use strict';

    angular
        .module('app.components.assistant-manager')
        .controller('PageController', PageController);

    /* @ngInject */
    function PageController() {
        var vm = this;
        vm.testData = [];
    }

})();