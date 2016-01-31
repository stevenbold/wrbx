(function() {
    'use strict';

    angular
        .module('app.core.authentication')
        .controller('SignupController', SignupController);

    /* @ngInject */
    function SignupController($scope, triSettings, API_CONFIG, Auth) {
        var vm = this;
        vm.triSettings = triSettings;
        vm.signupClick = signupClick;
        vm.user = {
            email: '',
            password: '',
            confirm: ''
        };

        ////////////////

        function signupClick() {
            Auth.signUp({'email':vm.user.email,'password':vm.user.password});
        }

    }
})();