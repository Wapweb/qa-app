(function () {
    'use strict';

    angular
        .module('qa')
        .controller('MainController', MainController);

    /** @ngInject */
    function MainController(toastr, qaApiService, $stateParams) {
        var vm = this;
        vm.addQuestion = addQuestion;

        init();

        function init() {
            qaApiService.getQuestions($stateParams.type)
                .then(bindQuestions);

            function bindQuestions(questions) {
                vm.questions = questions;
            }
        }

        function addQuestion(question) {
            if(!question) {
                toastr.error("server error");
            } else {
                toastr.success("Your question added successfully");
                vm.questions = vm.questions || [];
                vm.questions.push(question);
            }

        }
    }
})();
