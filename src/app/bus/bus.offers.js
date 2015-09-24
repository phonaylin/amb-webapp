
angular.module( 'bus.offers', [])

.directive('busOffers', function() {
  return {
    templateUrl: 'bus/bus.offers.tpl.html'
  };
})

.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'bus.offers', {
      url: '/offers?fromCityId&toCityId',
      resolve: {
          busOffers: ['$stateParams', 'busOrderService',
              function($stateParams, busOrderService) {
                return busOrderService.searchOffers($stateParams.fromCityId, $stateParams.toCityId);
          }]
      },
      views: {
        "offers": {
          controller: 'BusOffersCtrl',
          templateUrl: 'bus/bus.offers.tpl.html'
        }
      },
      data:{ pageTitle: 'Bus Offers' }
    });
  })

/**
 * Offer controller
 */
.controller( 'BusOffersCtrl', ['$scope', 'busOrderService', 'busOffers',
   function BusOffersController($scope, busOrderService, busOffers) {
     $scope.offerFromCity = busOrderService.fromCity;
     $scope.offerToCity = busOrderService.toCity;

     $scope.busOffers = busOffers.data.map(function(obj) {
        var quantity = 0;
        return angular.extend(obj, quantity);
     });

    //  $scope.busOffers = busOffers.data;
     // $http.get('http://localhost:8080/bus/offers?from='+ busOrder.fromCity.code +'&to='+ busOrder.toCity.code +'&date=2015-08-02').success(function(data) {
     //   $scope.busOffers = data;
     // });

     // create order for selected offers
     $scope.createOrder =  function() {
      var selectedOffers = [];

      $scope.busOffers.forEach(function(offer) {
        if (offer.quantity > 0) {
            selectedOffers.push(offer);
          }
      });
      busOrderService.myBooking = busOrderService.createNewBooking(selectedOffers);

     };

   }]
 )

;
