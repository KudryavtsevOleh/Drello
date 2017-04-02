"use strict";

(() => {
    angular.module("drello").factory("ColumnFactory", ($resource) => {
        "ngInject";
        let baseUrl = "/api/columns/";
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
            getColumns: {
                method: "GET",
                params: {
                    projection: "column"
                }
            }
        });
    })
})();
