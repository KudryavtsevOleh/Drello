"use strict";

(() => {
    angular
        .module("drello")
        .controller("BoardCreateController", (
            $scope,
            boards,
            BoardService,
            notificationService,
            $uibModalInstance,
            FormValidationService,
            itemsPerPage
        ) => {

            $scope.board = {};
            $scope.boards = boards;

            $scope.save = (form) => {

                FormValidationService.makeFormDirty(form);
                if (form.$invalid) {
                    notificationService.warning("Fill all required fields");
                    return;
                }

                BoardService.save($scope.board, (resp => {
                    if (boards.length < itemsPerPage) {
                        $scope.boards.push({
                            id: resp.id,
                            name: resp.name,
                            created: resp.created
                        });
                    }
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
