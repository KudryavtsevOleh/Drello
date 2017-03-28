'use strict';
(function () {
    angular
        .module('drello')
        .directive('sortableColumn', SortableColumnDirective);

    function SortableColumnDirective() {
        return {
            restrict: 'AEC',
            replace: true,
            transclude: true,
            scope: {
                'title': '@',
                'propertyName': '@',
                'reverse': '=',
                'predicate': '='
            },
            templateUrl: function(el, attrs) {
                var responsive = attrs.responsive == 'true' ? 'responsive.' : '';
                return 'templates/fragments/sortable.column/sortable.column.' + responsive + 'template.html';
            },
            controller: 'SortableColumnController'
        }
    }
})();