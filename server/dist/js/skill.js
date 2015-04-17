var skillApp = angular.module('skillApp', ['ngResource', 'ui.bootstrap', 'ui.unique']);

skillApp.factory('SkillList', function ($resource, $http) {
    if (typeof(apiUrl) != "undefined") return $resource(apiUrl+'/skillList/:id', {});
    return $resource('/api/skillList/:id', {});
});

skillApp.controller('SkillController', function ($scope, SkillList) {
    $scope.allSkills = SkillList.query();
    $scope.skillCategory = "Programming Language";

    $scope.getMyCtrlScope = function() {
        return $scope;
    }

    $scope.toggleSelected = function (skill) {
        if (skill.selected) {
            skill.class = "";
            skill.selected = false;
        } else {
            skill.class = "info";
            skill.selected = true;
        }
    };

    $scope.addSkill = function () {
        var skill = {name: $scope.skillName, category: $scope.skillCategory};
        SkillList.save(skill, function () {
            $scope.skillName = "";
            $scope.allSkills = SkillList.query();
            //$scope.messages.push({type: 'success', msg: 'Skill added!'});
        });
    };

    $scope.removeSkills = function () {
        angular.forEach($scope.allSkills, function (skill) {
            if (skill.selected === true) {
                SkillList.remove({ id: skill._id }, function () {
                    $scope.allSkills = SkillList.query();
                });
            }
        })
    };

    $scope.removeAllSkills = function () {
        angular.forEach($scope.allSkills, function (skill) {
            SkillList.remove({ id: skill._id }, function () {
                $scope.allSkills = SkillList.query();
            });
        })
    };

    $scope.addDefaultSkills = function () {
        var defaultSkills = [
            { category: "Programming Language", name: "Java SE" },
            { category: "Programming Language", name: "Java EE" },
            { category: "Programming Language", name: "C" },
            { category: "Programming Language", name: "C++" },
            { category: "Programming Language", name: "C#" },
            { category: "Programming Language", name: "Javascript" },
            { category: "Programming Language", name: "Perl" },
            { category: "Programming Language", name: "Python" },
            { category: "Programming Language", name: "PHP" },
            { category: "Programming Language", name: "Objective-C" },
            { category: "Programming Language", name: "Ruby" },
            { category: "Web Server", name: "Apache Tomcat" },
            { category: "Web Server", name: "JBoss" },
            { category: "Web Server", name: "Glassfish" },
            { category: "Database", name: "MySQL" },
            { category: "Database", name: "MongoDB" },
            { category: "Database", name: "Oracle" },
            { category: "Building Tool", name: "Maven" },
            { category: "Building Tool", name: "Gradle" },
            { category: "Building Tool", name: "sbt (Simple Build Tool)" },
            { category: "Building Tool", name: "Grunt" },
            { category: "Continuous Integration", name: "Hudson" },
            { category: "Continuous Integration", name: "TeamCity" },
            { category: "IDE", name: "Eclipse" },
            { category: "IDE", name: "IntelliJ IDEA" },
            { category: "IDE", name: "Visual Studio" }
        ];

        SkillList.save(defaultSkills, function () {
            $scope.allSkills = SkillList.query();
            //$scope.messages.push({type: 'success', msg: 'Default skills added!'});
        });
    }

    $scope.messages = [];

    $scope.closeAlert = function (index) {
        $scope.messages.splice(index, 1);
    };

})