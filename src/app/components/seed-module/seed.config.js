(function() {
    'use strict';

    angular
        .module('app.components.seed-module')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/components/seed-module');

        $stateProvider
        .state('triangular.dff.seed-page', {
            url: '/seed-module/seed-page',
            templateUrl: 'app/components/seed-module/seed-page.tmpl.html',
            // set the controller to load for this page
            controller: 'SeedPageController',
            controllerAs: 'vm'
        });

        triMenuProvider.addMenu({
            name: 'MENU.SEED.SEED-MODULE',
            icon: 'zmdi zmdi-grade',
            type: 'dropdown',
            priority: 1.1,
            children: [{
                name: 'MENU.SEED.SEED-PAGE',
                state: 'triangular.admin-default.seed-page',
                type: 'link'
            }]
        });
    }
})();