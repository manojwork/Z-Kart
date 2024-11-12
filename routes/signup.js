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
        controller.set("email","");
        controller.set("name","");
        controller.set("mobile","");
        controller.set("password","");
        controller.set("passwordConfim","");
        controller.set("otp","");
        controller.set("address","");
        controller.set("error",undefined);
        controller.set("emailError",undefined);
        controller.set("nameError",undefined);
        controller.set("addressError",undefined);
        controller.set("mobileError",undefined);
        controller.set("passwordError",undefined);
        controller.set("confirmPasswordError",undefined);
        controller.set("toggleForm",false);
      }

});
