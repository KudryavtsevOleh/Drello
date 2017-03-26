"use strict";

(function () {
    angular.module("drello").service("RegisterService", function (RegisterFactory) {
        "ngInject";
        return {
            registerNewUser: (user, success, failure) => {
                return RegisterFactory.save(user, success, failure);
            }
        }
    })
})();
