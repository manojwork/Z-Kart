import Ember from 'ember';
import URI from '../Classes/URIClass';

var uri = new URI("customer");

export default Ember.Controller.extend({

    passwordComplexity: Ember.inject.service("passwordcomplexity"),

    isCheckPassword: false,
    isCheckConfirmPassword: false,
    isPasswordsMatched: false,
    submitForm:false,

    isAllowOtp : Ember.computed("isCheckConfirmPassword" , "isCheckPassword" , "isPasswordsMatched" ,"submitForm","toggleForm" ,function(){
        return this.get("isCheckConfirmPassword") && this.get("isCheckPassword") && this.get("isPasswordsMatched") && this.get("submitForm") && this.get("toggleForm");
    }),
 

    checkEmail(email){
                let body = {
                    "email": email,
                    "sendOtp":1
                };
                uri.get(body)
                    .then(data => {
                        if (data["message"] === true) {
                            this.set("submitForm", true);
                            this.set("emailError", undefined);
                        } else {
                            this.set("submitForm", false);
                            this.set("emailError", "User does not exist .");
                        }
                    })
                    .catch(error => {
                        let status = error.status; // Get status code
                        let message = encodeURIComponent(error.statusText); // Get status text
                        // Navigate to the error route with code and message
                        this.transitionToRoute('errorpage', status, message);    });
    },

    actions:{


        back(){
            this.set("toggleForm",false);
        },

        next(){

            this.set("toggleForm",true);


            if(!this.get("email") || (this.get("email") && this.get("email").trim() === "")){
                this.set("emailError"," Please Enter An Email .");
                this.set("toggleForm",false);
            }

            if(!this.get("password") || (this.get("password") && this.get("password").trim() === "")){
                this.set("passwordError"," Please Enter a Password .");
                this.set("toggleForm",false);
            }

            if(!this.get("passwordConfirm") || (this.get("passwordConfirm") && this.get("passwordConfirm").trim() === "")){
                this.set("confirmPasswordError"," Please Enter a Confirm Password .");
                this.set("toggleForm",false);
            }

        },

        validateOtp(event){
            this.set("error",undefined);
            let value = event.target.value;

            if (value.length > 3 || (!/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) ) {
                event.preventDefault();
            }
            else{
                this.set("otp",value);
            }
         },

        storeOtp(event){
            this.set("error",undefined);
        let value = event.target.value;
        this.set("otp",value);
        },

        clearEmailError(){
            this.set("error",undefined);
            this.set("emailError",undefined);
        },
        checkEmailPattern(event){
            this.set("emailEmail",undefined);
            this.set("error",undefined);
 

            var value = event.target.value;
                const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                var temp = emailPattern.test(value);
                if(temp){
                    this.set("emailPattern",true);

                        this.checkEmail(value);
                }
                else{
                    this.set("emailError","Email invalid");
                    this.set("emailPattern",false);
                }
                
                this.set("email",value);

        },

    
        checkPassword(event) {
            this.set("error",undefined);
            var password = event.target.value;
            this.set("passwordError",undefined);
            var isValid = this.get("passwordComplexity").checkPasswordComplexity(password); // Ensure this refers correctly to the method
            this.set("isCheckPassword", isValid);
            if (!isValid) {
                this.set("passwordError", "Password  must Contain at least 2 lower case, 2 upper case and 2 numbers with a minimum length of 6.");
            }
            this.set("password",password);
            this.set("passwordConfirm","");
            this.set("isCheckConfirmPassword", false);
        },
         
        checkConfirmPassword(event) {

            this.set("error",undefined);
            var password = event.target.value;
            var isValid = this.get("passwordComplexity").checkPasswordComplexity(password); // Ensure this refers correctly to the method

            this.set("isCheckPassword", isValid);

            var matched = this.get("password") === password;

            if (!isValid && matched) {
                this.set("confirmPasswordError", "Password  must Contain at least 2 lower case, 2 upper case and 2 numbers with a minimum length of 6. ");
            } else if (isValid && !matched) {
                this.set("confirmPasswordError", "Passwords do not match.");
            } else if (!isValid && !matched) {
                this.set("confirmPasswordError", "Password  must Contain at least 2 lower case, 2 upper case and 2 numbers with a minimum length of 6 and passwords doesn;t matched .");
            }
            else{
                this.set("confirmPasswordError", undefined);
            }

            this.set("passwordConfirm",password);
            this.set("isCheckConfirmPassword", isValid);
            this.set("isPasswordsMatched", matched);
        },

         onSubmit() {

            if (this.isCheckConfirmPassword && this.isCheckPassword && this.isPasswordsMatched) {
                this.set("isLoader",true);
                var body = {
                    "email" : this.get('email'),
                    "password" : btoa(this.get('password')),
                    "otp":this.get("otp")
                };

                uri.put(body).then(data => {

                    if (data["message"] == true) {
                        setTimeout(() => {
                            this.set("isLoader",false);
                            this.transitionToRoute("signin");    
                        }, 1000); 
                    }
                    else{
                        setTimeout(() => {
                            this.set("isLoader",false);

                            if(data["error"] === "password"){
                                this.set("toggleForm",false);
                                this.set("passwordError"," This Password is Already used ! ");
                                this.set("confirmPasswordError"," This Password is Already used ! ");
                            }else{
                                this.set("error"," OTP is Invalid !");
                            }

                        }, 1000); 
                    }
                })
                .catch(error => {

                    let status = error.status; // Get status code
                    let message = encodeURIComponent(error.statusText); // Get status text
              
                    // Navigate to the error route with code and message
                    this.transitionToRoute('errorpage', status, message);    });
              

            } else {
                this.set("error", "Invalid details!");
            }
        },
        togglePasswordVisibility:function() {
            this.toggleProperty('showPassword'); // Toggle the visibility of the old password
        },
        toggleNewPasswordVisibility:function() {
            this.toggleProperty('showNewPassword'); // Toggle the visibility of the new password
        },
    }

});
