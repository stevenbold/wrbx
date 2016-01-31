(function () {
    'use strict';

    angular
        .module('app.core.authentication')
        .directive('uniqueUser', uniqueUser);

    uniqueUser.$inject = ['Auth','$q', '$timeout'];

    function uniqueUser(Auth,$q,$timeout){
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                ctrl.$asyncValidators.username = function(modelValue, viewValue) {

                    if (ctrl.$isEmpty(modelValue)) {
                    // consider empty model valid
                        return $q.when();
                    }

                    var def = $q.defer();

                    $timeout(function(){
                        Auth.checkUniqueUser(elm.val()).then(function (unique){
                            if (unique){
                                def.resolve();
                            }
                            else {
                                def.reject();
                            } 
                        });
                    },1000);

                    return def.promise;
                };
            }
        };
    }

})();