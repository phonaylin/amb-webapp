/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ambWebApp.bus', [
  'ui.router',
  'plusOne',
  'ui.bootstrap', 'ngSanitize', 'ui.select'
  // 'bus.search'
])

.directive('busSearch', function() {
  return {
    templateUrl: 'bus.search.tpl.html'
  };
})

/* Bus Ordering service
*/
.factory('busOrderService', ['$http', function busOrderServiceFactory($http) {
  var busOrder = {};

  busOrder.fromCity = {};
  busOrder.toCity = {};
  busOrder.offer = {};
  busOrder.travelDt = null;
  busOrder.myOrder = {};

  busOrder.initNewOrder = function(offer) {
    var order = {
      offerId: offer.id,
      customer: {
        id: -1,
        createdDate: null,
        modifiedDate: null,
        firstName: "",
        lastName: "",
        emailAddress: "",
        contactNumber: ""
      },
      comment: null,
      totalAmount: null,
      unitPrice: offer.fare,
      orderStatus: null,
      passengers: []
    };

    return order;
  };

  var busServiceURL  = 'http://localhost:8080/bus';
  busOrder.searchOffers = function(fromCityId, toCityId) {
    return $http.get(busServiceURL + '/offers?from='+ fromCityId +'&to='+ toCityId +'&date=2015-08-02'); //thingstodotab3
  };

  busOrder.saveOrder = function(order) {
    return $http.post(busServiceURL + '/order', order);
  };

  return busOrder;

}])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'bus', {
      url: '/bus',
      views: {
        "main": {
          controller: 'BusSearchCtrl',
          templateUrl: 'bus/bus.search.tpl.html'
        }
      },
      data:{ pageTitle: 'Bus' }
    })
    .state( 'bus.offers', {
      url: '/offers?fromCityId&toCityId',
      resolve: {
          busOffers: ['$stateParams', 'busOrderService',
              function($stateParams, busOrderService) {
                return busOrderService.searchOffers($stateParams.fromCityId, $stateParams.toCityId);
          }]
          // busOrder: function() { return {}; }
      },
      views: {
        "offers": {
          controller: 'BusOffersCtrl',
          templateUrl: 'bus/bus.offers.tpl.html'
        }
      },
      data:{ pageTitle: 'Bus Offers' }
    })
    .state( 'bus.order', {
      url: '/order',
      views: {
        "order": {
          controller: 'BusOrderCtrl',
          templateUrl: 'bus/bus.order.tpl.html'
        }
      },
      data:{ pageTitle: 'Bus Order' }
    })
    ;
})


/**
 * Search provider
 */
.controller( 'BusSearchCtrl', ['$scope', '$http', 'busOrderService',
  function BusSearchController($scope, $http, busOrderService) {
    $scope.fromCity= {};
    $scope.toCity = {};
    // inject the static data of cities into scope
    // $scope.cities = $window.cities;
    $scope.cities = [
    {name: 'Yangon', code: '1'},
    {name: 'Mandalay', code: '2'},
    {name: 'Inle', code: '3'},
    {name: 'Bagan', code: '4'},
    {name: 'Pyin Oo Lwin', code: '5'},
    {name: 'Naypyitaw', code: '6'},
    {name: 'Taunggyi', code: '7'}
    ];

    $scope.filterToCity = function(item){
      console.log($scope.toCity.code);
      console.log(item.code);
      return (item.code!=$scope.toCity.code);
    };

    $scope.disabled = undefined;

    $scope.enable = function() {
      $scope.disabled = false;
    };

    $scope.disable = function() {
      $scope.disabled = true;
    };

    $scope.clear = function() {
      $scope.fromCity.selected = undefined;
      $scope.toCity.selected = undefined;
    };

    $scope.searchOffers = function() {
      // busOrder.fromCity = $scope.fromCity.selected;
      // busOrder.toCity = $scope.toCity.selected;
      // busOrder.travelDt = $scope.dt;
    };

    $scope.dateFormats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.dateFormat = $scope.dateFormats[1];

    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
      [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

  }]
)

.controller( 'BusOffersCtrl', ['$scope', 'busOrderService', 'busOffers',
  function BusOffersController($scope, busOrderService, busOffers) {

    $scope.busOffers = busOffers.data;
    // $http.get('http://localhost:8080/bus/offers?from='+ busOrder.fromCity.code +'&to='+ busOrder.toCity.code +'&date=2015-08-02').success(function(data) {
    //   $scope.busOffers = data;
    // });


    $scope.chooseOffer =  function(offer) {
      busOrderService.offer = offer;
      busOrderService.myOrder = busOrderService.initNewOrder(offer);
      busOrderService.myOrder.passengers.push(busOrderService.myOrder.customer);

      // initialize the new order
      // busOrder.myOrder.offerId = offer.id;
      // busOrder.myOrder.customer = {
      //   firstName : "",
      //   lastName : "",
      //   email : "",
      //   phoneNumber : ""
      // };
      // busOrder.myOrder.passengers.push(busOrder.myOrder.customer);
      // busOrder.myOrder.totalAmount = offer.fare;
      // busOrder.myOrder.unitPrice = offer.fare;
      // busOrder.myOrder.orderStatus = "OPENED";

      // for (var i=0; i<$scope.quantity; i++) {
      //   var passenger = {
      //     firstName : "",
      //     lastName : "",
      //     email : ""
      //   };
      //
      //   busOrder.passengers.push(passenger);
      // }

      console.log("chosen offer is " + busOrderService.myOrder.offerId);
    };

  }]
)

.controller('BusOrderCtrl', ['$scope', '$http', 'busOrderService',
  function BusOrderController ($scope, $http, busOrderService) {


    $scope.offer = busOrderService.offer;
    $scope.travelDt = busOrderService.travelDt;



    // inject the order into scope
    $scope.myOrder = busOrderService.myOrder;

    console.log($scope.myOrder);

    $scope.saveOrder = function() {
        busOrderService.saveOrder($scope.myOrder)
            .then(function() {
                //$state.go('bus');
                console.log("looks okay");
            });
    };

    // function to add new passenger
    $scope.addPassenger = function() {
      $scope.myOrder.passengers.push({
          firstName : "",
          lastName : "",
          email : "",
          phoneNumber : ""
        });
    };

    // function to remove a passenger
    $scope.removePassenger = function(passenger) {
      var index = $scope.myOrder.passengers.indexOf(passenger);
      $scope.myOrder.passengers.splice(index, 1);
    };

    // $scope.submitOrder = function() {
    //   $http.post('http://localhost:8080/bus/order', $scope.myOrder).
    //     then(function(response) {
    //       // this callback will be called asynchronously
    //       // when the response is available
    //       //console.log(response);
    //       $scope.myOrder = response.data;
    //       $scope.addAlert({ type: 'success', msg: 'Order has been submitted successfully' });
    //     }, function(response) {
    //       // called asynchronously if an error occurs
    //       // or server returns response with an error status.
    //       $scope.addAlert({ type: 'danger', msg: response });
    //     });
    // };

    $scope.alerts = [];

    $scope.addAlert = function(alert) {
      $scope.alerts.push(alert);
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

  }]

)

;
