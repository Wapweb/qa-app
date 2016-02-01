(function() {
    'use strict';

    angular
        .module('qa.elements')
        .directive('answers', answers);

    /** @ngInject */
    function answers() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/qa-elements/answers.template.html',
            scope: {
                items: '='
            },
            controller: AnswersController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function AnswersController(moment, $scope, $log) {
            var vm = this;
            // "vm.creation" is avaible by directive option "bindToController: true"
            //vm.relativeDate = moment(vm.creationDate).fromNow();
        }
    }

})();
