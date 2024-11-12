import Ember from 'ember';

export default Ember.Component.extend({

    // Empty ...

    actions:{
        displayOrderProducts(cartId,orderId){
            this.get("triggerDisplayOrderProducts")(cartId,orderId);
        }
    }

});
