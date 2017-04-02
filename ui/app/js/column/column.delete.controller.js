"use strict";

(() => {
    angular
        .module("drello")
        .controller("ColumnDeleteController",
            function ($scope, $uibModalInstance, ColumnService, column, columns) {

                "ngInject";

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.confirm = function () {
                    ColumnService.delete(column.id, () => {
                        let index = columns.indexOf(column);
                        if(index > -1) {
                            columns.splice(index, 1);
                        }
                        $uibModalInstance.dismiss('cancel');
                    }, function(error) {
                        console.log(error);
                    });
                };

            })
})();