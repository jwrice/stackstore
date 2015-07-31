app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'About', state: 'about' },
                { label: 'Products', state: 'products' },
                { label: 'Instructors', state: 'instructor'},
<<<<<<< HEAD
                { label: 'Cart', state: 'cart'}
                { label: 'Members Only', state: 'membersOnly', auth: true },
=======
                { label: 'Members Only', state: 'membersOnly', auth: true },
                { label: 'Cart', state: 'cart', auth: true},
                { label: 'GuestCart', state: 'guestCart'}
>>>>>>> e7a5d6d90b50b3d284338c8aaec5ecd5bbdcde25
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = $rootScope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = $rootScope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }

    };

});
