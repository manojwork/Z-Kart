import Ember from 'ember';

export default Ember.Route.extend({
 

    // allow admins .
    beforeModel(){
        if(this.modelFor("application")){

            if(this.modelFor("application").user_type <= 0){
                this.transitionTo("index");
              }

        }  
        else{
            this.transitionTo("index");
        }

    },

    setupController(controller, model) {
        this._super(controller, model);

        controller.toggleProperties("isProducts");
        controller.startingLoad();
        controller.customersCall();
        controller.ordersCall();

        const today = new Date();
        const formattedDate = today.toISOString().split("T")[0]; // formats to YYYY-MM-DD
        controller.set('today', formattedDate); // Set today’s date as the max date

    }

    
});
