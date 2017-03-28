"use strict";

(() => {
    angular
        .module("drello")
        .controller("BoardEditController",
            function ($scope, BoardService, board, $uibModalInstance, notificationService, FormValidationService) {

                $scope.error = false;
                $scope.board = board;

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.hideError = function () {
                    $scope.error = false;
                };

                $scope.updateBoard = function (board, form) {

                    FormValidationService.makeFormDirty(form);
                    if (form.$invalid) {
                        notificationService.warning("Fill all required fields");
                        return;
                    }
                    BoardService.update(board, (resp) => {
                        $scope.cancel();
                    }, (resp) => {
                        notificationService.error(resp.data.message);
                    });
                };

            });
})();