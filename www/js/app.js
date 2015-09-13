// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngMockE2E', 'ngResource'])
// bower install angular-mocks --save
// <script src="lib/angular-mocks/angular-mocks.js"></script>
// https://docs.angularjs.org/api/ngMockE2E
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    views: {
        'signup-tab': {
          templateUrl: 'templates/signup.html'
        }
    }
  })
  .state('main', {
    url: '/',
    abstract: true,
    templateUrl: 'templates/main.html'
  })
  .state('main.dash', {
    url: 'main/dash',
    views: {
        'dash-tab': {
          templateUrl: 'templates/dashboard.html',
          controller: 'DashCtrl'
        }
    }
  })
  .state('main.public', {
    url: 'main/public',
    views: {
        'public-tab': {
          templateUrl: 'templates/public.html'
        }
    }
  })
  .state('main.admin', {
    url: 'main/admin',
    views: {
        'admin-tab': {
          templateUrl: 'templates/admin.html'
        }
    },
    data: {
      authorizedRoles: [USER_ROLES.admin]
    }
  });
  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("main.dash");
});
})
// dummy backend
.run(function($httpBackend){
  // $httpBackend.whenGET('http://dnctest.herokuapp.com/user/login')
  //       .respond({message: 'This is my valid response!'});
  // $httpBackend.whenGET('http://localhost:8100/notauthenticated')
  //       .respond(401, {message: "Not Authenticated"});
  // $httpBackend.whenGET('http://localhost:8100/notauthorized')
  //       .respond(403, {message: "Not Authorized"});
  // // $httpBackend.whenPOST('http://dnctest.herokuapp.com/user/login').respond(function(method, url, data) {
  //   isAuthenticated = true;
  //    return  [200 , { response: true, message: "Connected", authToken: "WEzMDQtYWYyMjkyMzNiOGIy" } ];
  // });
  $httpBackend.whenGET(/templates\/\w+.*/).passThrough();
  $httpBackend.whenPOST('http://dnctest.herokuapp.com/user/login').passThrough()
  // 	    .respond(200, {
  // id: 301,
  // username: 'owen',
  // email: 'me@no.com',
  // })
})


.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) {

    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }

    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
});
