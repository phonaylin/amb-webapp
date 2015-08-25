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
angular.module( 'bus.search', [])

/**
 * Search provider
 */
.controller( 'BusSearchCtrl', ['$scope', '$http',
  function BusSearchController($scope) {
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

;
