import Ember from 'ember';
import URI from "../Classes/URIClass"

export default Ember.Controller.extend({


    // loading the starting data from the route setController .
    startingLoad(){
        
        this.searchCache("asd",null);
        this.set("isProducts",true);
        var uri = new URI("product");
        var body = {
            "filterProducts":"asc"
        }
        return uri.get(body).then(data=>{
            this.set("productsData",data);
            this.set("products",data.slice(0,50));
    
        }).catch(error => {
          
            this.afterError(error); 

         })

 },

 // Data Container Toggle ( table view )
    toggleProperties(prop){
        this.set("isCustomers",false);
        this.set("isProducts",false);
        this.set("isAdmins",false);
        this.set("isOrders",false);
        this.set("isOrderProducts",false);
        this.searchCache("asd");
        this.set(prop,true);
    },

    // To Store the Searched content .   
    searchCache(param,value){
        this.set("customerSearch",null);
        this.set("productSearch",null);
        this.set("adminSearch",null);
        this.set(param,value);
    },


    
 
    // searching products .
    productsSearch(params){

        var products = this.get("productsData");

        return products.filter((product)=> product.product_id.toLowerCase().includes(params.toLowerCase()) ||
                                           product.name.toLowerCase().includes(params.toLowerCase())  ||
                                           product.model.toLowerCase().includes(params.toLowerCase())|| 
                                           product.category.toLowerCase().includes(params.toLowerCase())||
                                           product.brand.toLowerCase().includes(params.toLowerCase()));
        
    },


    // searching customers .
    customersSearch(params){

        var customers = this.get("customersData");

        return customers.filter((customer)=>customer.customer_id.toLowerCase().includes(params.toLowerCase()) ||
                                            customer.name.toLowerCase().includes(params.toLowerCase())  ||
                                            customer.email.toLowerCase().includes(params.toLowerCase())|| 
                                            customer.mobile.toLowerCase().includes(params.toLowerCase())||
                                            customer.address.toLowerCase().includes(params.toLowerCase()));
        
    },

    // searching admins .
    adminsSearch(params){

        var customers = this.get("adminsData");

        return customers.filter((customer)=>customer.customer_id.toLowerCase().includes(params.toLowerCase()) ||
                                            customer.name.toLowerCase().includes(params.toLowerCase())  ||
                                            customer.email.toLowerCase().includes(params.toLowerCase())|| 
                                            customer.mobile.toLowerCase().includes(params.toLowerCase())||
                                            customer.address.toLowerCase().includes(params.toLowerCase()));
        
    },

    // orders searching .
    ordersSearch(params){

        var orders = this.get("ordersData");

        return orders.filter((order)=>      order.order_id.toLowerCase().includes(params.toLowerCase()) ||
                                            order.time.toLowerCase().includes(params.toLowerCase())  ||
                                            order.name.toLowerCase().includes(params.toLowerCase())|| 
                                            order.total_price == params.toLowerCase()||
                                            order.mobile.toLowerCase().includes(params.toLowerCase())||
                                            order.address.toLowerCase().includes(params.toLowerCase())||
                                            order.coupon.toLowerCase().includes(params.toLowerCase())
                                        );
        
    },



    // loading products from DB
    productsCall(){

            var uri = new URI("product");
        
            var body = {
                "filterProducts":"asc"
            }
        
            return uri.get(body).then(data=>{
        
                this.set("productsData",data);
        
            }).catch(error => { 
                this.afterError(error);
            });
          
        },


    // loading customers from DB 
     customersCall(){

            var uri = new URI("customer");
        
            return uri.get().then(data=>{
        
                this.set("customersData",data.filter(product=> product.user_type === 0 ));
                this.set("adminsData",data.filter(product=> product.user_type === 1 ));

        
            }).catch(error => {
                this.afterError(error);
            });
          
               
        },

    // loading orders from DB 
    ordersCall(){
            
            var uri = new URI("order");
        
            return uri.get().then(data=>{
        
                this.set("ordersData",data);
        
            }).catch(error => {
                this.afterError(error);
            });
          
        },

        actions:{

            updateDate(selectedDate) {
                this.set("orders",this.ordersSearch(selectedDate.toLowerCase().trim()));
              },

            // Error Handing Action .
            afterError(error){

                console.log(error);

                let status = error.status; // Get status code
                let message = encodeURIComponent(error.statusText); // Get status text
                // Navigate to the error route with code and message
                this.transitionToRoute('errorpage', status, message); 
        
            },

            // displaying customers .
            displayCustomers(){

            this.toggleProperties("isCustomers");
            
            this.set("customers", this.get("customersData"));


            },

            // displaying products .
            displayProducts(){

                this.toggleProperties("isProducts");

                this.set("products", this.get("productsData").slice(0,50));
    
                },

            // displaying admins .
            displayAdmins(){

                    this.toggleProperties("isAdmins");
                    
                    this.set("admins", this.get("adminsData"));
        
                },

            // displaying orders .
            displayOrders(){

                    this.toggleProperties("isOrders");

                    this.set("orders", this.get("ordersData"));
        
                },

            // search customer action .
            searchCustomers(params){

                    this.set("customers",this.customersSearch(params.trim()));
                    this.searchCache("customerSearch",params.trim());
                },

            // search products action .
            searchProducts(params){
                    
                    this.set("products",this.productsSearch(params.trim()));
                    this.searchCache("productSearch",params.trim());

                },

            // search admins action .
            searchAdmins(params){

                    this.set("admins",this.adminsSearch(params.trim()));
                    this.searchCache("adminSearch",params.trim());

                },

            // search orders action .
            searchOrders(params){
                    console.log(" triggerd Params ",params);
                    this.set("orders",this.ordersSearch(params.trim()));
            },

            // search customers action
            reloadCustomers(id){
                this.set("customers",this.get("customers").filter(customer=> customer.customer_id != id));
                this.set("customersData",this.get("customersData").filter(customer=> customer.customer_id != id));
            },

            // reloading the admins after deletion .
            reloadAdmins(id){
                this.set("admins",this.get("admins").filter(admin=> admin.customer_id != id));
                this.set("adminsData",this.get("adminsData").filter(admin=> admin.customer_id != id));
            },

            // reloading the products after deletion .
            reloadProducts(id){
                this.set("products",this.get("products").filter(product=> product.product_id != id));
                this.set("productsData",this.get("productsData").filter(product=> product.product_id != id));
            },

            // reloading the products after Editing  .
            updateProduct(body){

                 this.set("products",this.get("products").map(product => {
                    // If the product_id matches, update it with the new data from body
                    if (product.product_id === body.product_id) {
                        return Object.assign({}, product, body);
                    }
                    return product; // Keep the other products unchanged
                }));    

                this.set("productsData",this.get("productsData").map(product => {
                    // If the product_id matches, update it with the new data from body
                    if (product.product_id === body.product_id) {
                        return Object.assign({}, product, body);
                    }
                    return product; // Keep the other products unchanged
                }));   

            },

            updateCustomer(body){

                if(body.userType == 1){
                    const customerToMove = this.get("customers").find(customer => customer.customer_id === body.customer_id);

                    if (customerToMove) {
                        customerToMove.user_type = 1

                        // Add the customer to the admins array
                        this.set("admins", [...(this.get("admins") || []), customerToMove]);
                        this.set("adminsData", [...(this.get("adminsData") || []), customerToMove]);

                        // Remove the customer from the customers array
                        this.set("customers", this.get("customers").filter(customer => customer.customer_id !== body.customer_id));
                        this.set("customersData", this.get("customersData").filter(customer => customer.customer_id !== body.customer_id));

                    }

                }else{

                    this.set("customers",this.get("customers").map(customer =>{
                        // If the customer_id matches, update it with the new data from body .
                        if(customer.customer_id === body.customer_id){
                        
                            return Object.assign({}, customer, body);
                        }
                        return customer; // Keep the other products unchanged
    
                    }));

                    this.set("customersData",this.get("customersData").map(customer =>{
                        // If the customer_id matches, update it with the new data from body .
                        if(customer.customer_id === body.customer_id){
                        
                            return Object.assign({}, customer, body);
                        }
                        return customer; // Keep the other products unchanged
    
                    }));


                }

            },

            updateAdmin(body){

                if (body.userType == 0){

                    
                    const customerToMove = this.get("admins").find(customer => customer.customer_id === body.customer_id);

                    if (customerToMove) {
                        customerToMove.user_type = 0;

                        // Add the customer to the admins array
                        this.set("customers", [...(this.get("customers") || []), customerToMove]);
                        this.set("customersData", [...(this.get("customersData") || []), customerToMove]);

                        // Remove the customer from the customers array
                        this.set("admins", this.get("admins").filter(customer => customer.customer_id !== body.customer_id));
                        this.set("adminsData", this.get("adminsData").filter(customer => customer.customer_id !== body.customer_id));
                    }
                }
                else{
                    this.set("admins",this.get("admins").map(admin =>{
                        // If the customer_id matches, update it with the new data from body .
    
                        if(admin.customer_id === body.customer_id){
                            return Object.assign({},admin, body);
                        }
                        return admin; // Keep the other products unchanged
    
                    }));

                    this.set("adminsData",this.get("adminsData").map(admin =>{
                        // If the customer_id matches, update it with the new data from body .
    
                        if(admin.customer_id === body.customer_id){
                            return Object.assign({},admin, body);
                        }
                        return admin; // Keep the other products unchanged
    
                    }));

                }
     
            },

            // reloading the products after Adding .
            addedProduct(body){
                
                // Adding the new product
                this.set("products", [...(this.get("products") || []), body].sort((a, b) => a.stock - b.stock));
                this.set("productsData", [...(this.get("productsData") || []), body].sort((a, b) => a.stock - b.stock));


            },

            addedCustomer(body){
            
                console.log(body); 

                if(body.userType == 0){

                    this.set("customers", [...(this.get("customers") || []), body]);
                    this.set("customersData", [...(this.get("customersData") || []), body]);

                }else{

                    this.set("admins", [...(this.get("admins") || []), body]);
                    this.set("adminsData", [...(this.get("adminsData") || []), body]);

                }

            },

            displayOrderProducts(cartId,orderId){

                var uri = new URI("order",cartId,orderId,"products");
        
                uri.get().then( data =>{ 
                        if(data){
                            this.set("orderId",orderId);
                            this.set("orderProducts",data);
                            this.toggleProperties("isOrderProducts");
                        }
                }).catch(error => {

                    let status = error.status; // Get status code
                    let message = encodeURIComponent(error.statusText); // Get status text
                    // Navigate to the error route with code and message
                    this.transitionToRoute('errorpage', status, message); 
                    
                });

            }


        }
});
