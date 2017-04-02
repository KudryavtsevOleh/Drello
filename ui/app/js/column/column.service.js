"use strict";

(() => {
    angular
        .module("drello")
        .service("ColumnService", (ColumnFactory) => {
            "ngInject";
            return {
                getColumns: () => {
                    return ColumnFactory.getColumns().$promise.then(function (data) {
                        return {
                            boards: data._embedded && data._embedded.columns || []
                        };
                    })
                },
                save: (board, success, failure) => {
                    ColumnFactory.save(board, success, failure);
                },
                delete: (id, success, failure) => {
                    ColumnFactory.delete({id: id}, success, failure);
                },
                update: (board, success, failure) => {
                    ColumnFactory.update(board, success, failure);
                }
            }
        });
})();
