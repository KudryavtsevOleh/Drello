"use strict";

(() => {
    angular
    .module('theme.core.navigation_controller', ['theme.core.services'])
    .controller('NavigationController', ['$scope', '$location', '$timeout', '$rootScope', function($scope, $location, $timeout, $rootScope) {
        'use strict';

        $scope.menu = [
            {
                label: 'Test',
                iconClasses: 'glyphicon glyphicon-th-list',
                url: '#!/'
            }];

        var setParent = function(children, parent) {
            angular.forEach(children, function(child) {
                child.parent = parent;
                if (child.children !== undefined) {
                    setParent(child.children, child);
                }
            });
        };

        $scope.findItemByUrl = function(children, url) {
            for (var i = 0, length = children.length; i < length; i++) {
                if (children[i].url && children[i].url.replace('#!', '') === url) {
                    return children[i];
                }
                if (children[i].children !== undefined) {
                    var item = $scope.findItemByUrl(children[i].children, url);
                    if (item) {
                        return item;
                    }
                }
            }
        };

        setParent($scope.menu, null);

        $scope.openItems = []; $scope.selectedItems = []; $scope.selectedFromNavMenu = false;

        $scope.select = function(item) {
            // close open nodes
            if (item.open) {
                item.open = false;
                return;
            }
            for (var i = $scope.openItems.length - 1; i >= 0; i--) {
                $scope.openItems[i].open = false;
            }
            $scope.openItems = [];
            var parentRef = item;
            while (parentRef !== null) {
                parentRef.open = true;
                $scope.openItems.push(parentRef);
                parentRef = parentRef.parent;
            }

            // handle leaf nodes
            if (!item.children || (item.children && item.children.length < 1)) {
                $scope.selectedFromNavMenu = true;
                for (var j = $scope.selectedItems.length - 1; j >= 0; j--) {
                    $scope.selectedItems[j].selected = false;
                }
                $scope.selectedItems = [];
                parentRef = item;
                while (parentRef !== null) {
                    parentRef.selected = true;
                    $scope.selectedItems.push(parentRef);
                    parentRef = parentRef.parent;
                }
            }
        };

        $scope.highlightedItems = [];
        var highlight = function(item) {
            var parentRef = item;
            while (parentRef !== null) {
                if (parentRef.selected) {
                    parentRef = null;
                    continue;
                }
                parentRef.selected = true;
                $scope.highlightedItems.push(parentRef);
                parentRef = parentRef.parent;
            }
        };

        var highlightItems = function(children, query) {
            angular.forEach(children, function(child) {
                if (child.label.toLowerCase().indexOf(query) > -1) {
                    highlight(child);
                }
                if (child.children !== undefined) {
                    highlightItems(child.children, query);
                }
            });
        };

        $rootScope.$watch('$routeChangeSuccess', function() {
            if ($scope.selectedFromNavMenu === false) {
                var item = $scope.findItemByUrl($scope.menu, $location.path());
                if (item) {
                    $timeout(function() {
                        $scope.select(item);
                    });
                }
            }
            $scope.selectedFromNavMenu = false;
            $scope.searchQuery = '';
        });
    }]);
})();