'use strict';
(function () {
    angular
        .module('drello')
        .directive('iCheck', ICheckDirective);

    ICheckDirective.$inject = ['$timeout'];
    function ICheckDirective($timeout) {
        return {
            require: '?ngModel',
            link: link
        };

        function link($scope, element, $attrs, ngModel) {
            return $timeout(function () {
                var parentLabel = element.parent('label');
                if (parentLabel.length) {
                    parentLabel.addClass('icheck-label');
                }

                var value = $attrs.value;
                var $element = $(element);

                // Instantiate the iCheck control.
                $element.iCheck({
                    checkboxClass: 'icheckbox_minimal-blue',
                    radioClass: 'iradio_minimal-blue',
                    increaseArea: '20%'
                });

                // If the model changes, update the iCheck control.
                $scope.$watch($attrs.ngModel, function (newValue) {
                    $element.iCheck('update');
                });

                // If the iCheck control changes, update the model.
                $element.on('ifChanged', function (event) {
                    if ($element.attr('type') === 'radio' && $attrs.ngModel) {
                        $scope.$apply(function () {
                            ngModel.$setViewValue(value);
                        });
                    }
                    if ($element.attr('type') === 'checkbox' && $attrs.ngModel) {
                        $scope.$apply(function () {
                            ngModel.$setViewValue(event.target.checked);
                        });
                    }
                });

            });
        }
    }
})();