'use strict';
(function() {
    angular
        .module('drello')
        .factory('requestResponseObserver', ['$q', '$location', '$rootScope', function ($q, $location, $rootScope) {
            return {
                'request': function(config) {
                    return config;
                },
                'responseError': function(errorResponse) {
                    /**
                     * Check whether user access private page and redirect to login page if so.
                     *
                     * Should be called on 401 or 403 response status.
                     * Remove current user from rootScope.
                     *
                     * @params {Boolean} showIdleMessage
                     */
                    function redirectToLogin(showIdleMessage) {
                        $rootScope.currentUser = null;
                        $location.path("/login");
                    }

                    switch (errorResponse.status) {
                        case 401:
                            redirectToLogin(errorResponse.status == 401);
                    }
                    return $q.reject(errorResponse);
                }
            };
        }]);
})();