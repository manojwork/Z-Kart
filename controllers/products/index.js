import Ember from 'ember';
import URI from '../../Classes/URIClass';
var uri = new URI("product");

export default Ember.Controller.extend({

    callProducts() {
        return uri.get({ "filterProducts": "exist" }).then(data => {
            this.set("productsData", data);
            if(this.get("filteredProducts")){
                this.set("products",this.get("filteredProducts"));
                this.set("isRecentlyAdded",false);
            }else{
                this.set("products", data);
            }
        }).catch(error => {
      let status = error.status; // Get status code
      let message = encodeURIComponent(error.statusText); // Get status text

      // Navigate to the error route with code and message
      this.transitionToRoute('errorpage', status, message);    });

    },

    // enabling the previous button .
    isPrevious: Ember.computed('last', function() {
        return this.get("last") > 10;
    }),

    // enabling the next button .
    isNext: Ember.computed('last', 'products', function() {
        return this.get("products").length > this.get("last");
    }),

    // displaying product with in the last-10, last .
    displayProducts: Ember.computed('productsData','products', 'last', function() {
        return this.get("products").slice(this.get("last") - 10, this.get("last"));
    }),

    isFilteredProducts:Ember.computed('filteredProducts.length',function(){

        return this.get('filteredProducts.length') > 0;
    }),

    actions: {
 
        // last - 10
        previous() {
            this.set("last", this.get("last") - 10);
        },

        // last + 10
        next() {
            this.set("last", this.get("last") + 10);
        },

        // disable the filter .
        back(){
            this.set("isFilter",false);
        },

        // display filter .
        displayFilter(){ 
            this.set("isGlobal",true);
            this.set("isFilter",true);
        },

        // filter data showing . 
        filter(data){
            this.set("isRecentlyAdded",false);
            this.set("products",data);
            this.set("filteredProducts",data);
            this.set("isFilter",false);
            this.set("last",10);
        },

        // clearing the filter .
        clear(){
            this.set("products",this.get("productsData"));
            this.set("isFilter",false);
            this.set("isRecentlyAdded",true);
            this.set("filteredProducts",undefined);
        },

        // Error Handing Action .
        afterError(error){

            console.log(error);

            let status = error.status; // Get status code
            let message = encodeURIComponent(error.statusText); // Get status text
            // Navigate to the error route with code and message
            this.transitionToRoute('errorpage', status, message); 
    
        },

    }
});
