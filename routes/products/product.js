import Ember from 'ember';
import URI from '../../Classes/URIClass';

export default Ember.Route.extend({


    model(params){

        var uri = new URI("product",params.product_id);
        return uri.get().then((data) => {
            return data;
        }).catch(error => {
            let status = error.status; // Get status code
            let message = encodeURIComponent(error.statusText); // Get status text
            // Navigate to the error route with code and message
            this.transitionTo('errorpage', status, message);   
        });
    },

    setupController(controller, model) {

        this._super(controller, model);
        var customerData = this.modelFor("application");
        window.scrollTo(0, 0); // Scrolls to the top of the page
        this.set("isLoader",false);
        controller.set("inStock", false);

        if( customerData !== undefined){

            controller.set("name",customerData.name);
            controller.set("mobile",customerData.mobile);
            controller.set("address",customerData.address);
            controller.set("customerId",customerData.customer_id);
            controller.set("isCustomer",true);
            controller.set("inStock", model.product.stock > 0);

        }
        else{
            controller.set("isCustomer",false);
        }
        controller.set("isMaxStock",false);
        
        model.maxStock.forEach(product=>{
            if(product.product_id === model.product.product_id){
                controller.set("isMaxStock",true);
                controller.set("discountedPrice",Math.round(model.product.price*0.9));
            }
        }) 

        controller.set("last",10);
        controller.set('magnifiedStyle', 'display: none;');
        controller.relatedProducts();
        controller.set("relateProducts",model.relatedProducts.filter(product=> product.product_id != model.product.product_id));
      
    }
});
