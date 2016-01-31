(function () {
    'use strict';

    angular
      .module('app.components')
      .factory('DK', DK);

    function DK($http, $window, $state, $mdToast, $filter, triSettings, API_CONFIG) {

        var DK = {
            getSquads: getSquads,
            getPlayers: getPlayers,
            getPlayer: getPlayer,
            getPlayerHistory: getPlayerHistory,
            optimise: optimise            
        };

        return DK;

        function getSquads() {
            var url = API_CONFIG.url + '/squads/';
            //var url = '/assets/testjson/squads.json'; //test data 
            return $http({
                method: 'GET',
                url: url
            });
        }

        function getPlayers() {
            var url = API_CONFIG.url + '/players/';
            return $http({
                method: 'GET',
                url: url
            });
        }

        function getPlayer(player_id) {
            var url = API_CONFIG.url + '/players/' + player_id.toString();
            return $http({
                method: 'GET',
                url: url
            });
        }

        function getPlayerHistory(player_id) {
            var url = API_CONFIG.url + '/players/' + player_id.toString() + '/fixtures/';
            return $http({
                method: 'GET',
                url: url
            });
        }

        function optimise(include, exclude, risk) {
            var url = API_CONFIG.url + '/optimization/';
            return $http({
                method: 'POST',
                url: url,
                data: {
                    include_codes: include,
                    exclude_codes: exclude,
                    risk: risk
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    }

})();