import Ember from 'ember';
import URI from '../Classes/URIClass';

import {computed} from "@ember/object";

export default Ember.Controller.extend({

    beforeSession : computed("currentRouteName",function(){

        return Ember.get(this,"currentRouteName") === "signin" ||
         Ember.get(this,"currentRouteName") === "signup" ||
         Ember.get(this,"currentRouteName") === "changepassword"||
         Ember.get(this,"currentRouteName").includes("error")||
         Ember.get(this,"currentRouteName").includes("Edit") ||
         Ember.get(this,"currentRouteName").includes("admin")||
         Ember.get(this,"currentRouteName").includes("Add");

    }),

    isNoSearch : computed("currentRouteName",function(){
        return Ember.get(this,"currentRouteName").includes("account")||
         Ember.get(this,"currentRouteName").includes("about");           
    }),

    // admin change password when he loging for first time .
    allowChangePassword:Ember.computed("done",function(){
        if (this.model === null || this.get("done") !== undefined){
            return false;
        } 
        return  this.model.log_first === 1  && this.model.user_type > 0 ;

    }),

    actions:{

        // Error Handing Action .
        afterError(error){

            console.log(error);

            let status = error.status; // Get status code
            let message = encodeURIComponent(error.statusText); // Get status text
            // Navigate to the error route with code and message
            this.transitionToRoute('errorpage', status, message); 

        },
        back: function(){
            window.location.reload();
        },

        searchProducts(content){
            if(content !== ""){
                this.transitionToRoute("products.search",content);
            }
            else{
                this.transitionToRoute("products.index");
            }
        },

        // changing log first after changing the log first .
        changePassword(data){
            if(data === true){
                new URI("customer",this.get("model").customer_id).put({ "logFirst":2 }).then(data=>{
                    if(data["message"] === true){
                        this.set("done",true);

                        let uri = new URI('logout');
                        uri.get().then(data => {
                            if (data["message"] === true) {
                                this.set("isAlert",true);
                                setTimeout(()=>{
                                    window.location.reload();
                                    this.set("isAlert",false);
                                },2000)                             }
                        })
                        .catch(error => {
                            let status = error.status; // Get status code
                            let message = encodeURIComponent(error.statusText); // Get status text
                            // Navigate to the error route with code and message
                            this.transitionToRoute('errorpage', status, message); 
                           });

                    }
                }).catch(error => {
                    let status = error.status; // Get status code
                    let message = encodeURIComponent(error.statusText); // Get status text
              
                    this.transitionToRoute('errorpage', status, message);    });
              
            }
        }
    }

});
