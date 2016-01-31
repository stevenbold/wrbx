(function() {
    'use strict';

    angular
        .module('squad-directives', [
        ])
        .directive('pitch', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/components/assistantmanager/templates/pitch.html'
            };
        })
        .directive('playerShirt', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/components/assistantmanager/templates/player-shirt.html'
            };
        })
        .directive('playerText', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/components/assistantmanager/templates/player-text.html'
            };
        })
        .directive('playerIcons', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/components/assistantmanager/templates/player-icons.html'
            };
        })
        .directive('squadInfo', function() {
            return {
                restrict: 'E',
                templateUrl: 'app/components/assistantmanager/templates/squad-info.html'
            };
        })
        .directive('defaultImg', function () {
            var defaultImg = {
                link: function postLink(scope, iElement, iAttrs) {
                    iElement.on('error',function() {
                        angular.element(this).attr('src', iAttrs.defaultImg);
                    });
                }
            };
            return defaultImg;
        });

})();
