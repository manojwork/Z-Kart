import Ember from 'ember';
import URI from '../Classes/URIClass';

export default Ember.Component.extend({
    passwordComplexity: Ember.inject.service("passwordcomplexity"),
    isCheckPassword: false,
    isCheckConfirmPassword: false,
    isPasswordsMatched: false,
    isMobile: false,
    submitForm: false,

    addError(message) {
        if (!this.errors.includes(message)) {
            this.errors.pushObject(message);
        }
    }, 
 
    didInsertElement(){

        this.set("errors",Ember.A([]));

    },

    removeError(message) {
        this.errors.removeObject(message);
    },

    checkEmail(email) {

        let body = { "email": email, "sendOtp": 0 };
        let uri = new URI("customer");

        if(!this.get("customersData").map(item => item.email).includes(email)  &&  !this.get("adminsData").map(item => item.email).includes(email)){
            uri.get(body)
            .then(data => {
                if (data["message"] === true) {
                    this.set("submitForm", false);
                    this.set("emailError"," User already exists !");
                } else {
                    this.set("submitForm", true);
                    this.set("emailVaild",true)
                    this.set("emailError",undefined);
                }
            })
            .catch(error => {
                this.get("trigerAfterError")(error);
            });
            }else{
                this.set("emailError"," User already exists !");
            }
        },
      


    isAllowOtp: Ember.computed("isCheckConfirmPassword", "isCheckPassword", "isPasswordsMatched", "isMobile", "submitForm", "toggleForm" ,function () {
        return this.isCheckConfirmPassword && this.isCheckPassword && this.isPasswordsMatched && this.isMobile && this.submitForm && this.toggleForm ;
    }),

    actions: { 

        clearEmailError(){
            this.set("emailError",undefined);
        },
        clearNameError(){
            this.set("nameError",undefined);
        }, clearMobileError(){
            this.set("mobileError",undefined);
        }, clearAddressError(){
            this.set("addressError",undefined);
        },
        checkName(){
            if(this.get("name") && this.get("name").trim() !== ""){
                this.set("nameError",undefined);
            }
            else{
                this.set("nameError"," Please Enter The Name . ");
            }
        },

        checkAddress(){
            if(this.get("address") && this.get("address").trim() !== ""){
                this.set("addressError",undefined);
            } else{
                this.set("addressError"," Please Enter an Address . ");
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

        backToEmail(){
            this.set("toggleForm",false);
        },

        back() {
            console.log("triggered Back ");
            this.get("triggerBack")();
        },

        checkEmailPattern() {
            let value = this.get("email")
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            this.set("submitForm", false);
            this.set("error",undefined)
            this.set("emailError",undefined);
            this.set("emailVaild",false);

                    if (emailPattern.test(value)) {
                        this.checkEmail(value);
                    } else {
                        this.set("emailError","Email invalid");
                    }
        },

        validateMobile(event) {
            let value = event.target.value;
            if (value.length > 9 || (!/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key))) {
                event.preventDefault();
            }
        },

        storeMobile(event) {

            this.set("error",undefined);
            this.set("mobile", event.target.value);
            this.set("mobileError",undefined);
            this.set("isMobile", false);

                    if (event.target.value.length === 10) {
                        this.set("isMobile", true);
                    } else {
                        this.set("mobileError","The Mobile Number Must be 10 digits Indian Number.");
                        this.set("isMobile", false);
                    }
     
        },

        checkPassword(event) {
            this.set("error",undefined);
            let password = event.target.value;
            let isValid = this.get("passwordComplexity").checkPasswordComplexity(password);
            this.set("isCheckPassword", isValid);
            this.set("passwordError",undefined);
            
                if (!isValid) {
                    this.set("passwordError","Password must contain at least 2 lower case, 2 upper case, and 2 numbers with a minimum length of 6.");
                } else {
                    this.set("passwordError",undefined);
            }
       
            this.set("password", password);
            this.set("passwordConfirm", "");
            this.set("isCheckConfirmPassword", false);
        },

        checkConfirmPassword(event) {

            this.set("error",undefined);
            let confirmPassword = event.target.value;
            let isValid = this.get("passwordComplexity").checkPasswordComplexity(confirmPassword);
            let matched = this.get("password") === confirmPassword;
            this.set("confirmPasswordError",undefined);


                if (!isValid && matched) {
                    this.set("confirmPasswordError","Password must contain at least 2 lower case, 2 upper case, and 2 numbers with a minimum length of 6.");
                } else if (isValid && !matched) {
                    this.set("confirmPasswordError","Passwords do not match.");
                } else if (!isValid && !matched) {
                    this.set("confirmPasswordError","Password must contain at least 2 lower case, 2 upper case, and 2 numbers with a minimum length of 6 and passwords don't match.");
                } else {
                    this.set("confirmPasswordError",undefined);
                }
    

            this.set("passwordConfirm", confirmPassword);
            this.set("isCheckConfirmPassword", isValid);
            this.set("isPasswordsMatched", matched);
        },

        onSubmit() {
            if ((this.isCheckConfirmPassword && this.isCheckPassword && this.isPasswordsMatched && this.isMobile && this.submitForm) || (this.get("isEdit") && this.get("mobile").length === 10)) {

                if(this.get("isEdit")){
                          
                    var body = {
                        "name": this.get("name"),
                        "mobile": this.get("mobile"),
                        "address": this.get("address"),  
                        "userType":  this.get('selectedOption')
                    };

                var uri = new URI("customer",this.get("customerId"));

                uri.put(body).then((data) =>{

                    if (data["message"] === true){

                     body["customer_id"]= this.get("customerId");
                     this.get("triggerEditedUser")(body); 

                }
                
                else{

                    this.set("error"," try again ! ");
                }
                
            }).catch(error => {
    
                this.get("trigerAfterError")(error);
    
            });
    
            }
            
            else{

                var body = {
                    "email": this.get("email"),
                    "name": this.get("name"),
                    "mobile": this.get("mobile"),
                    "address": this.get("address"),
                    "password":btoa(this.get("password")),
                    "otp":this.get("otp"),
                    "userType":this.get('selectedOption')
                };
    
                console.log(" came to the Registration .",body);
    
                var uri = new URI("customer");
            
                
                 uri.post(body).then(data => {
                    
                    console.log("executed",data["message"] !== null);
    
                    if (data["message"] != "null") {
                        
                        body["customer_id"]=data["message"];
                        console.log(body);
                        this.get("triggerAddedUser")(body);
                    }
                     else{
                        this.set("error","Invalid OTP");
                    }
                    
                })
                .catch(error => {
    
                    this.get("triggerAfterError")(error);
                
                });

            }
         }
        },

        togglePasswordVisibility:function() {
            this.toggleProperty('showPassword'); // Toggle the visibility of the old password
        },
        toggleNewPasswordVisibility:function() {
            this.toggleProperty('showNewPassword'); // Toggle the visibility of the new password
        },

            // validate OTP .
      validateOtp(event){
        let value = event.target.value;

        if (value.length > 3 || (!/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) ) {
            event.preventDefault();
        }
        else{
            this.set("otp",value);
        }

    },

    // Store OTP
    storeOtp(event){

    let value = event.target.value;

        this.set("otp",value);

    },
    

    }
});
