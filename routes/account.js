import Ember from 'ember';

export default Ember.Route.extend({

    model(){ 

        if(this.modelFor("application") !== undefined){
            return  this.modelFor("application");
        }
        else{
            this.transitionTo("index");
        }

    },

   setupController(controller, model) {
    this._super(controller, model);
    controller.set("isLoader",false);
    }



});
