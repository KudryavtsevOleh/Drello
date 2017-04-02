'use strict';
(function () {
    angular.module('drello')
        .service('Auth', AuthService);

    AuthService.$inject = ['$http', '$window', '$httpParamSerializer', '$rootScope'];
    function AuthService($http, $window, $httpParamSerializer, $rootScope) {

        let service = {
            login: function (credentials) {
                return $http.post('/auth/login', $httpParamSerializer(credentials), {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then(function (result) {
                    if (result.data.success) {
                       return result.data.success;
                    } else {
                        return result.data;
                    }
                }, function (error) {
                    $window.location.href = "/login";
                });
            },
            getCurrentUser: function (cb) {
                $http.get('/app/user').then(function (response) {
                        if (response.data.login) {
                            $rootScope.currentUser = response.data;
                            if (cb) cb();
                        }
                    });
            }
        };
        return service;
    }
})();