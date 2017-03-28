"use strict";

(() => {
    angular
        .module("drello")
        .factory("FormValidationService", () => {
            "ngInject";
            return {
                makeFormDirty: (form) => {
                    if (!form) {
                        return;
                    }

                    angular.forEach(form.$error, function(errorType) {
                        angular.forEach(errorType, function(field) {
                            field.$setDirty();
                        });
                    });
                }
            }
        });
})();
