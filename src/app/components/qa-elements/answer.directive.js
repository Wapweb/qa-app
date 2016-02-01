(function() {
    'use strict';

    angular
        .module('qa.elements')
        .directive('answer', answer);

    /** @ngInject */
    function answer() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/qa-elements/answer.template.html',
            scope: {
                item: '='
            },
            controller: AnswerController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function AnswerController(moment, $scope) {
            var vm = this;
        }
    }

})();
