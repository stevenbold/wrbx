(function() {
    'use strict';

    angular
        .module('app.core.authentication')
        .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController($scope, triSettings, API_CONFIG, Auth, Profile) {
        var vm = this;
        vm.loginClick = loginClick;
        vm.socialLogins = [{
            icon: 'fa fa-twitter',
            color: '#5bc0de',
            url: '#'
        },{
            icon: 'fa fa-facebook',
            color: '#337ab7',
            url: '#'
        },{
            icon: 'fa fa-google-plus',
            color: '#e05d6f',
            url: '#'
        },{
            icon: 'fa fa-linkedin',
            color: '#337ab7',
            url: '#'
        }];
        vm.triSettings = triSettings;
        // create blank user variable for login form
        vm.user = {
            email: '',
            password: ''
        };

        ////////////////

        function loginClick() {
            Auth.logIn({'email':vm.user.email,'password':vm.user.password});
        }

    }
})();