'use strict';
(function () {
    angular
        .module('drello')
        .run(['$rootScope', 'Auth',
            function ($rootScope, Auth) {
                Auth.getCurrentUser();
            }]);
})();