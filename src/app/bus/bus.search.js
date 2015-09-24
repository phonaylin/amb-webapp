
angular.module( 'bus.search', [])

.directive('busSearch', function() {
  return {
    controller: 'BusSearchCtrl',
    templateUrl: 'bus/bus.search.tpl.html'
  };
})

.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'bus.search', {
      url: '/search',
      views: {
        "search": {
          controller: 'BusSearchCtrl',
          templateUrl: 'bus/bus.search.tpl.html'
        }
      },
      data:{ pageTitle: 'Bus Search' }
    });
  })

/**
 * Search provider
 */
.controller( 'BusSearchCtrl', ['$scope', '$filter', 'busOrderService',
  function BusSearchController($scope, $filter, busOrderService) {
    $scope.fromCity = {};
    $scope.toCity = {};

    console.log(busOrderService.fromCity);
    if (busOrderService.fromCity) {
      $scope.fromCity.selected = busOrderService.fromCity;
    }
    if (busOrderService.toCity) {
      $scope.toCity.selected = busOrderService.toCity;
    }

    // inject the static data of cities into scope
    // $scope.cities = $window.cities;
    // $scope.cities = [
    // {name: 'Yangon', code: '1'},
    // {name: 'Mandalay', code: '2'},
    // {name: 'Inle', code: '3'},
    // {name: 'Bagan', code: '4'},
    // {name: 'Pyin Oo Lwin', code: '5'},
    // {name: 'Naypyitaw', code: '6'},
    // {name: 'Taunggyi', code: '7'},
    // {name: 'New City', code: '8'}
    // ];
    //
    // $scope.destCities = [];
    // $scope.filterDestCities = function() {
    //     if ($scope.fromCity.selected) {
    //       $scope.toCity.selected = 'undefined';
    //       $scope.destCities = $filter('filter')($scope.cities, {code: '!' + $scope.fromCity.selected.code});
    //     }
    // };

    $scope.routes = [
    {
      name: 'Yangon', code: '1',
      destinations:[
        {name: 'Mandalay', code: '2'},
        {name: 'Taunggyi(Inle)', code: '3'},
        {name: 'Bagan', code: '4'},
        {name: 'Naypyitaw', code: '6'}]
    },
    {
      name: 'Mandalay', code: '2',
      destinations:[
        {name: 'Yangon', code: '1'},
        {name: 'Taunggyi(Inle)', code: '3'},
        {name: 'Bagan', code: '4'},
        {name: 'Naypyitaw', code: '6'}]
    },
    {
      name: 'Bagan', code: '4',
      destinations:[
        {name: 'Yangon', code: '1'},
        {name: 'Mandalay', code: '2'},
        {name: 'Taunggyi(Inle)', code: '3'},
        {name: 'Kalaw', code: '999'}]
    },
    {
      name: 'Naypyitaw', code: '6',
      destinations:[
        {name: 'Yangon', code: '1'},
        {name: 'Mandalay', code: '2'}]
    },
    {
      name: 'Taunggyi(Inle)', code: '3',
      destinations:[
        {name: 'Yangon', code: '1'},
        {name: 'Mandalay', code: '2'},
        {name: 'Bagan', code: '4'}]
    }];

    $scope.onFromCitySelect =  function(item, model) {
      if ($scope.toCity.selected) {
        var found = $filter('filter')($scope.fromCity.selected.destinations, $scope.toCity.selected, true);
        if (found.length == 0) {
          $scope.toCity.selected = 'undefined';
        }
      }
    };


    // store search data into factory service
    $scope.searchOffers = function() {
      busOrderService.fromCity = $scope.fromCity.selected;
      busOrderService.toCity = $scope.toCity.selected;
      // console.log(busOrderService.fromCity);
    };

  }]
)

;
