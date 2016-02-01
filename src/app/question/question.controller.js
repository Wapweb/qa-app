(function() {
    'use strict';

    angular
        .module('qa')
        .controller('QuestionController', QuestionController);

    /** @ngInject */
    function  QuestionController(toastr, $scope, $log, question, qaApiService) {
        var vm = this;
        vm.question = question;
        vm.addAnswer = addAnswer;

        init();

        function init() {
            qaApiService.getAnswers(vm.question.question_id)
                .then(bindAnswers);

            function bindAnswers(answers) {
                vm.answers = answers;
            }
        }

        function addAnswer(answer) {
            if(!answer) {
                toastr.error("server error");
            } else {
                toastr.success("Your answer added successfully");
                vm.answers = vm.answers || [];
                vm.answers.push(answer);
            }
        }


    }
})();