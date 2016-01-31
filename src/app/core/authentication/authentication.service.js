(function () {
    'use strict';

    angular
      .module('app.core.authentication')
      .factory('Auth', Auth);

    function Auth($http, $window, $state, $mdToast, $filter, triSettings, API_CONFIG, Profile) {
        var Auth = {
            deleteToken: deleteToken,
            getToken: getToken,
            logOut: logOut,
            logInLink: logInLink,
            signUpLink: signUpLink,
            logIn: logIn,
            signUp: signUp,  
            changePassword: changePassword,
            setToken: setToken,
            checkUniqueUser: checkUniqueUser,
            isLoggedIn: isLoggedIn            
        };

        return Auth;

        function signUp(signup_data) {
            $http({
                method: 'POST',
                url: API_CONFIG.url + '/user/',
                data: signup_data
            }).
            success(function(data) {
                Auth.setToken(data.token);
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('SIGNUP.MESSAGES.CONFIRM_SENT') + ' ' + data.email)
                    .position('bottom right')
                    .action($filter('translate')('SIGNUP.MESSAGES.LOGIN_NOW'))
                    .highlightAction(true)
                    .hideDelay(0)
                ).then(function() {
                    $state.go('public.auth.login');
                });
            }).
            error(function() {
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('SIGNUP.MESSAGES.NO_SIGNUP'))
                    .position('bottom right')
                    .hideDelay(5000)
                );
            });
        }

        function logIn(login_data) {
            $http({
                method: 'POST',
                url: API_CONFIG.url + '/login/',
                data: login_data
            }).
            success(function(data) {
                Auth.setToken(data.token);
                Profile.get();
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('LOGIN.MESSAGES.SUCCESS') + ' ' + login_data.username )
                    .position('bottom right')
                    .hideDelay(1000)
                ).then(function() {
                    $state.go('triangular.admin-default.introduction');
                });
            }).
            error(function() {
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('LOGIN.MESSAGES.ACCESS_DENIED'))
                    .position('bottom right')
                    .hideDelay(5000)
                );
            });
        }

        function changePassword(password_data) {
            $http({
                method: 'POST',
                url: API_CONFIG.url + '/change_password/',
                data: password_data
            }).
            success(function(data) {
                Auth.setToken(data.token);
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('PROFILE.MESSAGES.CHANGE_PASSWORD'))
                    .position('bottom right')
                    .hideDelay(2000)
                );
            }).
            error(function() {
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('PROFILE.MESSAGES.NO_CHANGE_PASSWORD'))
                    .position('bottom right')
                    .hideDelay(5000)
                );
            });
        }

        function checkUniqueUser(email){
            return $http({
                method: 'POST',
                url: API_CONFIG.url + '/check_user/',
                data: {'email':email}
            }).then(
                function (results) {
                    return results.data.status;
                });
        }

        function deleteToken() {
            $window.localStorage.removeItem('token');
        }

        function getToken() {
            return $window.localStorage.getItem('token');
        }

        function logOut() {
            Auth.deleteToken();
            $window.location = '/';
        }

        function logInLink() {
            $window.location = '#/login';   
        }

        function signUpLink() {
            $window.location = '#/signup';   
        }

        function setToken(token) {
            $window.localStorage.setItem('token', token);
        }

        function isLoggedIn(){
            return !!Auth.getToken();
        }
    }

})();