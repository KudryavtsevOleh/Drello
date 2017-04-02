'use strict';
(function () {
    angular
        .module('drello')
        .controller('SortableColumnController', SortableColumnController);

    SortableColumnController.$inject = ['$scope'];
    function SortableColumnController($scope) {
        $scope.click = function(){
            $scope.reverse =!isMyProperty() ? null : $scope.reverse;
            $scope.predicate = $scope.propertyName;
            $scope.reverse = $scope.reverse ? false : ($scope.reverse === null ? true : null);
        };

        $scope.isUp = function(){
            return isMyProperty() && $scope.reverse === false
        };

        $scope.isDown = function(){
            return isMyProperty() && $scope.reverse === true
        };

        $scope.isDefault = function(){
            return !isMyProperty() || $scope.reverse == null
        };

        $scope.isActive = isMyProperty;

        function isMyProperty() {
            return $scope.predicate == $scope.propertyName
        }
    }
})();