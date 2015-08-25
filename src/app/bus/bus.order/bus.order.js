// /**
//  * Each section of the site has its own module. It probably also has
//  * submodules, though this boilerplate is too simple to demonstrate it. Within
//  * `src/app/home`, however, could exist several additional folders representing
//  * additional modules that would then be listed as dependencies of this one.
//  * For example, a `note` section could have the submodules `note.create`,
//  * `note.delete`, `note.edit`, etc.
//  *
//  * Regardless, so long as dependencies are managed correctly, the build process
//  * will automatically take take of the rest.
//  *
//  * The dependencies block here is also where component dependencies should be
//  * specified, as shown below.
//  */
// angular.module( 'ambWebApp.busOrder', [
//   'ui.router',
//   'plusOne',
//   'ui.bootstrap',
//   'ambWebApp.bus'
// ])
//
// /**
//  * Each section or module of the site can also have its own routes. AngularJS
//  * will handle ensuring they are all available at run-time, but splitting it
//  * this way makes each module more "self-contained".
//  */
// .config(function config( $stateProvider ) {
//   $stateProvider.state( 'bus.order', {
//     url: '/order',
//     views: {
//       "order": {
//         controller: 'BusOrderCtrl',
//         templateUrl: 'bus.order/bus.order.tpl.html'
//       }
//     },
//     data:{ pageTitle: 'Bus Order' }
//   });
// })
//
// .controller('BusOrderCtrl', ['$scope', '$http', 'busOrder',
//   function BusOrderController ($scope, $http, busOrder) {
//     $scope.offer = busOrder.offer;
//     $scope.travelDt = busOrder.travelDt;
//
//     // inject the order into scope
//     $scope.myOrder = busOrder.myOrder;
//
//     // function to add new passenger
//     $scope.addPassenger = function() {
//       $scope.myOrder.passengers.push({
//           firstName : "",
//           lastName : "",
//           email : "",
//           phoneNumber : ""
//         });
//     };
//
//     // function to remove a passenger
//     $scope.removePassenger = function(passenger) {
//       var index = $scope.myOrder.passengers.indexOf(passenger);
//       $scope.myOrder.passengers.splice(index, 1);
//     };
//
//     $scope.submitOrder = function() {
//       $http.post('http://localhost:8080/bus/order', $scope.myOrder).
//         then(function(response) {
//           // this callback will be called asynchronously
//           // when the response is available
//           //console.log(response);
//           $scope.myOrder = response.data;
//           $scope.addAlert({ type: 'success', msg: 'Order has been submitted successfully' });
//         }, function(response) {
//           // called asynchronously if an error occurs
//           // or server returns response with an error status.
//           $scope.addAlert({ type: 'danger', msg: response });
//         });
//     };
//
//     $scope.alerts = [];
//
//     $scope.addAlert = function(alert) {
//       $scope.alerts.push(alert);
//     };
//
//     $scope.closeAlert = function(index) {
//       $scope.alerts.splice(index, 1);
//     };
//
//   }]
//
// )
//
// ;
