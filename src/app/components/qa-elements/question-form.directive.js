(function() {
    'use strict';

    angular
        .module('qa.elements')
        .directive('questionForm', questionForm);

    /** @ngInject */
    function questionForm() {
        var directive = {
            restrict: 'E',
            scope: {
                onAdded: '&'
            },
            templateUrl: 'app/components/qa-elements/question-form.template.html',
            controller: questionFormController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;

        /** @ngInject */
        function questionFormController(toastr, qaApiService, $scope, $log) {
            var vm = this,
                question = {
                    question_message: '',
                    user_name: ''
                };

            vm.question = question;
            vm.addQuestion = addQuestion;

            function addQuestion(isValid) {
                if(!isValid) {
                    toastr.warning("form is not valid");
                } else {
                    qaApiService.addQuestion(vm.question)
                        .then(function(question) {
                            vm.onAdded({item: question});
                            clearFormModel(vm.question)
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
