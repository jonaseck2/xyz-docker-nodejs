var competenceApp = angular.module('competenceApp', ['ngResource', 'ui.bootstrap']);

competenceApp.factory('Competence', function ($resource) {
    return $resource('/api/competence/', {} );
});

competenceApp.controller('CompetenceController', function ($scope, Competence) {
    //$scope.allCompetence = [];

    $scope.allCompetence = Competence.query();

    $scope.toggleSelected = function (competence) {
        if (competence.selected) {
            competence.class = "";
            competence.selected = false;
        } else {
            competence.class = "info";
            competence.selected = true;
        }
    };

    $scope.addCompetence = function () {
        $scope.allCompetence.push(angular.copy($scope.competence));
        $scope.competence = {};
    };

    $scope.removeCompetence = function () {
        angular.forEach($scope.allCompetence, function (competence) {
            $scope.messages.push({type: 'warning', msg: 'Competence removed!'})
        })
    };

    $scope.submitData = function () {
        Competence.save($scope.allCompetence);
    }

    $scope.messages = [];

    $scope.closeAlert = function (index) {
        $scope.messages.splice(index, 1);
    };

})