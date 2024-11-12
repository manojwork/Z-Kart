import Ember from 'ember';
import URI from '../../Classes/URIClass';

export default Ember.Route.extend({

    // checking whether the user is there or not .
    beforeModel(){

        if(this.modelFor('application') === undefined){
            this.transitionTo("account");
        }

    },

    // order products .
    model(params){
        
        var id = params.order_id;
        var uri = new URI("order",this.modelFor('application').customer_id,id,"products");

        return uri.get().then( data =>{ 
            
            if ( data !== null){
                return data;
            }
            else{
                this.transitionTo("account");
            }

        }).catch(error => {
            let status = error.status; // Get status code
            let message = encodeURIComponent(error.statusText); // Get status text
            // Navigate to the error route with code and message
            this.transitionTo('errorpage', status, message);
        });
    }
    
});
