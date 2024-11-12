import Ember from 'ember';

export default Ember.Controller.extend({

    // filtering the searched products .

    init(){
        this.set("last", 10);
    },

    isPrevious: Ember.computed('last', function() {
        return this.get("last") > 10;
    }),

    isNext: Ember.computed('last', 'products', function() {
        return this.get("products").length > this.get("last");
    }),

    displayProducts: Ember.computed('products', 'last', function() {
      return this.get("products").slice(this.get("last") - 10, this.get("last"));
    }),

    isFilteredProducts: Ember.computed('filteredProducts.length',function(){

        return this.get("filteredProducts.length") > 0;

    }),

  actions: {

    previous() {
        this.set("last", this.get("last") - 10);
    },

    next() {
        this.set("last", this.get("last") + 10);
    },

    back() {
      this.set('isFilter', false);
    },

    displayFilter() {
      this.set('isGlobal', false);
      this.set('isFilter', true);
    },

    filter(data) {
      this.set('products', data);
      this.set("filteredProducts",data);
      this.set('isFilter', false);
      this.set("last",10);
    },

    clear() {
      this.set('products',this.model);
      this.set('isFilter', false);
      this.set('filteredProducts',[]);
    },

    // Error Handing Action .
    afterError(error){

      console.log(error);

      let status = error.status; // Get status code
      let message = encodeURIComponent(error.statusText); // Get status text
      // Navigate to the error route with code and message
      this.transitionToRoute('errorpage', status, message); 

  },
  },
});
