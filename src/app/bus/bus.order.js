
angular.module( 'bus.order', [])


.directive('busOrder', function() {
  return {
    templateUrl: 'bus/bus.order.tpl.html'
  };
})

.config(function config( $stateProvider ) {
  $stateProvider
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
 * Order controller
 */
.controller('BusOrderCtrl', ['$scope', '$http', 'busOrderService',
   function BusOrderController ($scope, $http, busOrderService) {

     $scope.fromCity = busOrderService.fromCity;
     $scope.toCity = busOrderService.toCity;
     $scope.offer = busOrderService.offer;
     $scope.travelDt = busOrderService.travelDt;

     // inject the order into scope
     $scope.myBooking = busOrderService.myBooking;

     $scope.getTotal = function(){
         var total = 0;
         $scope.myBooking.orders.forEach(function(order) {
           total += (order.offer.fare * order.offer.quantity);
         });

         return total;
     }

     $scope.saveOrder = function() {
         busOrderService.saveOrder($scope.myBooking)
             .then(function(bookingRefId) {
                 //$state.go('bus');
                 console.log(bookingRefId);
             });
     };

    //  function to add new passenger
    //  $scope.addPassenger = function() {
    //    $scope.myOrder.passengers.push({
    //        firstName : "",
    //        lastName : "",
    //        email : "",
    //        phoneNumber : ""
    //      });
    //  };
     //
    //  // function to remove a passenger
    //  $scope.removePassenger = function(passenger) {
    //    var index = $scope.myOrder.passengers.indexOf(passenger);
    //    $scope.myOrder.passengers.splice(index, 1);
    //  };

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
