import Ember from 'ember';
import URI from "../Classes/URIClass"

export default Ember.Component.extend({


  filterStore: Ember.inject.service("filter-store"),
  // Categories Storing ..
  categories: Ember.A([]),

  // Models Storing ..
  models: Ember.A([]),

  // Brands Storing ..
  brands: Ember.A([]),

  lowPrice:undefined,

  highPrice:undefined,

  // After insertion fetching the Categories .
  didInsertElement(){
    // Restore lowPrice and highPrice from localStorage if available
    var savedLowPrice ;
    var savedHighPrice;
    var savedBrands ;
    var savedModels ;
    var savedCategories;
    var savedFilteredProducts;

    this.set("inserted",true);

    if(this.get("isGlobal") === true){
      this.fetchDataIsGlobal("category");
    }
    else{
      this.fetchData("category");
    }

    if (this.get("isGlobal") === true ){


      console.log(" Stored Categories Data . ",this.get("filterStore.globalLowPrice"))

       savedLowPrice = this.get("filterStore.globalLowPrice");
       savedHighPrice = this.get("filterStore.globalHighPrice");;
       savedBrands = this.get("filterStore.globalBrands");
       savedModels = this.get("filterStore.globalModels");;
       savedCategories = this.get("filterStore.globalCategories");
       savedFilteredProducts = this.get("filterStore.globalFilteredProducts");

    }
    else{

      savedLowPrice = this.get("filterStore.localLowPrice");
      savedHighPrice = this.get("filterStore.localHighPrice");;
      savedBrands = this.get("filterStore.localBrands");
      savedModels = this.get("filterStore.localModels");;
      savedCategories = this.get("filterStore.localCategories");
      savedFilteredProducts = this.get("filterStore.localFilteredProducts");

    }

    this.set('lowPrice', savedLowPrice);
    this.set('highPrice', savedHighPrice );
    this.set('brands', savedBrands || Ember.A([]));
    this.set('models', savedModels || Ember.A([]) );
    this.set('categories',savedCategories || Ember.A([]));
    this.set('filteredProducts',savedFilteredProducts);
    
  },

  filterCount:Ember.computed("filteredProducts","submitFilter",function(){

    if (this.get("submitFilter") && this.get("filteredProducts")){
      return this.get("filteredProducts").length;
    }

    return undefined;

  }),

  willDestroyElement() {

    this._super(...arguments);


    console.log(" the low price while destroying ",this.get("lowPrice"));
    
    if(this.get("isGlobal") === true){


      this.get("filterStore").addGlobal(this.get("categories"),this.get("brands"),this.get("models"),this.get("highPrice"),this.get("lowPrice"),this.get("filteredProducts"));

    }
    else{

      this.get("filterStore").addLocal(this.get("categories"),this.get("brands"),this.get("models"),this.get("highPrice"),this.get("lowPrice"),this.get("filteredProducts"));

    }

  },

  // Checking If the Categories Are there Are Not .
  isCategories : Ember.computed("categories.length",function(){


    if(!this.get("inserted")){
      this.set('models', Ember.A([])); 
      this.set('brands', Ember.A([])); 
    }

    return this.get('categories.length') > 0;
    
  }),

  isBrands : Ember.computed("brands.length",function(){

    if(!this.get("inserted")){
      this.set('models', Ember.A([])); 
    }else{
      this.set("inserted",false);
    }
    
    return this.get('brands.length') > 0;
    
  }),

  isModels : Ember.computed("models.length",function(){

    return this.get('models.length') > 0;
    
  }),

  isPrices: Ember.computed( "lowPrice", "highPrice", function () {
  
    const lowPrice = this.get("lowPrice");
    const highPrice = this.get("highPrice");

    // Check if lowPrice and highPrice are valid numbers (not undefined, empty string, or null)
    const isHighPriceValid = highPrice !== undefined && highPrice !== "" && highPrice !== null;
    const isLowPriceValid = lowPrice !== undefined && lowPrice !== "" && lowPrice !== null;
  
    return isLowPriceValid || isHighPriceValid
  }),


      // global filter
      filter(){

        if(this.get("categories").length > 0 && ( this.get("brands").length > 0 .length > 0  || this.get("models") || this.get("lowPrice") || this.get("highPrice"))){
          this.set("load",true);
          var body = {
            "filterCategories":this.get("categories").join(","),
            "filterBrands":this.get("brands").join(","),
            "filterModels":this.get("models").join(","),
            "filterLowPrice":isNaN(parseInt(this.get("lowPrice")))?null:parseInt(this.get("lowPrice")),
            "filterHighPrice":isNaN(parseInt(this.get("highPrice")))?null:parseInt(this.get("highPrice")),
          }


                    // Clear the previous timeout if it exists
          if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
          }

          // Set a new timeout for 1 seconds
          this.searchTimeout = setTimeout(() => {
        
              if(this.get("isGlobal") === true){
                new URI("search").get(body).then(data=>{
                  
                  this.set("filteredProducts",data);
                  this.set("load",false);

        
                }).catch(error => {
                
                  console.log(error);
      
                  this.get("triggerAfterError")(error);
                
                });
              }else{
                this.set("load",false);
                let filteredProducts =  this.filterProducts(this.get("data"),body);
                this.set("filteredProducts",filteredProducts);
              }

            }, 2000); // 2 seconds debounce time


        }
      },
  
// Filtering The Products Locally with AND logic for all filters
filterProducts(products, filters) {
  const models = filters.filterModels ? filters.filterModels.split(",").map(m => m.toLowerCase().trim()) : [];
  const brands = filters.filterBrands ? filters.filterBrands.split(",").map(b => b.toLowerCase().trim()) : [];
  const categories = filters.filterCategories ? filters.filterCategories.split(",").map(c => c.toLowerCase().trim()) : [];
  const lowPrice = filters.filterLowPrice || 0;
  const highPrice = filters.filterHighPrice || Infinity;

  return products.filter(product => {
    const productCategory = product.category.toLowerCase().split(",").map(cat => cat.trim());
    const productModel = product.model.toLowerCase().trim();
    const productBrand = product.brand.toLowerCase().trim();

    // Check if the product's category is in the provided categories
    const categoryMatch = categories.length === 0 || productCategory.some(cat => categories.includes(cat));

    // Check if the product's price falls within the range
    const priceMatch = product.price >= lowPrice && product.price <= highPrice;

    // Check if the product's model is in the provided models
    const modelMatch = models.length === 0 || models.includes(productModel);

    // Check if the product's brand is in the provided brands
    const brandMatch = brands.length === 0 || brands.includes(productBrand);

    // Return true only if all conditions are met (AND logic for all filters)
    return categoryMatch && priceMatch && modelMatch && brandMatch;
  });
},

submitFilter: Ember.computed("categories.length", "lowPrice", "highPrice", function () {
  const categoriesLength = this.get('categories.length') || 0; // Default to 0 if undefined
  const lowPrice = parseFloat(this.get("lowPrice")) || 0; // Convert lowPrice to a number, default to 0 if NaN
  const highPrice = parseFloat(this.get("highPrice")) || Infinity; // Convert highPrice to a number, default to Infinity if NaN

  // Check if lowPrice and highPrice are valid numbers
  const isHighPriceValid = this.get("highPrice") === undefined || this.get("highPrice") === "" || highPrice >= 0;
  const isLowPriceValid = this.get("lowPrice") === undefined || this.get("lowPrice") === "" || lowPrice >= 0;

  // Ensure lowPrice is less than or equal to highPrice
  const isPriceRangeValid = lowPrice <= highPrice;

  // Return true only if all conditions are met
  return categoriesLength > 0 && isLowPriceValid && isHighPriceValid && isPriceRangeValid;
}),


// toggling the filter options .
  toggleData(param){

    this.set("iscategory",false);
    this.set("isbrand",false);
    this.set("ismodel",false);
    this.set("isprice",false);
    this.set(param,true);

  },


  // fetch the data locally.. 
  fetchData(param){
    
    console.log(param);
    if(param === "category"){
    let categories = this.get("data")
    .flatMap(product => product[param].split(','))  // Split comma-separated values and flatten
    .map(name => name.trim().toLowerCase())                       // Trim any extra spaces
    .filter((name, index, self) => self.indexOf(name) === index);  // Ensure uniqueness

    this.set(param+"data",categories);
    this.toggleData("is"+param);

    }
    else if (param === "model"){

      var cat = this.categories; // Array of categories to filter by
      var brands = this.brands

      let catego = this.get("data")
        .filter(product => 
          product.brand.split(',').some(brand => brands.includes(brand.trim().toLowerCase()) && 
          product.category.split(',').some(category => cat.includes(category.trim().toLowerCase()))
        )
        ) // Filter by categories that match any value in the cat array
        .map(product => product[param].toLowerCase()) // Get the specific parameter for each filtered product
        .filter((name, index, self) => self.indexOf(name) === index); // Remove duplicates
      
      this.set(param + "data", catego); // Set the unique values in the data property
      this.toggleData("is" + param); // Toggle some state related to param  


    }
    else{
      var cat = this.categories; // Array of categories to filter by

      let catego = this.get("data")
        .filter(product => 
          product.category.split(',').some(category => cat.includes(category.trim().toLowerCase()))
        ) // Filter by categories that match any value in the cat array
        .map(product => product[param].toLowerCase()) // Get the specific parameter for each filtered product
        .filter((name, index, self) => self.indexOf(name) === index); // Remove duplicates
      
      this.set(param + "data", catego); // Set the unique values in the data property
      this.toggleData("is" + param); // Toggle some state related to param      
      
    }


  },

  // fetch the products globally ..
   fetchDataIsGlobal(param){

    var uri = new URI("product");

    if(param === "brand"){
      uri.get({
        "filterColumns":param,
        "filterCategory":this.categories.join(",")
      }).then(data=>{
    
         let uniqueArray =  data.map(entry => entry.split(',')[0].trim()).filter((item, index) => {
        return data.map(entry => entry.split(',')[0].trim()).indexOf(item) === index;
      });
  
        this.set(param+"data",uniqueArray);
        this.toggleData("is"+param);
  
      }).catch(error => {
               
        console.log(error);
        this.get("triggerAfterError")(error);
      
      });
  
  
     }
     else if(param === "model"){
      
      uri.get({
        "filterColumns":param,
        "filterCategory":this.categories.join(","),
        "filterBrand":this.brands.join(",")
      }).then(data=>{
    
         let uniqueArray =  data.map(entry => entry.split(',')[0].trim()).filter((item, index) => {
        return data.map(entry => entry.split(',')[0].trim()).indexOf(item) === index;
      });
  
        this.set(param+"data",uniqueArray);
        this.toggleData("is"+param);
  
      }).catch(error => {
            
        console.log(error);
        this.get("triggerAfterError")(error);
  
      });
  

     }
     else{

      uri.get({
        "filterColumns":param
      }).then(data=>{
    
         let uniqueArray = data.map(entry => entry.split(',')[0].trim()).filter((item, index) => {
        return data.map(entry => entry.split(',')[0].trim()).indexOf(item) === index;
      
      })

      this.set(param+"data",uniqueArray);
      this.toggleData("is"+param);
  
      }).catch(error => {
        
        console.log(error);
        this.get("triggerAfterError")(error);
    
      });
  
  
     }

    }, 

  actions:{

    // triggering parent action .
    back(){
      this.get("triggerBack")();
    },

    // display categories .
    displayCategories(){
      if(this.get("isGlobal") === true){
        // Globally
        this.fetchDataIsGlobal("category");
      }
      else{
        // Locally
        this.fetchData("category");
      }
    },

    //display brands
    displayBrands(){
      if(this.get("isGlobal") === true){
        this.fetchDataIsGlobal("brand");
      }
      else{ 
        this.fetchData("brand");
      }
    },

    //display models
    displayModels(){
      if(this.get("isGlobal") === true){
        this.fetchDataIsGlobal("model");
      }
      else{
        this.fetchData("model");
      }
    },


    //display price
    displayPrice(){
      this.set("isprice",true);
      this.toggleData("isprice");
    },


    // adding the categories .
    addCategoryItem() {
      var category = event.target.value.toLowerCase();
      let categories = this.get("categories");
      if (categories.includes(category)) {
        // Use Ember's 'removeObject' to remove the item
        categories.removeObject(category);
      } else {
        // Use 'pushObject' to add the item
        categories.pushObject(category);
      }

      // Clear the previous timeout if it exists


      // Set a new timeout for 1 seconds

        this.filter();
    
    },

    // adding the brands .
    addBrandItem(){

      var brand = event.target.value.toLowerCase();
        let brands = this.get("brands");
        if (brands.includes(brand)) {
          brands.removeObject(brand);
        } else {
          brands.pushObject(brand);
        }

        this.filter();
    },

    // adding the models .
    addModelItem(){
      var model = event.target.value.toLowerCase();
      let models = this.get("models");
        if (models.includes(model)) {
          models.removeObject(model);
        } else {
          models.pushObject(model);
        }

        this.filter();
    },

    //to update the low Price .
    updateLowPrice() {

      console.log(" the low price ",event.target.value);
      this.set('lowPrice', event.target.value);

           // Clear the previous timeout if it exists
           if (this.settingTimeout) {
            clearTimeout(this.settingTimeout);
          }
    
            this.filter();
    
    },

    //to update the high price .
    updateHighPrice() {
      this.set('highPrice', event.target.value);
      this.filter();
    },

    applyFilter(){

      if(this.get("filteredProducts")){
        this.get("triggerFilter")(this.get("filteredProducts"));
      }
      
    },

    // clearing the filter .
    clear(){

      this.get('categories').clear();
      this.get('models').clear();
      this.get('brands').clear();
      this.get("triggerClear")();
      this.set('lowPrice',undefined);
      this.set('highPrice',undefined);
      this.set('filteredProducts',undefined);

    },

    validatePrice(event){

      if ((!/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) ) {
          event.preventDefault();
      }
},

  }


});
