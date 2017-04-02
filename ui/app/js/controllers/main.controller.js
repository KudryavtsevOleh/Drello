"use strict";

(() => {
    angular
    .module('theme.core.main_controller', ['theme.core.services'])
    .controller('MainController', ['$scope', '$theme', '$timeout', 'progressLoader', '$location', '$http', '$rootScope',
        function($scope, $theme, $timeout, progressLoader, $location, $http, $rootScope) {
            'use strict';
            // $scope.layoutIsSmallScreen = false;
            $scope.currentUser = $rootScope.currentUser;

            $scope.layoutFixedHeader = $theme.get('fixedHeader');
            $scope.layoutPageTransitionStyle = $theme.get('pageTransitionStyle');
            $scope.layoutDropdownTransitionStyle = $theme.get('dropdownTransitionStyle');

            $scope.layoutLoading = true;

            $scope.getLayoutOption = function(key) {
                return $theme.get(key);
            };

            $scope.$watch('layoutFixedHeader', function(newVal, oldval) {
                if (newVal === undefined || newVal === oldval) {
                    return;
                }
                $theme.set('fixedHeader', newVal);
            });
            $scope.$watch('layoutLayoutBoxed', function(newVal, oldval) {
                if (newVal === undefined || newVal === oldval) {
                    return;
                }
                $theme.set('layoutBoxed', newVal);
            });
            $scope.$watch('layoutLayoutHorizontal', function(newVal, oldval) {
                if (newVal === undefined || newVal === oldval) {
                    return;
                }
                $theme.set('layoutHorizontal', newVal);
            });
            $scope.$watch('layoutPageTransitionStyle', function(newVal) {
                $theme.set('pageTransitionStyle', newVal);
            });
            $scope.$watch('layoutDropdownTransitionStyle', function(newVal) {
                $theme.set('dropdownTransitionStyle', newVal);
            });

            $scope.hideHeaderBar = function() {
                $theme.set('headerBarHidden', true);
            };

            $scope.showHeaderBar = function($event) {
                $event.stopPropagation();
                $theme.set('headerBarHidden', false);
            };

            $scope.toggleLeftBar = function() {
                if ($scope.layoutIsSmallScreen) {
                    return $theme.set('leftbarShown', !$theme.get('leftbarShown'));
                }
                $theme.set('leftbarCollapsed', !$theme.get('leftbarCollapsed'));
            };

            $scope.toggleRightBar = function() {
                $theme.set('rightbarCollapsed', !$theme.get('rightbarCollapsed'));
            };

            $scope.hideChatBox = function() {
                $theme.set('showChatBox', false);
            };

            $scope.$on('themeEvent:maxWidth767', function(event, newVal) {
                $timeout(function() {
                    $scope.layoutIsSmallScreen = newVal;
                    if (!newVal) {
                        $theme.set('leftbarShown', false);
                    } else {
                        $theme.set('leftbarCollapsed', false);
                    }
                });
            });
            $scope.$on('themeEvent:changed:fixedHeader', function(event, newVal) {
                $scope.layoutFixedHeader = newVal;
            });
            $scope.$on('themeEvent:changed:layoutHorizontal', function(event, newVal) {
                $scope.layoutLayoutHorizontal = newVal;
            });
            $scope.$on('themeEvent:changed:layoutBoxed', function(event, newVal) {
                $scope.layoutLayoutBoxed = newVal;
            });

            $scope.isLoggedIn = false;
            $scope.logOut = function() {
                $scope.isLoggedIn = false;
                $rootScope.currentUser = null;
                $http.get('/logout').then(function() {
                    $location.path('/login').replace();
                });
            };
            $scope.logIn = function() {
                $scope.isLoggedIn = true;
            };

            $scope.$on('$routeChangeStart', function() {
                if ($location.path() === '') {
                    return $location.path('#!/');
                }
                progressLoader.start();
                progressLoader.set(50);
            });
            $scope.$on('$routeChangeSuccess', function() {
                progressLoader.end();
                if ($scope.layoutLoading) {
                    $scope.layoutLoading = false;
                }
            });
        }]);
})();