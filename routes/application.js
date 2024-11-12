import Ember from 'ember';
import URI  from '../Classes/URIClass';

var uri = new URI("sessionData");

export default Ember.Route.extend({
  
  model() {
    
    return  uri.get()
    .then(data => {
        if (data != null) {
          console.log(data);
        return data;  // Return the data if it's available
      } else {
        // Returning null or nothing to ensure no action is taken here
      }
    })
    .catch(error => {
      let status = error.status; // Get status code
      let message = encodeURIComponent(error.statusText); // Get status text

      // Navigate to the error route with code and message
      this.transitionTo('errorpage', status, message);    });

  },

});


