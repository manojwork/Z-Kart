import Ember from 'ember';
import URI from '../../Classes/URIClass';

export default Ember.Controller.extend({

    relateProducts: null,
    
    last: 10, // Ensure 'last' is initialized properly

    magnifiedStyle: Ember.computed(() => ''), 

    addedToCart:"Add To Cart",

    cartProducts:Ember.inject.service("cart-products"),


    afterError(error){
        let status = error.status; // Get status code
        let message = encodeURIComponent(error.statusText); // Get status text
  
        // Navigate to the error route with code and message
        this.transitionToRoute('errorpage', status, message);  
    },

    cartButtonAnimation(){
        console.log(" animation triggred .");
        this.set("addedToCart","Adding...");
        this.set("addingChange",true);

        this.addingTime = setTimeout(() =>{
                this.set("addedToCart","Added ");
                this.set("addingChange",false);
                this.set("addedChange",true);
                this.get("cartProducts").addCartProducts(this.get("model").product.product_id);
            },1000)

        this.addedTime = setTimeout(()=>{

                this.set("addedToCart","Add To Cart")
                this.set("addedChange",false);
                
            },2000)
    },

    relatedProducts(){

        if( this.addingTime || this.addedTime){

            clearTimeout(this.addedTime);
            clearTimeout(this.addingTime);

            this.set("addingTime",undefined);
            this.set("addedTime",undefined);
            this.set("addedChange",false);
            this.set("addingChange",false);
            this.set("addedToCart","Add To Cart");

        }
    },

    isPrevious: Ember.computed('last', function() {
        return this.get("last") > 10;
    }),

    // enabling the next button .
    isNext: Ember.computed('last', 'relateProducts', function() {
        return this.get("relateProducts") ? this.get("relateProducts").length > this.get("last") : false;
    }),
    
    displayProducts: Ember.computed('relateProducts', 'last', function() {
        return  this.get("relateProducts") && this.get("last") ? this.get("relateProducts").slice(this.get("last") - 10, this.get("last")) : null;
    }),

    actions:{
        
          handleMouseMove(event) {
            const image = event.target.src;
            const rect = event.target.getBoundingClientRect();
      
            // Calculate relative mouse position
            const x = event.pageX - rect.left;
            const y = event.pageY - rect.top;
      
            const backgroundX = (x / rect.width) * 100 ;
            const backgroundY = (y / rect.height) * 100;
      
            // Update the magnified style with the background image and position


            this.set(
              'magnifiedStyle',
              ` 
                background-image: url('${image}');
                background-size: ${rect.width * 3.5}px ${rect.height * 3.5}px;
                background-position: ${backgroundX}% ${backgroundY}%;`
              
            );
          },
        
          handleMouseLeave() {
            this.set('magnifiedStyle', 'display: none;');
          },

        

        // last - 10
        previous() {
            this.set("last", this.get("last") - 10);
        },
    
        // last + 10
        next() {
            this.set("last", this.get("last") + 10);
        },

        back: function(){
            this.set("isBuyProduct",false);
            this.set("added",false);
        },

        // buying the product alone .
        buy(name,mobile,address){
            this.set("isBuyProduct",false);
            this.set("isLoader",true);
            var body = {
                "name": name,
                "mobile" : mobile,
                "address" : address,
                "cartId" : this.get("customerId"),
                "discountPrice" : this.get("isMaxStock") ? this.get("model").product.price - this.get("discountedPrice") : 0,
                "coupon" : this.get("isMaxStock") ? " The Deal of the moment . " : "No Coupon Details"
            }

            var uri = new URI("product",this.get("model").product.product_id);

            uri.post(body).then(data=>{

                if (data["message"] === true){

                    this.set("isBuyProduct",false);
                    this.set("isMaxStock",false);
                    this.set("discountedPrice",0);
                    this.set("name","");
                    this.set("mobile","");
                    this.set("address","");

                    let applicationModel = Ember.getOwner(this).lookup("route:application").modelFor("application");
        
                    console.log(" before ",applicationModel);
                    // Notify Ember of the update (this step might be needed depending on your version)
                    Ember.set(applicationModel, 'orders_count', applicationModel.orders_count+1);

                    this.notifyPropertyChange('applicationModel');

                    console.log(" after ",applicationModel);

                    setTimeout(() => {
                        this.set("isLoader",false);
                        this.set("orderSuccess",true);
                    }, 1000); 

                    setTimeout(() => {
                        this.set("orderSuccess",false);
                        this.transitionToRoute("account");
                    }, 2000); 

                }
                else{
                    this.set("orderError",true);
                    setTimeout(() => {
                        this.set("orderError",false);
                    }, 2000); 
                }
            }).catch(error => {
                console.log(error);
                this.afterError(error);
            });
        },


        // adding the product to the cart .
        addToCart(){

            var applicationModel = Ember.getOwner(this).lookup("route:application").modelFor("application");
            var customerId = applicationModel.customer_id;
                        
            var uri = new URI("cart",customerId);

            var cartProduct = this.get("cartProducts.cartProductsList").cartProducts.filter(product=> product.product.product_id === this.get("model").product.product_id )[0];
            console.log(cartProduct," cartProduct");
            if(cartProduct){

                if (cartProduct.count < this.get("model").product.stock){
                    var body = {
                    "cartProductId":cartProduct.cp_id,
                    "count":cartProduct.count+1
                    }
                uri.put(body).then(data => {

                    let cartProducts = this.get("cartProducts.cartProductsList");

                    // Find the cart product by cartProductId and update its count
                    const updatedCartProducts = cartProducts.cartProducts.map(product => {

                        if (product.cp_id === cartProduct.cp_id) {
                            console.log(data["message"] === true ? body.count : body.count-1)
                            return Object.assign({}, product, { count: data["message"] === true ? body.count : body.count-1 });
                        }
                        return product;

                    });

                    Ember.set(cartProducts, 'cartProducts', updatedCartProducts);
                    Ember.set(cartProducts, 'maxStockProducts', data.maxStockProducts);
            
                    // Set the updated cartProducts array
                    this.set("cartProducts.cartProductsList", cartProducts);
            
                    // Refresh cart items .

                    this.cartButtonAnimation()
                }).catch(error => {

                    console.log(error);
                    this.afterError(error);

                
                });  

                }

                else{

                    alert(" The Product "+this.get("model").product.product_id+" reached max Quantity in cart ");

                }
            }
            else{

                uri.post({
                    "productId" : this.get("model").product.product_id
                }).then(data=>{ 
                    if(data["message"] != null){
                       
                        var cartItem = {
                            
                            "product":this.get("model").product,
                            "count":1,
                            "cp_id":data["message"]
 
                        }
                        
                        console.log("before ",this.get("cartProducts.cartProductsList").cartProducts)

                        let cartProducts = this.get("cartProducts.cartProductsList");
                        Ember.set(cartProducts, 'cartProducts', [...(cartProducts.cartProducts|| []),cartItem]);
                        Ember.set(cartProducts, 'maxStockProducts', data.maxStockProducts);
                
                        // Set the updated cartProducts array
                        this.set("cartProducts.cartProductsList", cartProducts);

                        console.log(" after ",this.get("cartProducts.cartProductsList").cartProducts)

                        this.cartButtonAnimation();
                    }
                    else{
    
                        alert(" The Product "+this.get("model").product.product_id+" is out of Stock ");
    
                    }
                }).catch(error => {
                    console.log(error);
                    
                    this.afterError(error);
                   
                      });

            }
           
          
        },

        buyProduct(){
            this.set("isBuyProduct",true);
        },

    }
});
