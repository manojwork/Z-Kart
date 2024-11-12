import Ember from 'ember';

export default Ember.Component.extend({

  cartProducts:Ember.inject.service("cart-products"),

  didInsertElement(){

      // Get the application route and the current model's user_type
      const user = Ember.getOwner(this).lookup('route:application').modelFor("application");
      // to display the cart and account icons in navigation bar only if user exist .
      if(user === undefined){
        this.set("isCustomer",false);
        this.set("userType",0);
      }
      else{
        this.set("isCustomer",true);
        this.set("userType",user.user_type);
        console.log(this.get("cartProducts").calledInNav ," the called .")
        if(this.get("cartProducts").calledInNav  === false){
          this.get("cartProducts").cartProducts();
          this.set("cartProducts.calledInNav", true);
          console.log(this.get("cartProducts").calledInNav ," the called after .")

        }
      }
  },

  // Computed property based on productCount for displaying cart count
  cartCount: Ember.computed('cartProducts.cartCount', function() {

    let count = this.get('cartProducts.cartCount') || 0;
    if (count > 9) {
      return "9+";
    } else if (count > 0) {
      return count;
    } else {
      return null;
    }

  }),


  // checking whether the user is admin or not .

  isAdmin: Ember.computed('userType', function() {
    return this.get('userType') > 0;
  })
  
});
