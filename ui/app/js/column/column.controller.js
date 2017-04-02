"use strict";

(() => {
    angular
        .module("drello")
        .controller("ColumnController", ($scope, columns, $location, $rootScope, ColumnService, $uibModal) => {

            "ngInject";

            $scope.columns = columns;
            $scope.currentUser = $rootScope.currentUser;

            $scope.openCreateModal = function (size) {
                let modalInstance = $uibModal.open({
                    templateUrl: 'templates/fragments/column/add-column-modal.html',
                    controller: "ColumnCreateController",
                    resolve: {
                        columns: () => {
                            return $scope.columns;
                        }
                    },
                    size: size
                });
            };

            $scope.openDeleteConfirmModal = function (size, column) {
                let modalInstance = $uibModal.open({
                    templateUrl: "templates/fragments/column/column-delete-modal.html",
                    controller: "columnDeleteController",
                    resolve: {
                        column: () => {
                            return column;
                        },
                        columns: () => {
                            return $scope.columns;
                        }
                    },
                    size: size
                });
                $scope.refresh();
            };

            $scope.openEditConfirmModal = function (size, column) {
                let modalInstance = $uibModal.open({
                    templateUrl: "templates/fragments/column/edit-column-modal.html",
                    controller: "ColumnEditController",
                    resolve: {
                        column: () => {
                            return column;
                        }
                    },
                    size: size
                });
            };

        });
})();
