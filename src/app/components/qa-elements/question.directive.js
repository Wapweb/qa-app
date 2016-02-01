(function() {
    'use strict';

    angular
        .module('qa.elements')
        .directive('question', question);

    /** @ngInject */
    function question() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/qa-elements/question.template.html',
            scope: {
                question: '=',
                showDetailsButton: '='
            },
            controller: QuestionController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function QuestionController(moment, $scope) {
            var vm = this;

        }
    }

})();
