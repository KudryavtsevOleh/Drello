"use strict";

(() => {
    angular.module("drello").factory("BoardFactory", ($resource) => {
        "ngInject";
        let baseUrl = "/api/boards/";
        return $resource(baseUrl + ":id", {id: "@id"}, {
            save: {
                method: "POST"
            },
            update: {
                method: "PUT"
            },
            delete: {
                method: "DELETE"
            },
            getBoards: {
                method: "GET"
            }
        });
    })
})();
