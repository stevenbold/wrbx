(function() {
    'use strict';

    angular
        .module('app.core')
        .config(routeConfig);

    /* @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
        .state('dfftest', {
            abstract: true,
            templateUrl: 'app/triangular/layouts/default/default.tmpl.html',
            controller: 'DefaultLayoutController',
            controllerAs: 'layoutController'
        })
        .state('dff', {
            abstract: true,
            views: {
                sidebarLeft: {
                    templateUrl: 'app/triangular/components/menu/menu.tmpl.html',
                    controller: 'MenuController',
                    controllerAs: 'vm'
                },
                sidebarRight: {
                    templateUrl: 'app/triangular/components/notifications-panel/notifications-panel.tmpl.html',
                    controller: 'NotificationsPanelController',
                    controllerAs: 'vm'
                },
                toolbar: {
                    templateUrl: 'app/triangular/components/toolbars/toolbar.tmpl.html',
                    controller: 'DefaultToolbarController',
                    controllerAs: 'vm'
                },
                content: {
                    template: '<div id="admin-panel-content-view" class="{{layout.innerContentClass}}" flex ui-view></div>'
                },
                belowContent: {
                    template: '<div ui-view="belowContent"></div>'
                }
            }
        });
    }

})();