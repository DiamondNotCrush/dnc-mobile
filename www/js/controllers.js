angular.module('starter')

.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.username = AuthService.username();

  $scope.$on(AUTH_EVENTS.notAuthorized, function(event) {
    var alertPopup = $ionicPopup.alert({
      title: 'Unauthorized!',
      template: 'You are not allowed to access this resource.'
    });
  });

  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });
  $scope.goBack = function() {
    $ionicNavBarDelegate.back();
  };
  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {
  $scope.data = {};
  $scope.login = function() {
    AuthService.login($scope.data.username, $scope.data.password).then(function(authenticated) {
    	      

      $state.go('main.dash', {}, {reload: true});

      $scope.setCurrentUsername(authenticated.username);
      console.log(authenticated.data.id)
      console.log(authenticated)
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
})

.controller('DashCtrl', function($scope, $state, $http, $ionicPopup, AuthService) {


	    $http.get('http://dnctest.herokuapp.com/connection/library/301').success(
      function(result) {
      	console.log(result[0].name)
        // No result here..
        $scope.result = result;

        console.log(result[1].url)

      }, function(err) {
        $scope.response = err;
      });
  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };

});


