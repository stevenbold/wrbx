(function() {
    'use strict';

    angular
        .module('dialogs', [])
        .controller('DialogCtrl', DialogCtrl);

        /* @ngInject */
        function DialogCtrl($scope, $mdDialog, $mdMedia) {
            $scope.status = '  ';
            $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
            $scope.showPlayerInfo = function(ev, player) {
                $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/components/assistant-manager/templates/playerdialog.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: true,
                    locals : {
                        player : player.player
                    },
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });

            };
        };

        function DialogController($scope, $mdDialog, player) {
          $scope.player = player ;
          $scope.hide = function() {
            $mdDialog.hide();
          };
          $scope.cancel = function() {
            $mdDialog.cancel();
          };
          $scope.answer = function(answer) {
            $mdDialog.hide(answer);
          };
        }

        // end of 
        ;
})();
