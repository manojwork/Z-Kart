import Ember from 'ember';
import URI from '../Classes/URIClass';

export default Ember.Component.extend({


    passwordComplexity: Ember.inject.service("passwordcomplexity"),

    // Default Values ..
    isCheckPassword: false,
    isCheckConfirmPassword: false,
    isPasswordsMatched: false,
    isPasswordNew : false, 

    actions:{
        
        // Triggering The Back Parent Action .
        back(){
            this.get('triggerBack')();
        },

        // Checking the New Password Complexity .
        checkPassword(event) {
            
            var password = event.target.value;
            this.set("password",password);
            var isValid = this.get("passwordComplexity").checkPasswordComplexity(password); // Ensure this refers correctly to the method
            this.set("isCheckPassword", isValid);
            this.set("passwordError", undefined);
            this.set("error", undefined);
            console.log(isValid, " password . ");

            if(password != ""){
                if (!isValid) {
                    this.set("passwordError", "Password  must Contain at least 2 lower case, 2 upper case and 2 numbers with a minimum length of 6.");
                }
                else{
                    this.set("passwordError", undefined);
                } 
            }
          

        },

        // Checking the Old Password Complexity .
        checkOldPassword(event){

            const applicationRoute = Ember.getOwner(this).lookup('route:application');
            const customerId = applicationRoute.get('currentModel.customer_id'); // Accessing customer_id or the model you need
            this.set("oldPassword",event.target.value)
            var uri = new URI("customer",customerId);
            this.set("error", undefined);
            this.set("oldPasswordError", undefined);

            if (this.settingTimeout) {
                clearTimeout(this.settingTimeout);
            }

            this.settingTimeout = setTimeout(() =>{
            if(this.get("oldPassword") !== ""){

                uri.get({
                    "password" : btoa(this.get("oldPassword"))
                }).then(data=>{
    
                    if (this.isDestroyed || this.isDestroying) {
                        return; // Exit if the component has been destroyed
                    }
    
                    if (data["message"] === false){
                        this.set("oldPasswordError","the old password is invalid");
                        this.set("isPasswordNew",false);
                        this.set("changeAllow",false);
    
                    }
                    else{
                        this.set("oldPasswordError",undefined);
                        this.set("changeAllow",true);
                        this.set("isPasswordNew",true);
                    }

                }).catch(error => {
                    this.get("triggerAfterError")(error);
                });

            }

           },1000);
           
        },
        
        // Checking the Confirm Password Complexity .
        checkConfirmPassword(event) {

            var password = event.target.value;
            this.set("passwordConfirm",password);
            var isValid = this.get("passwordComplexity").checkPasswordComplexity(password); // Ensure this refers correctly to the method
            this.set("isCheckPassword", isValid);
            var matched = this.get("password") === this.get("passwordConfirm");
            this.set("confirmPasswordError", undefined);
            this.set("error", undefined);

            if (password != ""){
                if (!isValid && matched) {
                    this.set("confirmPasswordError", "Password  must Contain at least 2 lower case, 2 upper case and 2 numbers with a minimum length of 6. ");
                } else if (isValid && !matched) {
                    this.set("confirmPasswordError", " Passwords Not Matched ");
                } else if (!isValid && !matched) {
                    this.set("confirmPasswordError", "Password  must Contain at least 2 lower case, 2 upper case and 2 numbers with a minimum length of 6. ");
                }
                else{
                    this.set("confirmPasswordError", undefined);
                }
            }
  

            this.set("isCheckConfirmPassword", isValid);
            this.set("isPasswordsMatched", matched);
        },

        // On Submitting the Forming .
        onSubmit() {

            if (this.isCheckConfirmPassword && this.isPasswordNew &&this.isCheckPassword && this.isPasswordsMatched) {
                this.set("isLoader",true);
                var body = {
                    "password" : btoa(this.get("passwordConfirm")),
                };

                var customerId = Ember.getOwner(this).lookup("route:application").modelFor("application").customer_id;

                let uri = new URI('customer',customerId);

                uri.put(body).then(data => {

                    this.set("isLoader",false);

                    if (data["message"] === true) {
                        this.get("triggerChangePassword")(data["message"]);
                    }
                    else{
                        this.set("error"," This Password is Already used !.");
                    }
                })
                .catch(error => {
                    this.set("isLoader",false);

                    this.get("triggerAfterError")(error);
                });
              

            }
        
        },

        togglePasswordVisibility:function() {
            this.toggleProperty('showPassword'); // Toggle the visibility of the confrim password
        },
        toggleOldPasswordVisibility:function() {
            this.toggleProperty('showOldPassword'); // Toggle the visibility of the old password
        },
        toggleNewPasswordVisibility:function() {
            this.toggleProperty('showNewPassword'); // Toggle the visibility of the new password
        },

    }
});
