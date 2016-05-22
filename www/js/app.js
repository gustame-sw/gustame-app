// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('gustameapp', ['ionic']);

app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  var routes = [
    {
      name: "home",
      url: "/",
      templateUrl: "pages/home.html",
      controller: "HomeController"
    },
  ];

  for (var i = 0; i < routes.length; i++) {
    var route = routes[i];
    $stateProvider.state(route.name, route);
  }

  $urlRouterProvider.otherwise("/");
}]);

app.run(["$ionicPlatform", function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
}]);

app.controller("HomeController", ["$scope", function($scope) {
  $scope.pratos = [
    {
      id: 1,
      nome: "Pudim",
      descricao: "Delicioso pudim!"
    }
  ];
}]);
