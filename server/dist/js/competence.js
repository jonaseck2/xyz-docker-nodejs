var competenceApp = angular.module('competenceApp', ['ngResource', 'ui.bootstrap']);

competenceApp.factory('Competence', function ($resource) {
    return $resource('/api/competence/me', {}, {
        put: {method:'PUT'}
    });
});

competenceApp.controller('CompetenceController', function ($scope, Competence) {
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
        angular.forEach($scope.allCompetence, function (competence, index) {
            if (competence.selected === true) {
                $scope.allCompetence.splice(index, 1);
            }
        })
    };

    $scope.submitData = function () {
        Competence.put($scope.allCompetence);
        $scope.messages.push({type: 'success', msg: 'Competence Submitted!'});
    }

    $scope.messages = [];

    $scope.closeAlert = function (index) {
        $scope.messages.splice(index, 1);
    };

})