import Ember from 'ember';

import URI from '../Classes/URIClass';

export default Ember.Component.extend({

    // Allow Super Admin 
    allowSuperAdmin:Ember.computed(function(){
        return Ember.getOwner(this).lookup("route:application").modelFor("application").user_type === 2;
      }), 

    actions:{

        // Triggering The Parent action 

        back(){

            this.set("alertPopup",false);
            this.set("isEdit",false);

        },

        editUser(customer){

           var model =  Ember.getOwner(this).lookup("route:application").modelFor("application");

           this.set("isEdit",true);
           this.set("isSelfAdmin", customer.customer_id === model.customer_id);
           this.set("isAdmin",model.user_type > 1);

           this.set("name",customer.name);
           this.set("mobile",customer.mobile);
           this.set("address",customer.address);
           this.set("customerId",customer.customer_id);
            console.log(" Customer Type : ",customer.user_type);
            this.set('selectedOption',customer.user_type);
            this.set('customer',0);
            this.set('admin',1);

        },

        editedUser(body){

            console.log(" triggered in customer table .");
            console.log(body);
            this.set("isEdit",false);            
            this.get("triggerUpdateCustomer")(body);
        },
        // Delete Pop Up enabling .
        deleteCustomer(customerId){
            this.set("deleteCustomerId",customerId);
            this.set("alertPopup",true);
        },

        // Deleting the Customer After Confirmation .
        deleteCustomerConfirm(customerId){
            this.set("alertPopup",false);
            var uri = new URI("customer",customerId);

                    uri.delete().then(data=>{
                        if (data["message"] === true){
                            this.get("triggerReloadCustomer")(customerId);
                        }
                    }).catch(error => {
                        let status = error.status; // Get status code
                        let message = encodeURIComponent(error.statusText); // Get status text
                  
                        // Navigate to the error route with code and message
                        this.transitionTo('errorpage', status, message);    });
                
        
        },
    }
});
