(function() {
    'use strict';

    angular
        .module('app.components.assistant-manager')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/components/assistant-manager');

        $stateProvider
        .state('triangular.dff.assistant-manager', {
            url: '/assistant-manager',
            templateUrl: 'app/components/assistant-manager/assistant-manager.tmpl.html',
            // set the controller to load for this page
            controller: 'PageController',
            controllerAs: 'vm'
        });

        triMenuProvider.addMenu({
            name: 'MENU.ASSISTANT.ASSISTANT',
            icon: 'zmdi zmdi-grade',
            type: 'link',
            state: 'triangular.dff.assistant-manager',
            priority: 1.1
        });
    }
})();