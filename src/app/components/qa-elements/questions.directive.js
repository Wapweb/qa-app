(function() {
    'use strict';

    angular
        .module('qa.elements', [])
        .directive('questions', questions);

    /** @ngInject */
    function questions() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/qa-elements/questions.template.html',
            scope: {
                questions: '='
            },
            controller: QuestionsController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function QuestionsController(moment, $scope) {
            var vm = this;
            // "vm.creation" is avaible by directive option "bindToController: true"
            //vm.relativeDate = moment(vm.creationDate).fromNow();
        }
    }

})();
