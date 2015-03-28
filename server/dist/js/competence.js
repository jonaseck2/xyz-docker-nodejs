var competenceApp = angular.module('competenceApp', ['ngResource', 'ui.bootstrap']);

competenceApp.factory('Competence', function ($resource) {
    return $resource('/api/competence/:id', {});
    //return $resource('http://localhost:3232/competence/:id', {});
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
        Competence.save($scope.competence, function () {
            $scope.competence = {};
            $scope.allCompetence = Competence.query();
            //$scope.messages.push({type: 'success', msg: 'Competence added!'});
        })
    };

    $scope.removeCompetence = function () {
        angular.forEach($scope.allCompetence, function (competence) {
            if (competence.selected === true) {
                Competence.remove({id:competence._id}, function () {
                    $scope.allCompetence = Competence.query();
                });
            }
        })
    };

    $scope.messages = [];

    $scope.closeAlert = function (index) {
        $scope.messages.splice(index, 1);
    };

})