"use strict";

(function () {
    angular
        .module("drello")
        .controller("FooterController", ["$scope", function ($scope) {
            $scope.year = new Date().getFullYear();
        }]);
}());