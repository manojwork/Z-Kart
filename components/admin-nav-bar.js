import Ember from 'ember';

export default Ember.Component.extend({


  // toggling the Search Bar 
  toggleProperties(param){ 
    this.set("customer",false);
    this.set("product",false);
    this.set("admin",false);
    this.set("order",false);
    this.set(param,true);
  },

  // Only for Super Admin ( user type === 2) .
  allowAddCustomer:Ember.computed(function(){
    return Ember.getOwner(this).lookup("route:application").modelFor("application").user_type === 2;
  }),

    actions: {
      
      back(){
            this.set("isAddProduct",false);
            this.set("isAddUser",false);
        },

        addProduct(){
            this.set("isAddProduct",true);
        },


        addedProduct(body){
            console.log( " triggered added Product ");
            this.set("isAddProduct",false);
            this.get("triggerAddedProduct")(body);
        },


      addCustomer(){
            this.set("isAddUser",true);
            this.set('selectedOption',0);
            this.set('customer',0);
            this.set('admin',1);
        },

        addedUser(body){
            this.set("isAddUser",false);
            this.get("triggerAddedUser")(body);
        },

        // To Show The Icons In Mobile View . 
        showList : function(){
            this.toggleProperty("isMenuVisible");
        },
    
        // Trigger the parent action
        callDisplayCustomers() {
              this.toggleProperties("customer");
              this.get('triggerDisplayCustomers')();
        },
        
        // Trigger the parent action
        callDisplayProducts() {
              this.toggleProperties("product");
              this.get('triggerDisplayProducts')(); 
        },
        
        // Trigger the parent action
        callDisplayAdmins() {
              this.toggleProperties("admin");
              this.get('triggerDisplayAdmins')();
        },

        // Trigger the parent action
        callDisplayOrders() {
              this.toggleProperties("order");
              this.get('triggerDisplayOrders')(); 
        },

        // Trigger The search parent action 
        searchProducts(event){
              this.get("triggerProductsSearch")(event.target.value);
        },

        // Trigger The search parent action 
        searchCustomers(event){
              this.get("triggerCustomersSearch")(event.target.value);
        },

        // Trigger The search parent action 
        searchOrders(event){
            console.log(event.target.value," data ");
              this.get("triggerOrdersSearch")(event.target.value);
        },
        
        // Trigger The search parent action 
        searchAdmins(event){
              this.get("triggerAdminsSearch")(event.target.value);
        }
          


      }
});
