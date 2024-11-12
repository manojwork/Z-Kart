import Ember from 'ember';

export default Ember.Route.extend({

    model(){
      // application model is not null then redirect to index .
      if (this.modelFor('application')){
        this.transitionTo("index");
      }
    },

    setupController(controller, model) {
      
      this._super(controller, model);
      controller.set("isLoader",false);
      controller.set("emailError",undefined);
      controller.set("passwordError",undefined);
      controller.set("password","");
      controller.set("done",false);
      controller.set("email","");
      controller.set("emailTrue",false);

    }
   
});
