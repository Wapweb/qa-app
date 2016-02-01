(function () {
    'use strict';

    angular
        .module('qa')
        .config(routerConfig);

    /** @ngInject */
    function routerConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('layout', {
                abstract: true,
                templateUrl: 'app/layout/layout.template.html',
                controller: 'LayoutController',
                controllerAs: 'vm'
            })
            .state('home' , {
                parent: 'layout',
                url: '/?type',
                templateUrl: 'app/main/main.html',
                controller: 'MainController',
                controllerAs: 'vm'
            })
            .state('question' , {
                parent: 'layout',
                url: '/question/:id',
                templateUrl: 'app/question/question.template.html',
                controller: 'QuestionController',
                controllerAs: 'vm',
                resolve: {
                    question: /** @njInject */
                        function(qaApiService, $stateParams, toastr) {
                            return qaApiService.getQuestion($stateParams.id)
                                .then(function(question) {return question;});
                        }

                }
            })

        ;

        $urlRouterProvider.otherwise('/');
    }

})();
