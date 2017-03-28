"use strict";

(() => {
    angular
        .module("drello")
        .service("BoardService", (BoardFactory) => {
            "ngInject";
            return {
                getBoards: (options) => {
                    let sort = options.predicate && options.reverse !== null ? options.predicate +',' + (options.reverse ? 'desc' : 'asc') : null;
                    return BoardFactory.getBoards({
                        page: options.page,
                        size: options.size,
                        sort: sort
                    }).$promise.then(function (data) {
                        return {
                            boards: data._embedded && data._embedded.boards || [],
                            page: data.page
                        };
                    })
                },
                save: (board, success, failure) => {
                    BoardFactory.save(board, success, failure);
                },
                delete: (id, success, failure) => {
                    BoardFactory.delete({id: id}, success, failure);
                },
                update: (board, success, failure) => {
                    BoardFactory.update(board, success, failure);
                }
            }
        });
})();
