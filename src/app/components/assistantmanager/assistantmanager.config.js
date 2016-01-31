(function() {
    'use strict';

    angular
        .module('app.components.assistantmanager')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/components/assistantmanager');

        $stateProvider
        .state('triangular.assistantmanager', {
            url: '/test',
            templateUrl: 'app/components/assistantmanager/assistantmanager.tmpl.html',
            // set the controller to load for this page
            controller: 'PageController',
            controllerAs: 'vm'
        });

        // add menu to triangular
        triMenuProvider.addMenu({
            name: 'MENU.TEST.TEST',
            state: 'dff.assistantmanager',
            type: 'link',
            icon: 'icon-info-outline',
            priority: 0.0
        });
        triMenuProvider.addMenu({
            type: 'divider',
            priority: 0.0
        });
    }
})();