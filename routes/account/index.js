import Ember from 'ember';
import URI from '../../Classes/URIClass';

export default Ember.Route.extend({

    // orders details of the customer .
    model() {
        var uri = new URI("order", this.modelFor('application').customer_id);
        return uri.get().then(data => {
            return data;
        }).catch(error => {
            let status = error.status; // Get status code
            let message = encodeURIComponent(error.statusText); // Get status text
            // Navigate to the error route with code and message
            this.transitionTo('errorpage', status, message);    });
      
    }
});
