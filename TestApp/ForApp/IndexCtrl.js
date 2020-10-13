var custApp = angular.module("custApp", ["ngRoute"]);

        custApp.config(function ($routeProvider) {
            $routeProvider.when('/cust',
                {
                    templateUrl: 'Forapp/cust.html',
                    controller: 'custController'
                });
            $routeProvider.when('/admin',
                {
                    templateUrl: 'Forapp/admin.html',
                    controller: 'adminController'
                });
            $routeProvider.when('/login',
                {
                    templateUrl: 'Forapp/login.html',
                    controller: 'loginController'
                });
            $routeProvider.otherwise({ redirectTo: '/login' });
        });

        custApp.factory('dataService', function ($http) {
            return {
                getData: function () {
                    var responseCustomers;
                    $http({ method: 'GET', url: '/api/TestCRUD' }).
                        then(function success(response) {
                            responseCustomers = response.data;
                        });

                    return responseCustomers;
                }
            }
        })





        