import Ember from 'ember';

export default Ember.Route.extend({

    model(){

        if (this.modelFor('application')){
          this.transitionTo("index");
        }
   
      },

      setupController(controller, model) {

        this._super(controller, model);
        controller.set("isLoader",false);
        controller.set("email","");
        controller.set("otp","");
        controller.set("password","");
        controller.set("passwordConfirm","");
        controller.set("toggleForm",false);
        controller.set("emailError",undefined);
        controller.set("passwordError",undefined);
        controller.set("confirmPasswordError",undefined);
        controller.set("error",undefined);
        
      }
      
});
