"use strict";

(() => {
    angular
    .module('theme.core.navigation_controller', ['theme.core.services'])
    .controller('NavigationController', function($scope, $location, $timeout, $rootScope) {

        "ngInject";

        $scope.menu = [
            {
                label: 'Boards',
                iconClasses: 'glyphicon glyphicon-th-list',
                url: '#!/boards'
            }];

        let setParent = function(children, parent) {
            angular.forEach(children, function(child) {
                child.parent = parent;
                if (child.children !== undefined) {
                    setParent(child.children, child);
                }
            });
        };

        $scope.findItemByUrl = function(children, url) {
            for (let i = 0, length = children.length; i < length; i++) {
                if (children[i].url && children[i].url.replace('#!', '') === url) {
                    return children[i];
                }
                if (children[i].children !== undefined) {
                    let item = $scope.findItemByUrl(children[i].children, url);
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
            for (let i = $scope.openItems.length - 1; i >= 0; i--) {
                $scope.openItems[i].open = false;
            }
            $scope.openItems = [];
            let parentRef = item;
            while (parentRef !== null) {
                parentRef.open = true;
                $scope.openItems.push(parentRef);
                parentRef = parentRef.parent;
            }

            // handle leaf nodes
            if (!item.children || (item.children && item.children.length < 1)) {
                $scope.selectedFromNavMenu = true;
                for (let j = $scope.selectedItems.length - 1; j >= 0; j--) {
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
        let highlight = function(item) {
            let parentRef = item;
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

        let highlightItems = function(children, query) {
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
                let item = $scope.findItemByUrl($scope.menu, $location.path());
                if (item) {
                    $timeout(function() {
                        $scope.select(item);
                    });
                }
            }
            $scope.selectedFromNavMenu = false;
        });
    });
})();