angular
    .module("drello", [
        "ui.bootstrap",
        "theme.core.panels",
        "theme.core.directives",
        "theme.core.main_controller",
        "theme.core.navigation_controller",
        "ngRoute",
        "ngResource",
        "route-segment",
        "view-segment"
    ])
    .value("API", "/api")
    .config(["$routeSegmentProvider", "$locationProvider", "$routeProvider", "$httpProvider",
        function($routeSegmentProvider, $locationProvider, $routeProvider, $httpProvider) {
            $routeSegmentProvider.options.autoLoadTemplates = true;
            $locationProvider.hashPrefix("!");


            $routeProvider.otherwise({redirectTo: "/login"});
            $httpProvider.interceptors.push("requestResponseObserver");
        }]);