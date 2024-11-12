import Ember from 'ember';
import URI from '../Classes/URIClass';

export default Ember.Controller.extend({
    
    actions: {

        // Error Handing Action .
        afterError(error){

                console.log(error);

                let status = error.status; // Get status code
                let message = encodeURIComponent(error.statusText); // Get status text
                // Navigate to the error route with code and message
                this.transitionToRoute('errorpage', status, message); 

        },

        editUser(){
            
               this.set("isEdit",true);
               this.set("name",this.get("model").name);
               this.set("mobile",this.get("model").mobile);
               this.set("address",this.get("model").address);
               this.set("customerId",this.get("model").customer_id);

        },

        editedUser(body){
                // Update the model properties with new values from the body
                this.set("isEdit",false);
                this.set("model.name", body.name);
                this.set("model.mobile", body.mobile);
                this.set("model.address", body.address);
        },
        // logout option .
        logout: function() {
            this.set("isLoader",true);
            setTimeout(() => {
                this.set("isLoader",false);
            }, 1000); 

            let uri = new URI('logout');
            uri.get().then(data => {
                if (data["message"] === true) {
                    window.location.reload();
                }
            })
            .catch(error => {
                let status = error.status; // Get status code
                let message = encodeURIComponent(error.statusText); // Get status text
                // Navigate to the error route with code and message
                this.transitionToRoute('errorpage', status, message);    });
        },

        // chenage password enable .
        changePassword: function(){ 
            this.set("allowChangePassword",true);
        },

        // change password disable .
        back(){
            this.set("isEdit",false);
            this.set("allowChangePassword",false);
        },

        // change password confirm .
        changePasswordSubmit(data){ 
            if(data === true){
                this.set("allowChangePassword",false);
                
                let uri = new URI('logout');
                uri.get().then(data => {
                    if (data["message"] === true) {
                        this.set("isAlert",true);
                        setTimeout(()=>{
                            this.set("isAlert",false);
                            window.location.reload();
                        },2000)            
                    }
                })
                .catch(error => {
                    let status = error.status; // Get status code
                    let message = encodeURIComponent(error.statusText); // Get status text
                    // Navigate to the error route with code and message
                    this.transitionToRoute('errorpage', status, message); 
                   });
            }
        },
        
    },
});
