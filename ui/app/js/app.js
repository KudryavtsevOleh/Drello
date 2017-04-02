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
    .config(
        function($routeSegmentProvider, $locationProvider, $routeProvider, $httpProvider) {

            "ngInject";

            let ROLE = {
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
                .when("/boards", "app.boards")
                .when("/board/:id/columns", "app.columns")
                .segment("register", {
                    templateUrl: "templates/registration.html",
                    controller: "RegisterController"
                })
                .segment("app", {
                    templateUrl: "templates/app.html"
                })
                .within()
                    .segment("boards", {
                        templateUrl: "templates/fragments/board/boards.html",
                        controller: "BoardController",
                        resolve: {
                            boards: (BoardService) => {
                                return BoardService.getBoards({
                                    page: 0,
                                    size: 10
                                });
                            }
                        }
                    })
                    .segment("columns", {
                        templateUrl: "templates/fragments/column/columns.html",
                        controller: "ColumnCreateController",
                        resolve: {
                            columns: (ColumnService) => {
                                return ColumnService.getColumns();
                            }
                        }
                    });

            $routeProvider.otherwise({redirectTo: "/login"});
            $httpProvider.interceptors.push("requestResponseObserver");
        });