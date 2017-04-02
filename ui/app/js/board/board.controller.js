"use strict";

(() => {
    angular
        .module("drello")
        .controller("BoardController", ($scope, boards, $location, $rootScope, BoardService, $uibModal) => {

            "ngInject";

            $scope.boards = boards;
            $scope.currentUser = $rootScope.currentUser;
            $scope.isAdmin = $scope.currentUser.roles.indexOf("ROLE_ADMIN") != -1;
            $scope.pagination = {};
            $scope.sort = {};
            $scope.itemsCountPerPage = [10, 50, 100];
            updatePaginationData(boards);

            $scope.goToBoardColumnsPage = (id) => {
                $location.path("/board/" + id + "/columns");
            };

            $scope.openCreateModal = function (size) {
                let modalInstance = $uibModal.open({
                    templateUrl: 'templates/fragments/board/add-board-modal.html',
                    controller: "BoardCreateController",
                    resolve: {
                        boards: () => {
                            return $scope.boards;
                        },
                        itemsPerPage: () => {
                            return $scope.pagination.itemsPerPage;
                        }
                    },
                    size: size
                });
            };

            $scope.openDeleteConfirmModal = function (size, board) {
                let modalInstance = $uibModal.open({
                    templateUrl: "templates/fragments/board/board-delete-modal.html",
                    controller: "BoardDeleteController",
                    resolve: {
                        board: () => {
                            return board;
                        },
                        boards: () => {
                            return $scope.boards;
                        }
                    },
                    size: size
                });
                $scope.refresh();
            };

            $scope.openEditConfirmModal = function (size, board) {
                let modalInstance = $uibModal.open({
                    templateUrl: "templates/fragments/board/edit-board-modal.html",
                    controller: "BoardEditController",
                    resolve: {
                        board: () => {
                            return board;
                        }
                    },
                    size: size
                });
            };

            $scope.pageSizeChanged = function () {
                if ($scope.pagination.elementsPerPage != $scope.pagination.itemsPerPage && $scope.pagination.elementsPerPage) {
                    $scope.pagination.itemsPerPage = $scope.pagination.elementsPerPage;
                    $scope.refresh();
                }
            };

            function updatePaginationData(boardsObj) {
                $scope.boards = boardsObj.boards;
                $scope.pagination.totalItems = boardsObj.page.totalElements;
                $scope.pagination.currentPage = boardsObj.page.number + 1;
                $scope.pagination.itemsPerPage = boardsObj.page.size;
                if ($scope.pagination.itemsPerPage != $scope.pagination.elementsPerPage) {
                    $scope.pagination.elementsPerPage = $scope.pagination.itemsPerPage;
                }
            }

            $scope.refresh = function () {
                BoardService.getBoards({
                    page: $scope.pagination.currentPage - 1,
                    size: $scope.pagination.itemsPerPage,
                    predicate: $scope.sort.predicate,
                    reverse: $scope.sort.reverse
                }).then(updatePaginationData);
            };

        });
})();
