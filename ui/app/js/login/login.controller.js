'use strict';

(function () {
    angular
        .module('drello')
        .controller('LoginController', ['$scope', '$http', '$window', '$rootScope', 'Auth', '$location', "notificationService",
            function ($scope, $http, $window, $rootScope, Auth, $location, notificationService) {

                $scope.login = function () {
                    Auth.login($scope.user).then(function (resp) {
                        if (resp) {
                            Auth.getCurrentUser(function() {
                                    $location.path("/boards");
                            });
                        }

                        if (resp.error) {
                            notificationService.error(resp.error);
                        }
                    });
                };
            }]);
})();