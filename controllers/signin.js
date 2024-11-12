import Ember from 'ember';
import URI from '../Classes/URIClass';

let uri = new URI('customer');  

export default Ember.Controller.extend({

    emailTrue:false,

    done:false,

    isEmailValid : Ember.computed("emailTrue","done",function(){
        return this.get("emailTrue") && this.get("done");
    }),

    actions:{

        next(){
            this.set("done",true);
            if(!this.get("emailTrue")){
                this.set("emailError"," Invalid Email !");
            }
        },

        back(){
            this.set("done",false);
        },

        clearPasswordError(){

            this.set("passwordError",undefined);

        },

        clearEmailError(){

            this.set("emailError",undefined);

        },

        // sign in form submition .
        onSubmit:function(){

            this.set("isLoader",true);
            var body = {
                "email" : this.get('email'),
                "password" : btoa(this.get('password'))
            };

            if(this.get("emailTrue")){
                uri.post(body)
                .then(data=>{
                    
                    if(data === null){
                        setTimeout(() => {
                            this.set("isLoader",false);
                            this.set("passwordError","password incorrect ! .")
                        }, 1000); 

                    }
                    else{
                        setTimeout(() => {
                            this.set("isLoader",false);
                            window.location.reload();
                        }, 1000); 
                    }
                })
                .catch(error => {
                    let status = error.status; // Get status code
                    let message = encodeURIComponent(error.statusText); // Get status text
                    this.transitionToRoute('errorpage', status, message);    });

            }else{
                this.set("passwordError","invalid details");
                this.set("isLoader",false);

            }
              

        },

        // cheching the email in db .
        checkEmail: function() {

                    let body = {
                    "email" : this.get('email')
               };

               const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

               if( this.get('email') && emailPattern.test(this.get('email'))){


                uri.get(body)
                .then(data => {
                    if(data && data["message"] === true){
                        this.set("emailTrue",true);
                        this.set("emailError",undefined);
                    }
                    else{
                        this.set("emailTrue",false);
                        this.set("emailError"," user does not exist Please sign up !");
                    }

                })
                .catch(error => {
                     console.log(error);
                    let status = error.status; // Get status code
                    let message = encodeURIComponent(error.statusText); // Get status text
              
                    this.transitionToRoute('errorpage', status, message);    });

               }else{
                this.set("emailTrue",false);
                this.set("emailError","invalid email");
            }
             
        },

        // toggle the password type .
        togglePasswordVisibility:function() {
            this.toggleProperty('showPassword'); // Toggle the visibility of the password
        },

    }

});
