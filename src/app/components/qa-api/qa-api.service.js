(function() {
    'use strict';

    angular
        .module('qa.api' , [])
        .service('qaApiService', qaApiService);

    /** @ngInject */
    function qaApiService($log, $http, $q, toastr, API_URL) {

        var service = {
            getQuestions: getQuestions,
            getAnswers: getAnswers,
            getQuestion: getQuestion,
            addQuestion: addQuestion,
            addAnswer: addAnswer
        };

        return service;

        function getQuestions(type) {
            return $http.get(API_URL + "questions/?type=" + (type || "all"))
                .then(_returnResponse)
                .catch(_handleError);
        }

        function getAnswers(questionId) {
            return $http.get(API_URL + "questions/" + questionId + "/answers")
                .then(_returnResponse)
                .catch(_handleError);
        }

        function getQuestion(questionId) {
            return $http.get(API_URL + "questions/" + questionId)
                .then(_returnResponse)
                .catch(_handleError);
        }

        function addQuestion(question) {
            return $http.post(API_URL + "questions/", question)
                .then(_returnResponse)
                .catch(_handleError);
        }

        function addAnswer(questionId, answer) {
            return $http.post(API_URL + "questions/" + questionId + "/answers", answer)
                .then(_returnResponse)
                .catch(_handleError);
        }

        function  _returnResponse(response) {
           return response.data
        }

        function _handleError(response) {
            $log.debug("error ", response);
            toastr.error(response.data.error || "server error");
            return $q.reject(response.data);
        }
    }
})();
