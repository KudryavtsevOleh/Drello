"use strict";

(function () {
    angular
        .module("drello")
        .factory("RegisterFactory", function ($resource) {
            "ngInject";
            let url = "/app/user/register";
            return $resource(url, {
                save: {
                    method: "POST"
                }
            })
        });
})();
