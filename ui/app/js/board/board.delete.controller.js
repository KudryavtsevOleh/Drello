"use strict";

(() => {
    angular
        .module("drello")
        .controller("BoardDeleteController",
            function ($scope, $uibModalInstance, BoardService, board, boards) {

                "ngInject";

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };

                $scope.confirm = function () {
                    deleteWorkspace(board);
                };

                function deleteWorkspace(board) {
                    BoardService.delete(board.id, () => {
                        let index = boards.indexOf(board);
                        if(index > -1) {
                            boards.splice(index, 1);
                        }
                        $uibModalInstance.dismiss('cancel');
                    }, function(error) {
                        console.log(error);
                    });
                }

            })
})();