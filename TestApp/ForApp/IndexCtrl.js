 var custApp = angular.module("custApp", []);
        custApp.controller("custController", function ($scope, $http) {

            $http({ method: 'GET', url: '/api/TestCRUD' }).
                then(function success(response) {

                    $scope.customer = response.data;
                });

            $scope.addItem = function (firstName, lastName, age, email, phone) {
                $scope.customer.push({ FirstName: firstName, LastName: lastName, Age: age, Email: email, Phone: phone });

                var tosend = { FirstName: firstName, LastName: lastName, Age: age, Email: email, Phone: phone };

                $http({ method: 'POST', url: '/api/TestCRUD', data: JSON.stringify(tosend) }).then(function success(response) {
                    $scope.response = response.data;
                })
            };

            $scope.updateItem = function (cust) {
                $scope.customer = cust;

                var tosend = cust;

                $http({ method: 'PUT', url: '/api/TestCRUD', data: JSON.stringify(tosend) }).then(function success(response) {
                    $scope.response = response.data;
                })
            };

            $scope.deleteItem = function (item) {
                var index = $scope.customer.indexOf(item);
                var tosend = $scope.customer[index];
                $scope.customer.splice(index, 1); 

                $http({ method: 'delete', url: '/api/TestCRUD', data: angular.toJson(tosend), headers: { 'Content-Type': 'application/json' } }).then(function success(response) {
                    $scope.response = response.data;
                })
            };
});