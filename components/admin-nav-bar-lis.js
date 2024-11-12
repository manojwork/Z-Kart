import Ember from 'ember';

export default Ember.Component.extend({

    // Changing The Color OF the icon when it is Clicked .
    toggleColors(colorParam){
        this.set("customerColor","black");
        this.set("productColor","black");
        this.set("adminColor","black");
        this.set("orderColor","black");
        this.set(colorParam,"blueviolet");
    },
    
    actions:{ 

        addProduct(){
            this.get("triggerAddProduct")();
        },

        addCustomer(){
            console.log(" triggering the add user . ")
            this.get("triggerAddUser")();
        },

        // Triggering The displayCustomers action of its Parent .
        callDisplayCustomers(){
            this.toggleColors("customerColor");
            this.get("triggerCallDisplayCustomers")();
        },

        // Triggering The displayProducts action of its Parent .
        callDisplayProducts(){
            this.toggleColors("productColor");
            this.get("triggerCallDisplayProducts")();
        },

        // Triggering The displayAdmins action of its Parent .
        callDisplayAdmins(){
            this.toggleColors("adminColor");
            this.get("triggerCallDisplayAdmins")();
        },

        // Triggering The displayOrders action of its Parent .
        callDisplayOrders(){
            this.toggleColors("orderColor");
            this.get("triggerCallDisplayOrders")();
        }

    }
});
