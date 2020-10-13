custApp.controller("custController", function ($scope, $http) {

    $http({
        method: 'GET', url: '/api/TestCRUD'
        }
    ).
        then(function success(response) {

            $scope.customer = response.data;
            /*if (sessionStorage.getItem("token") == null) {
                $scope.forShow = { visible: false };
            }
            else {
                $scope.forShow = { visible: true };
            }*/
            $scope.forShow = { visible: true };
        }); 


    $scope.addItem = function (firstName, lastName, age, email, phone) {


        var tosend = { FirstName: firstName, LastName: lastName, Age: age, Email: email, Phone: phone };

        $http({ method: 'POST', url: '/api/TestCRUD', data: JSON.stringify(tosend) }).then(function success(response) {
            $scope.response = response.data;
            $scope.customer.push({ FirstName: firstName, LastName: lastName, Age: age, Email: email, Phone: phone });
        })
    };

    $scope.updateItem = function (item) {
        var index = $scope.customer.indexOf(item);
        var tosend = $scope.customer[index];

        $http({ method: 'PUT', url: '/api/TestCRUD', data: JSON.stringify(tosend) }).then(function success(response) {
            $scope.response = response.data;
            // $scope.customer = cust;
        })
    };

    $scope.deleteItem = function (item) {
        var index = $scope.customer.indexOf(item);
        var tosend = $scope.customer[index];

        $http({ method: 'delete', url: '/api/TestCRUD', data: angular.toJson(tosend), headers: { 'Content-Type': 'application/json' } }).then(function success(response) {
            $scope.response = response.data;
            $scope.customer.splice(index, 1);
        })
    };
});