var coffeeApp = angular.module('coffeeApp', ['ngResource', 'ui.bootstrap']);


coffeeApp.factory('CoffeeShopLocator', function ($resource) {
    return $resource('/service/coffeeshop/nearest/:latitude/:longitude',
        {latitude: '@latitude', longitude: '@longitude'}, {});
});

coffeeApp.controller('CoffeeShopController', function ($scope, $window, CoffeeShopLocator) {
    $scope.findCoffeeShopNearestToMe = function () {
        window.navigator.geolocation.getCurrentPosition(function (position) {
            $scope.getCoffeeShopAt(position.coords.latitude, position.coords.longitude)
        }, null);
    };
    $scope.getCoffeeShopAt = function (latitude, longitude) {
        CoffeeShopLocator.get({latitude: latitude, longitude: longitude}).$promise
            .then(
            function (value) {
                $scope.nearestCoffeeShop = value;
            })
            .catch(
            function (value) {
                //default coffee shop
                $scope.getCoffeeShopAt(51.4994678, -0.128888);
            });
    };
});

coffeeApp.factory('CoffeeOrder', function ($resource) {
    return $resource('/service/coffeeshop/:id/order/',
        {id: '@coffeeShopId'}, {}
    );
});

coffeeApp.factory('AddUser', function ($resource) {
    return $resource('/service/coffeeshop/adduser/', {} );
});

coffeeApp.factory('RemoveUser', function ($resource) {
    return $resource('/service/coffeeshop/removeuser/', {} );
});

coffeeApp.factory('GetUsers', function ($resource) {
    return $resource('/service/coffeeshop/getusers/', {} );
});

coffeeApp.factory('Competence', function ($resource) {
    return $resource('/api/competence/', {} );
});

coffeeApp.controller('UserController', function ($scope, Competence) {
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
        angular.forEach($scope.allCompetence, function (user) {
            if (user.selected) {
                RemoveUser.save(user,
                    function (user) {
                        $scope.allUsers = GetUsers.query();
                        $scope.messages.push({type: 'warning', msg: 'User removed!'})
                    })
            }
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