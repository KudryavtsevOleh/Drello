'use strict';

(function () {
    angular
        .module('drello')
        .controller('LoginController', ['$scope', '$http', '$window', '$rootScope', 'Auth', '$location', "notificationService",
            function ($scope, $http, $window, $rootScope, Auth, $location, notificationService) {

                $scope.login = function () {
                    Auth.login($scope.user).then((resp) => {
                        if (resp) {
                            Auth.getCurrentUser(() => {
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