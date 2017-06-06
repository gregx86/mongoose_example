(function () {
    angular.module('myApp', [])
        .controller('MainCtrl', MainCtrl)

    MainCtrl.$inject = ['$http'];

    function MainCtrl($http) {
        var vm = this;

        vm.message = 'Messagesacsac';


        getUsers();

        vm.saveUser = function(user) {
            console.log(user);
            $http.post('/addUser', user).then(function (data) {
                console.log(data);
            }).catch(function (err) {
                console.log(err);
            });
        };

        vm.updateUser = function (user) {
            console.log(user);
            $http.post('/updateUser', user)
                .then(function (response) {
                    console.log(response);
                }).catch(function (err) {
                    console.log(err);
            });
        };

        function getUsers() {
            $http.get('/users')
                .then(function (response) {
                    console.log("Users", response.data);
                    vm.users = response.data;
                })
                .catch(function (err) {
                console.log(err);
            });
        }
    }
})();