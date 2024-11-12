import Ember from 'ember';
import URI from '../Classes/URIClass';

var uri = new URI("customer");


export default Ember.Controller.extend({

    passwordComplexity: Ember.inject.service("passwordcomplexity"),
    isCheckPassword: false,
    isCheckConfirmPassword: false,
    isPasswordsMatched: false,
    isMobile:false,
    submitForm:false,
    done:false,
 
    isAllowOtp : Ember.computed("isCheckConfirmPassword" , "isCheckPassword" , "isPasswordsMatched" , "isMobile","submitForm","toggleForm" ,function(){
        return this.get("isCheckConfirmPassword") && this.get("isCheckPassword") && this.get("isPasswordsMatched") && this.get("isMobile") && this.get("submitForm") && this.get("toggleForm");
    }), 


    checkEmail(email){ 

        let body = {
            "email": email,
            "sendOtp":0
        };

     var uri = new URI("customer");
        uri.get(body)
            .then(data => {
                if (data["message"] === true) {
                    this.set("submitForm", false);
                    this.set("emailError", "User already exists. Please sign in !");
                } else {
                    this.set("submitForm", true);
                }
            })
            .catch(error => {
                console.log(error)
                let status = error.status; // Get status code
                let message = encodeURIComponent(error.statusText); // Get status text
                // Navigate to the error route with code and message
                this.transitionToRoute('errorpage', status, message);              });
    },

    actions: {

        // This action prevents number input
        preventNumbers(event) {

            const key = event.key;
            // Check if the key pressed is a number (0-9)
            if (/\d/.test(key)) {
            event.preventDefault(); // Prevent entering numbers
            }
        },

        clearEmailError(){
            this.set("emailError",undefined);
            this.set("error",undefined);
        },

        clearNameError(event){
            this.set("nameError",undefined);
            this.set("error",undefined);
            this.set("name",event.target.value);
        }, 

        checkName(){
            if (this.get("name").trim() === ""){
                this.set("nameError","invalid Name !");
            }
        },

        clearMobileError(event){

            this.set("mobileError",undefined);
            this.set("error",undefined);

        }, 
        
        clearAddressError(){
            this.set("addressError",undefined);
            this.set("error",undefined);

        },
        
        checkAddress(){
            if (this.get("address").trim() === ""){
                this.set("addressError","invalid Details !");
            }
        },

        next(){

            this.set("toggleForm",true);
            if(!this.get("name") || (this.get("name") && this.get("name").trim() === "")){
                this.set("nameError"," Please Enter The Name .");
                this.set("toggleForm",false);
            }

            if(!this.get("address") || (this.get("address") && this.get("address").trim() === "")){
                this.set("addressError"," Please Enter An Address .");
                this.set("toggleForm",false);
            }

            if(!this.get("email") || (this.get("email") && this.get("email").trim() === "")){
                this.set("emailError"," Please Enter An Email .");
                this.set("toggleForm",false);
            }

            if(!this.get("mobile") || (this.get("mobile") && this.get("mobile").trim() === "")){
                this.set("mobileError"," Please Enter an indian Mobile number .");
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

        back(){
            this.set("toggleForm",false);
        },

        // check the email pattern .
        checkEmailPattern(){
            
            this.set("submitForm", false);
            var value = this.get("email");
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            var temp = emailPattern.test(value);

                if(temp){
                    this.set("emailPattern",true);
                    this.checkEmail(value);
                }
                else{
                    this.set("emailError","Invalid Email ! ");
                }
                this.set("email",value);

        },

        // validate mobile .
        validateMobile(event){

                let value = event.target.value;
    
                if (value.length > 9 || (!/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) ) {
                    event.preventDefault();
                }
        },

        // store the mobile number .
        storeMobile(event){
            this.set("mobile",event.target.value);
            this.set("isMobile",false);


            if(event.target.value.length === 10 && event.target.value.trim() != ""){
                this.set("isMobile",true);
                this.set("error","")
            }else{
                this.set("isMobile",false);
                this.set("mobileError"," Invalid Mobile Number ! ")
            }

        },

        //  validate the OTP .
        validateOtp(event){
 
            let value = event.target.value;

            if (value.length > 3 || (!/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) ) {
                event.preventDefault();
            }
            else{
                this.set("otp",value);
            }
    },

        // store the otp .
        storeOtp(event){

        let value = event.target.value;
  
            this.set("otp",value);

        },

        // check the new passsword 
        checkPassword(event) {
            var password = event.target.value;
            var isValid = this.get("passwordComplexity").checkPasswordComplexity(password); // Ensure this refers correctly to the method

            this.set("isCheckPassword", isValid);

            if (!isValid) {
                this.set("passwordError", "Password  must Contain at least 2 lower case, 2 upper case and 2 numbers with a minimum length of 6.");
            }
            else{
                this.set("passwordError", undefined);

            }
            this.set("password",password);
            this.set("passwordConfirm","");
            this.set("isCheckConfirmPassword", false);
        },
        
        // check the confirm password .
        checkConfirmPassword(event) {
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

        // submit the sign up form .
        onSubmit() {
            if (this.isCheckConfirmPassword && this.isCheckPassword && this.isPasswordsMatched  && this.isMobile && this.submitForm) {

                this.set("isLoader",true);

                var body = {
                    "email": this.get("email"),
                    "name": this.get("name"),
                    "mobile": this.get("mobile"),
                    "address": this.get("address"),
                    "password":btoa(this.get("password")),
                    "otp":this.get("otp")
                };

                uri.post(body).then(data => {
                    if (data["message"] != "null") {
                        setTimeout(() => {
                            this.set("isLoader",false);
                            this.transitionToRoute("signin");
                        }, 1000); 
                    }
                    else{
                        setTimeout(() => {
                            this.set("isLoader",false);
                        this.set("error","invalid OTP !");
                    }, 1000); 

                    }
                })
                .catch(error => {
                    console.log(error)
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
