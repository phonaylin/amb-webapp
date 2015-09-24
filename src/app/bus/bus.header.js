
angular.module( 'bus.header', [])

.directive('busHeader', function() {
  return {
    controller: 'BusHeaderCtrl',
    templateUrl: 'bus/bus.header.tpl.html'
  };
})

.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'bus.header', {
      url: '/search',
      views: {
        "search": {
          controller: 'BusSearchCtrl',
          templateUrl: 'bus/bus.search.tpl.html'
        }
      },
      data:{ pageTitle: 'Bus' }
    });
  })

/**
 * Search provider
 */
.controller( 'BusHeaderCtrl', ['$scope', '$filter', 'busOrderService',
  function BusHeaderController($scope, $filter, busOrderService) {
    $scope.selectedFromCity = busOrderService.fromCity;
    $scope.selectedToCity = busOrderService.toCity;

    $scope.showSearchBar = false;


  }]
)

;
