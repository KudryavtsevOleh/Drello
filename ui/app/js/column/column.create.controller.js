"use strict";

(() => {
    angular
        .module("drello")
        .controller("ColumnCreateController", (
            $scope,
            columns,
            ColumnService,
            notificationService,
            $uibModalInstance,
            FormValidationService
        ) => {

            $scope.column = {};
            $scope.columns = columns;

            $scope.save = (form) => {

                FormValidationService.makeFormDirty(form);
                if (form.$invalid) {
                    notificationService.warning("Fill all required fields");
                    return;
                }

                ColumnService.save($scope.column, (resp => {
                    $scope.columns.push({
                        id: resp.id,
                        name: resp.name,
                        created: resp.created
                    });
                    $scope.cancel();
                }), (err) => {
                    notificationService.error(err.msg);
                });
            };

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        })
})();
