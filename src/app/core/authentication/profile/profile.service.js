(function () {
    'use strict';

    angular
      .module('app.core.authentication')
      .factory('Profile', Profile);

    function Profile($http, $window, $mdToast, $filter, triSettings, API_CONFIG) {

        var user = {
            name: '',
            email: '',
            location: '',
            website: '',
            twitter: '',
            bio: '',
            num_new_emails: 0,
            num_new_notifications: 0,
            showLanguageOptions: false
        };

        var notificationGroups = [{
            name: 'Twitter',
            notifications: [{
                title: 'Mention from oxygenna',
                icon: 'fa fa-twitter',
                iconColor: '#55acee',
                date: moment().startOf('hour')
            },{
                title: 'Oxygenna',
                icon: 'fa fa-twitter',
                iconColor: '#55acee',
                date: moment().startOf('hour')
            },{
                title: 'Oxygenna',
                icon: 'fa fa-twitter',
                iconColor: '#55acee',
                date: moment().startOf('hour')
            },{
                title: 'Followed by Oxygenna',
                icon: 'fa fa-twitter',
                iconColor: '#55acee',
                date: moment().startOf('hour')
            }]
        },{
            name: 'Server',
            notifications: [{
                title: 'Server Down',
                icon: 'icon-error',
                iconColor: 'rgb(244, 67, 54)',
                date: moment().startOf('hour')
            },{
                title: 'Slow Response Time',
                icon: 'icon-warning',
                iconColor: 'rgb(255, 152, 0)',
                date: moment().startOf('hour')
            },{
                title: 'Server Down',
                icon: 'icon-error',
                iconColor: 'rgb(244, 67, 54)',
                date: moment().startOf('hour')
            }]
        },{
            name: 'Sales',
            notifications: [{
                title: 'Triangular Admin $21',
                icon: 'icon-shopping-cart',
                iconColor: 'rgb(76, 175, 80)',
                date: moment().startOf('hour')
            },{
                title: 'Lambda WordPress $60',
                icon: 'icon-shopping-cart',
                iconColor: 'rgb(76, 175, 80)',
                date: moment().startOf('hour')
            },{
                title: 'Triangular Admin $21',
                icon: 'icon-shopping-cart',
                iconColor: 'rgb(76, 175, 80)',
                date: moment().startOf('hour')
            },{
                title: 'Triangular Admin $21',
                icon: 'icon-shopping-cart',
                iconColor: 'rgb(76, 175, 80)',
                date: moment().startOf('hour')
            },{
                title: 'Lambda WordPress $60',
                icon: 'icon-shopping-cart',
                iconColor: 'rgb(76, 175, 80)',
                date: moment().startOf('hour')
            },{
                title: 'Triangular Admin $21',
                icon: 'icon-shopping-cart',
                iconColor: 'rgb(76, 175, 80)',
                date: moment().startOf('hour')
            }]
        }];

        /**var settings = [{
            name: 'ADMIN.NOTIFICATIONS.ACCOUNT_SETTINGS',
            settings: [{
                title: 'ADMIN.NOTIFICATIONS.SHOW_LOCATION',
                icon: 'icon-location-on',
                enabled: true
            },{
                title: 'ADMIN.NOTIFICATIONS.SHOW_AVATAR',
                icon: 'icon-face-unlock',
                enabled: false
            },{
                title: 'ADMIN.NOTIFICATIONS.SEND_NOTIFICATIONS',
                icon: 'icon-notifications-on',
                enabled: true
            }]
        },{
            name: 'ADMIN.NOTIFICATIONS.CHAT_SETTINGS',
            settings: [{
                title: 'ADMIN.NOTIFICATIONS.SHOW_USERNAME',
                icon: 'icon-person',
                enabled: true
            },{
                title: 'ADMIN.NOTIFICATIONS.SHOW_PROFILE',
                icon: 'icon-account-box',
                enabled: false
            },{
                title: 'ADMIN.NOTIFICATIONS.ALLOW_BACKUPS',
                icon: 'icon-backup',
                enabled: true
            }]
        }];**/

        var settingsGroups = [{
            name: 'ADMIN.NOTIFICATIONS.ACCOUNT_SETTINGS',
            settings: [{
                title: 'ADMIN.NOTIFICATIONS.SEND_NOTIFICATIONS',
                icon: 'icon-notifications-on',
                enabled: true
            }]
        }];

        var Profile = {
            user: user,
            settingsGroups: settingsGroups,
            notificationGroups: notificationGroups,
            update: updateProfile,
            get: getProfile
        };

        getProfile();

        return Profile;

        function getProfile(){
            //$http({
            //    method: 'GET',
            //    url: API_CONFIG.url + '/user/profile/'
            //}).success(function(data) {
            //    Profile.user.name = data.username;
            //    Profile.user.email = data.email;
            //    Profile.settingsGroups[0].settings[0].enabled = data.send_notifications;
            //});
        }

        function updateProfile(data){
            $http({
                method: 'POST',
                url: API_CONFIG.url + '/user/profile/',
                data: data
            }).
            success(function(data) {
                Profile.user.name = data.username;
                Profile.user.email = data.email;
                Profile.settingsGroups[0].settings[0].enabled = data.send_notifications;
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('PROFILE.MESSAGES.UPDATE_PROFILE'))
                    .position('bottom right')
                    .hideDelay(1000)
                );
            }).
            error(function() {
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('PROFILE.MESSAGES.NO_UPDATE_PROFILE'))
                    .position('bottom right')
                    .hideDelay(5000)
                );
            });
        }

    }

})();