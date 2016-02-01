(function () {
    'use strict';

    angular
        .module('qa')
        .controller('LayoutController', LayoutController);

    /** @ngInject */
    function LayoutController($scope, $stateParams) {
        var vm = this;
        vm.test = $stateParams;
    }
})();
