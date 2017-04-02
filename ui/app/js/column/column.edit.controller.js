"use strict";

(() => {
    angular
        .module("drello")
        .controller("ColumnEditController",
            function ($scope, ColumnService, column, $uibModalInstance, notificationService, FormValidationService) {

                $scope.error = false;
                $scope.column = column;

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.hideError = function () {
                    $scope.error = false;
                };

                $scope.updateColumn = function (column, form) {

                    FormValidationService.makeFormDirty(form);
                    if (form.$invalid) {
                        notificationService.warning("Fill all required fields");
                        return;
                    }
                    ColumnService.update(column, (resp) => {
                        $scope.cancel();
                    }, (resp) => {
                        notificationService.error(resp.data.message);
                    });
                };

            });
})();