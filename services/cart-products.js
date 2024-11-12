import Ember from 'ember';
import URI from '../Classes/URIClass';

export default Ember.Service.extend({

    calledInNav : false,

    cartProductsList: "",

    cartProducts() {
        return new URI("cart", Ember.getOwner(this).lookup("route:application").modelFor("application").customer_id)
            .get()
            .then(data => {            
                // Map the product IDs to a new array
                this.set("cartProductIds", Ember.A(data.cartProducts.map(product => product.product.product_id)));
                // Update cart count
                this.set("cartCount", this.get("cartProductIds").length);

                this.set("cartProductsList",data);
                return data;
            
            })
            .catch(error => {
                console.error("Error fetching cart products:", error);
                return error;
            });
    },

    addCartProducts(id) { 
        if (!this.get("cartProductIds").includes(id)) {
            this.get("cartProductIds").pushObject(id);
            this.set("cartCount", this.get("cartProductIds").length);
        }
    },

    removeCartProduct(id) {
        this.get("cartProductIds").removeObject(id);
        this.set("cartCount", this.get("cartProductIds").length);
    },
});
