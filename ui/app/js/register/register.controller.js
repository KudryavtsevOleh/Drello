"use strict";

(function () {
    angular
        .module("drello")
        .controller("RegisterController", function ($scope, RegisterService, $location, notificationService) {

            "ngInject";

            $scope.user = {};

            $scope.register = function () {
                //todo: reimplement it
                delete $scope.user.confirmPassword;
                RegisterService.registerNewUser($scope.user, () => {
                    $location.path("/boards");
                }, (error) => {
                    notificationService.error(error.message);
                })
            };

            $scope.checkPassword = () => {
                if ($scope.user.password !== $scope.user.confirmPassword) {
                    $scope.registerForm.$valid = false;
                    $scope.registerForm.userPassword.$invalid = true;
                    $scope.registerForm.confirmUserPassword.$invalid = true;
                    $scope.passwordError = true;
                } else {
                    $scope.passwordError = false;
                    $scope.registerForm.$valid = true;
                }
            }

        })
})();
