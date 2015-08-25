angular.module( 'ambWebApp', [
  'templates-app',
  'templates-common',
  'ambWebApp.home',
  'ambWebApp.about',
  // 'ambWebApp.bus',
  'ui.router'
  // 'ui.bootstrap',
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ambWebApp' ;
    }
  });
})

;
