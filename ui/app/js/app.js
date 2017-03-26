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
        "view-segment",
        "drello.pnotify"
    ])
    .value("API", "/api")
    .config(["$routeSegmentProvider", "$locationProvider", "$routeProvider", "$httpProvider",
        function($routeSegmentProvider, $locationProvider, $routeProvider, $httpProvider) {
            var ROLE = {
                USER: "USER",
                ADMIN: "ADMIN"
            };
            $routeSegmentProvider.options.autoLoadTemplates = true;
            $locationProvider.hashPrefix("!");

            $routeSegmentProvider
                .when('/login', 'login')
                .segment('login', {
                    'default': true,
                    templateUrl: "templates/login.html",
                    controller: 'LoginController'
                })
                .when("/", "app", {roles: ['Unreachable route']})
                .when("/register", "register", {roles: ['Unreachable route']})
                .when("/boards", "boards")
                .segment("app", {
                    templateUrl: "templates/app.html"
                })
                .segment("register", {
                    templateUrl: "templates/registration.html",
                    controller: "RegisterController"
                })
                .segment("boards", {
                    templateUrl: "templates/fragments/boards.html",
                    controller: "BoardController"
                });

            $routeProvider.otherwise({redirectTo: "/login"});
            $httpProvider.interceptors.push("requestResponseObserver");
        }]);