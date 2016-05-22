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
  });
}]);

app.controller("HomeController", ["$state", "PratoService", "$scope", function($state, PratoService, $scope) {
  $scope.pratos = [];

  $scope.abrePrato = function(prato) {
    $state.go("prato", {pratoId: prato._id});
  };

  PratoService.getList().then(function(pratos) {
    $scope.pratos = pratos;
  });
}]);

app.controller("PratoController", ["$state", "$stateParams", "PratoService", "$scope", function($state, $stateParams, PratoService, $scope) {
  $scope.prato = {};

  $scope.buscarPratos = function() {
    $state.go("home");
  };

  $scope.efetuarPedido = function() {
    $state.go("pedido", {pratoId: $stateParams.pratoId});
  };

  PratoService.getByIdentifier($stateParams.pratoId).then(function(prato) {
    $scope.prato = prato;
  });
}]);

app.controller("PedidoController", ["$ionicLoading", "$ionicPopup", "$state", "$stateParams", "PratoService", "PedidoService", "$scope", function($ionicLoading, $ionicPopup, $state, $stateParams, PratoService, PedidoService, $scope) {
  $scope.pedido = {
    consumidor: {},
    prato: null
  };

  $scope.visualizarPrato = function() {
    $state.go("prato", {pratoId: $stateParams.pratoId});
  };

  $scope.realizarPedido = function() {
    $ionicLoading.show();

    PedidoService.realizarPedido($scope.pedido).then(function() {
      $ionicLoading.hide();

      var alerta = $ionicPopup.alert({
        title: "Pedido realizado",
        template: "Em seguida entraremos em contato!"
      });

      alerta.then(function() {
        $state.go("home");
      });
    }, function() {
      $ionicLoading.hide();
    });
  };

  PratoService.getByIdentifier($stateParams.pratoId).then(function(prato) {
    $scope.pedido.prato = prato;
  });
}]);

app.service("PratoService", ["$q", "$timeout", "$http", function($q, $timeout, $http) {
  var PratoService = this;

  this.getList = function() {
    return $http.get("/api/pratos/").then(function(response) {
      return response.data;
    }, function(test) {
      return $timeout(1000).then(function() {
        return PratoService.getList();
      });
    });
  };

  this.getByIdentifier = function(id) {
    return $http.get("/api/pratos/" + id).then(function(response) {
      return response.data;
    }, function() {
      return $timeout(1000).then(function() {
        return PratoService.getByIdentifier(id);
      });
    });
  };
}]);

app.service("PedidoService", ["$timeout", "$http", function($timeout, $http) {
  var PedidoService = this;

  this.realizarPedido = function(pedido) {
    return $http.post("/api/pedidos/", pedido).then(function() {

    }, function() {
      return $timeout(1000).then(function() {
        return PedidoService.realizarPedido(pedido);
      });
    });
  };
}]);
