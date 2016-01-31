(function() {
    'use strict';

    angular
        .module('app.components.assistantmanager')
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
    function PageController($http, API_CONFIG, $scope) {    
    }

    function SquadController($http, API_CONFIG,$scope) {
        $scope.loading = true;
        //$scope.newsquad = [0,0,0];
        $scope.include = [];
        $scope.exclude = [];
        $scope.slots = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
        var root = API_CONFIG.url;
        var root = 'http://127.0.0.1:8000/api/dk'
        var path = '/squads/';
        var url = root + path;
        url = '/assets/testjson/squads.json'; //test data     
        $scope.loading = true;
        $scope.defaultSquad = function() {
            $http.get(url)
            .success(function(data){
                $scope.players = data[0].players;
                $scope.squadinfo = data[0];
            })
            .error(function(errorData, errorStatus){
                alert('$http error logged to console');
                console.log(errorData);
                console.log(errorStatus);
                $scope.players = ['no data']
                
            })
            .finally(function(){
                $scope.loading = false;
            });
        };
        $scope.optimise = function() {
            alert('Include:' + $scope.include + ' Exclude: ' + $scope.exclude);
            $http({
                url: 'http://fantasyfootballfix.com/api/dk/optimization/',
                method: 'post',
                data: {
                    include_codes: $scope.include,
                    exclude_codes: $scope.exclude,
                    risk: 0.5,
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .success (function(data) {
                console.log("success");
                $scope.players = data.players;
            })
            .error(function(data, status, headers, config){
                console.log("error"+status + " H: "+data);
                $scope.players = 'optimization failed :(';    
            });
        };      
    }

    function PlayerController($scope) {
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

