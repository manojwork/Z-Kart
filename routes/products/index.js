import Ember from 'ember';
import URI from '../../Classes/URIClass';
var uri = new URI("product");
export default Ember.Route.extend({

    model(){
        // max stock products .
        return uri.get({ filterProducts: 'maxStock' }) // Fetching data
        .then(data => data) // Return data if successful
        .catch(error => {
          let status = error.status || 500; // Default to 500 if status is undefined
          let message = encodeURIComponent(error.statusText || 'Unknown Error');
          // Navigate to the error route with code and message
          this.transitionTo('errorpage', status, message);
        });
 
      },

      setupController(controller, model) {

        this._super(controller, model);

        controller.callProducts();
        controller.set("last", 10);
        controller.set("isGlobal",true);
        controller.set("isRecentlyAdded",true);
        controller.set("productsData",[]);
        controller.set("products",[]);
    
    }


      });
