(function() {
    'use strict';

    angular
        .module('qa.elements')
        .directive('answerForm', answerForm);

    /** @ngInject */
    function answerForm() {
        var directive = {
            restrict: 'E',
            scope: {
                question: '=',
                onAdded: '&'
            },
            templateUrl: 'app/components/qa-elements/answer-form.template.html',
            controller: AnswerFormController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function AnswerFormController(toastr, qaApiService, $scope, $log) {
            var vm = this,
                answer = {
                    answer_message: '',
                    user_name: '',
                    question_id: vm.question.question_id
                };

            vm.answer = answer;
            vm.addAnswer = addAnswer;

            function addAnswer(isValid) {
                if(!isValid) {
                    toastr.warning("form is not valid");
                } else {
                    qaApiService.addAnswer(vm.question.question_id, vm.answer)
                        .then(function(question) {
                            vm.onAdded({item: question});
                            clearFormModel(vm.answer);
                        })
                }

                function clearFormModel(model) {
                    model.question_message = '';
                    model.user_name = '';
                }
            }

        }
    }

})();
