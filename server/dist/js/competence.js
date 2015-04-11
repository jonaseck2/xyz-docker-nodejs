var competenceApp = angular.module('competenceApp', ['ngResource', 'ui.bootstrap', 'ui.unique']);

competenceApp.factory('Competence', function ($resource, $http) {
    if (typeof(apiUrl) != "undefined") return $resource(apiUrl+'/competence/:id', {});
    return $resource('/api/competence/:id', {});
});

competenceApp.factory('SkillList', function ($resource, $http) {
    if (typeof(apiUrl) != "undefined") return $resource(apiUrl+'/skillList/:id', {});
    return $resource('/api/skillList/:id', {});
});

competenceApp.controller('CompetenceController', function ($scope, Competence, SkillList) {
    $scope.allCompetence = Competence.query();
    $scope.skills = SkillList.query();
    $scope.competence = {category: "Programming"};
    $scope.skillLevels = ['Beginner', 'Familiar', 'Proficient', 'Expert', 'Master'];

    $scope.setSkill = function (skill) {
        $scope.competence.skill = skill;
    }

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
            var skill = { name: $scope.competence.skill, category: $scope.competence.category}
            SkillList.save(skill);
            $scope.competence = {};
            $scope.allCompetence = Competence.query();
            //$scope.messages.push({type: 'success', msg: 'Competence added!'});
        });
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