import Ember from 'ember';
export default Ember.Route.extend({


    afterModel(){

      if(!this.modelFor("application")){
        this.transitionTo("index");
      } 
    },
 
     setupController(controller, model) {

        this._super(controller, model);

        controller.set("isLoader",false);
        controller.set('selectedOption',"remove"); // default selected option in coupon codes .
        controller.set('user',"user"); // value for User Coupon Code Option tag .
        controller.set('maxprice','maxprice') // value for 20000PRICE coupon code option tag
        controller.set("cartProducts",undefined);
        controller.cartItems(); // loading the cartproducts .
        
      }

});
