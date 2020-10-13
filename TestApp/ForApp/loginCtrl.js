custApp.controller("loginController", function ($scope, $http)  {

    $scope.register = function (email, pwd, confirmpwd) {
        if (pwd != confirmpwd)
        {
            alert("Пароли не совпадают!");
        }

        var tosend = { Login: email, Password: pwd};

        $http({ method: 'POST', url: '/api/Account', data: JSON.stringify(tosend)}).then(function success() {
            alert("Регистрация пройдена");
        })

    };

    $scope.submitLogin = function (emaillogin, passwordLogin) {
        var tosend = { Login: emaillogin, Password: passwordLogin };
        $http({
            method: 'POST', url: '/api/Register', data: JSON.stringify(tosend) })
            .then(function success(response) {
            $scope.data = { visible: true };
                $scope.UserName = response.data.userName;
            })
    };
    /*
    $scope.logOut = function () {

        window.sessionStorage.removeItem("token");
        $scope.data = { visible: false };
    };*/

})
