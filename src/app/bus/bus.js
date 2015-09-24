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
  // 'ui.router',
  // 'plusOne',
  // 'ui.bootstrap',
  'ngSanitize',
  'ui.select',
  'bus.search',
  'bus.offers',
  'bus.order',
  'bus.header'
])

.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'bus', {
      url: '/bus',
      views: {
        "main": {
          controller: 'BusCtrl',
          templateUrl: 'bus/bus.tpl.html'
        }
      },
      data:{ pageTitle: 'Bus' }
    });
  })


/* Bus Ordering service
*/
.factory('busOrderService', ['$http', function busOrderServiceFactory($http) {
  var busOrder = {};

  busOrder.fromCity = null;
  busOrder.toCity = null;
  busOrder.travelDt = '12/01/2015';
  busOrder.myOrder = {};
  //testing
  busOrder.myBooking = [];
  // one order has only one customer. one order has many order items with different offer id.
  // one order item can have many tickets. one ticket belongs to only one passenger.

  busOrder.createNewBooking = function(offers) {
    var booking = {
      buyer: createNewCustomer(),
      orderStatus: null,
      orders: []
    };

    offers.forEach(function(offer) {
      // create new order
      booking.orders.push(initNewOrder(offer, booking.customer));
    });

    return booking;
  };

  function initNewOrder(offer, customer) {
    var order = {
      offer: offer,
      customer: customer,
      tickets: []
    };
    // create new tickets
    for(var i=0;i<offer.quantity;i++) {
      order.tickets.push(createNewTicket(offer));
    }

    return order;
  };

  function createNewTicket(offer) {
    var ticket = {
      offer: offer,
      unitPrice: offer.fare,
      plannedTravelDate: new Date(),
      passenger: createNewCustomer()
    };
    return ticket;
  }

  function createNewCustomer() {
    var customer = {
        id: -1,
        createdDate: null,
        modifiedDate: null,
        firstName: "",
        lastName: "",
        emailAddress: "",
        contactNumber: ""
      };
    return customer;
  }

  // order details
  busOrder.oldInitNewOrder = function(offer) {
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

  busOrder.saveOrder = function(booking) {
    console.log(booking);
    return $http.post(busServiceURL + '/order', booking);
  };

  return busOrder;

}])



/**
 * Bus Controller
 */
.controller( 'BusCtrl',
  function BusController($scope) {
    // write logic here
  }
)



;
