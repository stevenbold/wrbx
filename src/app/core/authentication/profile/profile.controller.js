(function() {
    'use strict';

    angular
        .module('app.core.authentication')
        .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController($scope, $state, $mdToast, $http, $filter, triSettings, API_CONFIG, Auth, Profile) {
        var vm = this;

        vm.user = {
            email: Profile.user.email,
            current: '',
            password: '',
            confirm: ''
        };

        vm.changePasswordClick = changePasswordClick;
        vm.updateProfileClick = updateProfileClick;
        vm.settingsGroups = Profile.settingsGroups;
        
        function updateProfileClick() {
            var data = {};
            data['email'] = vm.user.email;
            data['send_notifications'] = vm.settingsGroups[0].settings[0].enabled;
            Profile.update(data);
            $scope.profile.$setPristine();
            $scope.profile.$setUntouched();
        }

        function changePasswordClick() {
            var data = {'username':vm.user.name,'password':vm.user.current,'new_password':vm.user.password};
            Auth.changePassword(data);
            vm.user.current = '';
            vm.user.password = '';
            vm.user.confirm = '';
            $scope.password.$setPristine();
            $scope.password.$setUntouched();
        }

    }
})();