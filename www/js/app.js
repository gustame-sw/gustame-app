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
    {
      name: "prato",
      url: "/prato/:pratoId",
      templateUrl: "pages/prato.html",
      controller: "PratoController"
    },
    {
      name: "pedido",
      url: "/pedido/realizar/:pratoId",
      templateUrl: "pages/pedido.html",
      controller: "PedidoController"
    }
  ];

  for (var i = 0; i < routes.length; i++) {
    var route = routes[i];
    $stateProvider.state(route.name, route);
  }

  $urlRouterProvider.otherwise("/");
}]);

app.run(["$ionicPlatform", "$ionicHistory", "$rootScope", function($ionicPlatform, $ionicHistory, $rootScope) {
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

    $rootScope.goBack = function() {
      $ionicHistory.goBack();
    };

    $rootScope.canBack = function() {
      return true;
    };
  });
}]);

app.controller("HomeController", ["$state", "$scope", function($state, $scope) {
  $scope.pratos = [
    {
      id: 1,
      nome: "Pudim",
      descricao: "Delicioso pudim!",
      imagemUrl: "http://s.glbimg.com/po/rc/media/2015/11/10/12_07_13_265_pudim_de_leite_condensado_4.jpg",
      cozinheiro: {
        nome: "João da Silva",
        cidade: "Novo Hamburgo",
        imagemUrl: "http://www.gravatar.com/avatar/39ea753c11ef1d94e09c1a9265767b4a"

      }
    }
  ];

  $scope.abrePrato = function(prato) {
    $state.go("prato", {pratoId: prato.id});
  };
}]);

app.controller("PratoController", ["$state", "$stateParams", "$scope", function($state, $stateParams, $scope) {
  $scope.prato = {
    id: 1,
    nome: "Pudim",
    descricao: "Delicioso pudim!",
    imagemUrl: "http://s.glbimg.com/po/rc/media/2015/11/10/12_07_13_265_pudim_de_leite_condensado_4.jpg",
    cozinheiro: {
      nome: "Gabriel Hoff",
      cidade: "Novo Hamburgo",
      imagemUrl: "http://www.gravatar.com/avatar/39ea753c11ef1d94e09c1a9265767b4a"

    }
  };

  $scope.buscarPratos = function() {
    $state.go("home");
  };

  $scope.efetuarPedido = function() {
    $state.go("pedido", {pratoId: $stateParams.pratoId});
  };
}]);

app.controller("PedidoController", ["$ionicLoading", "$state", "$stateParams", "$scope", function($ionicLoading, $state, $stateParams, $scope) {
  $scope.pedido = {
    consumidor: {}
  };

  $scope.pedido.prato = {
    id: 1,
    nome: "Pudim",
    descricao: "Delicioso pudim!",
    imagemUrl: "http://s.glbimg.com/po/rc/media/2015/11/10/12_07_13_265_pudim_de_leite_condensado_4.jpg",
    cozinheiro: {
      nome: "Gabriel Hoff",
      cidade: "Novo Hamburgo",
      imagemUrl: "http://www.gravatar.com/avatar/39ea753c11ef1d94e09c1a9265767b4a"

    }
  };

  $scope.visualizarPrato = function() {
    $state.go("prato", {pratoId: $stateParams.pratoId});
  };

  $scope.realizarPedido = function() {
    $ionicLoading.show();
  };
}]);
