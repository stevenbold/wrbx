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

     /* @ngInject */
    function SquadController($http, API_CONFIG, $scope, $mdToast, $filter, triSettings, DK) {
    	$scope.loading = true;
        //$scope.newsquad = [0,0,0];
        $scope.include = [];
        $scope.exclude = [];
        $scope.players = [];
 
        $scope.defaultSquad = function (){
            DK.getSquads().success(function(data){
                $scope.players = data[0].players;
                $scope.squadinfo = data[0];
            })
            .error(function(){
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('ASSISTANT.MESSAGES.SQUAD_LOAD_ERROR'))
                    .position('bottom right')
                    .hideDelay(5000)
                );
                $scope.players = [];
            })
            .finally(function(){
                $scope.loading = false;
            });
        }

        $scope.optimise = function() {
            $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('ASSISTANT.MESSAGES.OPTIMISATION_STARTED'))
                    .position('bottom right')
                    .hideDelay(5000)
            );
            DK.optimise($scope.include, $scope.exclude, 0.5)
            .success(function(data){
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('ASSISTANT.MESSAGES.OPTIMISATION_SUCCESS'))
                    .position('bottom right')
                    .hideDelay(5000)
                );
                $scope.squadinfo = data;
                $scope.players = data.players;
            })
            .error(function(data, status, headers, config){
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('ASSISTANT.MESSAGES.OPTIMISATION_ERROR'))
                    .position('bottom right')
                    .hideDelay(5000)
                );
                $scope.players = [];    
            });
        }      
    }

    function PlayerController($http, API_CONFIG,$scope) {
    	$scope.lockiconclass = 'fa fa-unlock';
        $scope.shirtclass = 'no-greyscale';
        $scope.lockclass = 'unlocked' 

        $scope.togglelock = function(player) {
            var player_id = player.player.code;
            if ($scope.lockiconclass === 'fa fa-unlock') {
                $scope.lockclass = 'locked';
                $scope.lockiconclass = 'fa fa-lock';
                $scope.shirtclass = 'no-greyscale';
                $scope.include.push(player_id);
                var index = $scope.exclude.indexOf(player_id);
                if (index != -1) {
                    $scope.exclude.splice(index, 1);
                }
            }
            else if ($scope.lockiconclass === 'fa fa-lock') {
                $scope.lockiconclass = 'fa fa-times';
                $scope.lockclass = 'dismissed';
                $scope.shirtclass = 'greyscale';
                $scope.exclude.push(player_id);
                var index = $scope.include.indexOf(player_id);
                if (index != -1) {
                    $scope.include.splice(index, 1);
                }
            }
            else if ($scope.lockiconclass === 'fa fa-times') {
                $scope.lockiconclass = 'fa fa-unlock';
                $scope.lockclass = 'unlocked';
                $scope.shirtclass = 'no-greyscale';
                var index = $scope.exclude.indexOf(player_id);
                if (index != -1) {
                    $scope.exclude.splice(index, 1);
                }
                var index = $scope.include.indexOf(player_id);
                if (index != -1) {
                    $scope.include.splice(index, 1);
                }
            }       
        };
        $scope.showPlayerInfo = function(ev) {
            alert('clck')
        };   
    }

})();