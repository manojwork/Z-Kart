import Ember from 'ember';
import URI from "../Classes/URIClass";

export default Ember.Controller.extend({

    // cart products Service injection . 
    cartProductsService:Ember.inject.service("cart-products"),


    cartItems(){
        var data = this.get("cartProductsService.cartProductsList").cartProducts;
        console.log(" cart product data . ",data);
        var maxStockProduct = this.get("cartProductsService.cartProductsList").maxStockProducts;

        if (data === undefined){ 
                this.get("cartProductsService").cartProducts().then(data=>{
                data = this.get("cartProductsService.cartProductsList").cartProducts;
                maxStockProduct = this.get("cartProductsService.cartProductsList").maxStockProducts;

                this.cartProcess(data,maxStockProduct)
            });
        }
        else{
            this.cartProcess(data,maxStockProduct)
        }
        
    },

    cartProcess(data, maxStockProduct){

        console.log(this.get("cartProductsService.cartProductsList")," The cart data .");
        console.log(" started executing .");
        
        let totalPrice = data.reduce((accumulator, product) => {
            return accumulator +( product.product.price * product.count);
          }, 0);

        this.set("totalPrice",totalPrice); 

        var isCheckOut = true;

          data.forEach(cartProduct => {
            
            isCheckOut = isCheckOut && cartProduct.count <= cartProduct.product.stock;
          
          });

          this.set("isCheckOut",isCheckOut);
          
          
          var similarProducts = data.filter(cartProduct =>
            maxStockProduct.some(maxStockProduct => cartProduct.product.product_id === maxStockProduct.product_id)
          );

          if(similarProducts.length > 0){
            var coupon = " "; // Discount Details .
            var discouponPrice = 0 ; //Discount Price .

            similarProducts.forEach(cartProduct=>{
                // we will split the coupon String Discount Details by using ',' .
                coupon += "Deal Of The Moment Product Id :"+cartProduct.product.product_id+" \ndiscount : 10%  discount price per unit : "+parseInt( cartProduct.product.price * 0.1)+" Rs ,";
                discouponPrice += cartProduct.count * parseInt( cartProduct.product.price * 0.1) // cartProduct.count * ( 10% discount of Product) 
          })
          // initialization of the Discount Details and Discount Price .
          this.set("coupon", coupon);
          // Deal of the Moment Discount Price .
          this.set("discountPrice",discouponPrice);

          }
          else{
            this.set("coupon","");
            this.set("discountPrice",0);
          }

          this.set("discountPriceCode",0);
          this.set("couponCode","");
          this.set("userCoupon",false);
          this.set('selectedOption',"remove"); // default selected option in coupon codes .

    },

   
    discount: Ember.computed("discountPrice", "discountPriceCode","totalPrice",function() {
        if (this.get("discountPrice") !== undefined && this.get("discountPriceCode") !== undefined) {
            return parseInt(this.get("discountPrice") + this.get("discountPriceCode"));
        } else if (this.get("discountPriceCode") !== undefined) {
            return parseInt(this.get("discountPriceCode"));
        } else if (this.get("discountPrice") !== undefined) {
            return parseInt(this.get("discountPrice"));
        }
        return undefined;
    }),
    
    displayTotal: Ember.computed("totalPrice", "discount", "discountPrice", "discountPriceCode", function() {
        // Total Price Without Discount After Adding All Discount Prices.
        return this.get("totalPrice") - this.get("discount");
    }),


    // display coupon details .
    displayCoupon:Ember.computed("coupon","couponCode",function(){

        //NOTE ABOUT THE COMPUTED PROPERTY

            // logic is as same as the displayTotal computed property.
            // here we are trying to display the Discount Details .

        if (this.get("coupon") !== undefined && this.get("couponCode") !== undefined){
            this.set("couponInfo",this.get("coupon")+this.get("couponCode"));
        }
        else if (this.get("couponCode") !== undefined){
            this.set("couponInfo",this.get("couponCode"));
        }
        else if (this.get("coupon") !== undefined ){
            this.set("couponInfo",this.get("coupon"));

        }
        else{
            this.set("couponInfo","")

        }
        //     Spiting the Discount Details using ','
        return this.get("couponInfo").split(",") ;
    
    }),

    // to keep track of the application model .
    applicationModel: Ember.computed(function() {
        return Ember.getOwner(this).lookup('route:application').modelFor('application');
    }),

    // enable customer coupon .
    customerCoupon:Ember.computed("applicationModel.used","applicationModel.coupon","applicationModel.discountprice","applicationModel.orders_count",function(){

        // Checking if user coupon has activated or not .
        // used  === 0 => coupon code is unused.
        // orders count > 2 means orders count = 3 then we can apply the coupon for 4rd order .
        // orders count < 6 means we can apply until this 6th order . only once we can apply .

        var used = this.get("applicationModel.used");

        var orders_count=this.get("applicationModel.orders_count");

        if (used === 0 && orders_count >2 && orders_count < 6){

            var userCoupon = {
                "coupon":this.get("applicationModel.coupon"),
                "discountPrice":this.get("applicationModel.discountprice"),
            }

            return userCoupon;

        }

        return undefined;

    }),

    // enable 20,000 PRICE coupon .
    totalPriceCoupon:Ember.computed("totalPrice","applicationModel.discountprice",function(){

        if(this.get("totalPrice") >= 20000){
            if (this.get("customerCoupon") === undefined){
                 return {
                    "coupon":"20000PRICE",
                    "discountPrice":this.get("applicationModel.discountprice"),
                }
            }else{
                // user coupon is enabled then 40% is removed from the discountPrice .
                 return {
                    "coupon":"20000PRICE",
                    "discountPrice":this.get("applicationModel.discountprice")-(this.get("applicationModel.discountprice")*0.4),
                }

            }
                           
        }
        return undefined;
    }),

    actions:{
    
        // update the cart product count .
        updateCount(cartProductId){

            var cartProducts = this.get("cartProductsService.cartProductsList");

            // Find the cart product by cartProductId and remove it .
            const updatedCartProduct = cartProducts.cartProducts.filter(product=> product.cp_id === cartProductId)[0];

            if(updatedCartProduct.count < updatedCartProduct.product.stock && parseInt(event.target.value) > 0){

                var uri = new URI("cart",this.get("applicationModel.customer_id"));
                var body = {
                    "cartProductId":cartProductId,
                    "count":event.target.value == "" ? 1 : event.target.value,
                }
                uri.put(body).then(data => {

                    // Find the cart product by cartProductId and update its count
                    const updatedCartProducts = cartProducts.cartProducts.map(product => {

                        if (product.cp_id === cartProductId) {
                            console.log(data["message"] === true ? body.count : body.count-1)
                            return Object.assign({}, product, { count: data["message"] === true ? body.count : body.count-1 });
                        }
                        return product;

                    });

                    Ember.set(cartProducts, 'maxStockProducts', data.maxStockProducts);
                    Ember.set(cartProducts, 'cartProducts', updatedCartProducts);
            
                    // Set the updated cartProducts array
                    this.set("cartProductsService.cartProductsList", cartProducts);
            
                    // Refresh cart items .
                    this.cartItems();

                }).catch(error => {

                    console.log(error);
                    let status = error.status; // Get status code
                    let message = encodeURIComponent(error.statusText); // Get status text
                    // Navigate to the error route with code and message
                    this.transitionToRoute('errorpage', status.toString(), message); 
                
                });  
            }
            else{

                const updatedCartProducts = cartProducts.cartProducts.map(product => {

                    if (product.cp_id === cartProductId ) {
                        return Object.assign({}, product, { count: event.target.value == "" || event.target.value == 0  ? 1 : event.target.value-1 });
                    }
                    return product;

                });

                Ember.set(cartProducts, 'cartProducts', updatedCartProducts);

            }
        },

        // delete the cart product pop up .
        deleteProduct(cartproductId){
            this.set("deleteCartProductId",cartproductId);
            this.set("alterPopup",true);
        },


        // delete the cart product after confirmation .
        deleteProductConfirm(cartProductId){

            this.set("isBuyProduct",false);
            this.set("alterPopup",false);

            var uri =  new URI("cart",this.get("applicationModel.customer_id"),cartProductId);

                uri.delete().then(data => {

                    this.get("cartProductsService").removeCartProduct(this.get("cartProductsService.cartProductsList").cartProducts.filter(product=> product.cp_id === cartProductId)[0].product.product_id);


                    let cartProducts = this.get("cartProductsService.cartProductsList");

                    // Find the cart product by cartProductId and remove it .
                    const updatedCartProducts = cartProducts.cartProducts.filter(product=> product.cp_id != cartProductId)

                    Ember.set(cartProducts, 'maxStockProducts', data.maxStockProducts);
                    Ember.set(cartProducts, 'cartProducts', updatedCartProducts);
            
                    // Set the updated cartProducts array
                    this.set("cartProductsService.cartProductsList", cartProducts);
                    // updation.
                    this.cartItems();


                }).catch(error => {
                    console.log(error);
                    let status = error.status; // Get status code
                    let message = encodeURIComponent(error.statusText); // Get status text
                    this.transitionToRoute('errorpage', status.toString(), message);

                });
        },

        // checking out .
        checkOut(name,mobile,address){

            this.set("isBuyProduct",false);
            this.set("isLoader",true);

            var uri = new  URI("cart",this.get("applicationModel.customer_id"));

            uri.post({
                "coupon":this.get("couponInfo") || " No Coupon Details ",
                "discountPrice":parseInt(this.get("discount")),
                "name":name,
                "mobile":mobile,
                "address":address,
                "userCoupon": this.get("userCoupon")
                
            }).then(data => {
                if(data["message"] === true){

                    console.log(" userCoupon :", this.get("userCoupon"));
                    
                    let applicationModel = Ember.getOwner(this).lookup("route:application").modelFor("application");
        
                    console.log(" before ",applicationModel);
                    // Notify Ember of the update (this step might be needed depending on your version)

                    let cartProducts = this.get("cartProductsService.cartProductsList");

                    Ember.set(applicationModel, 'orders_count', applicationModel.orders_count+1);
                    Ember.set(applicationModel,"discountprice",data["discountPrice"]);

                    if(this.get("userCoupon") === true){
                        Ember.set(applicationModel,'used',1);
                    }
                    this.notifyPropertyChange('applicationModel');

                    console.log(" after ",applicationModel);

                    setTimeout(() => {
                        this.set("isLoader",false);
                        this.set("orderSuccess",true);
                    }, 1000);
                    
                    setTimeout(() => {
                        this.set("orderSuccess",false);
                        this.transitionToRoute("account");
                        Ember.set(cartProducts, 'cartProducts', undefined);
                        this.cartItems();
                    }, 2000);
                }
                else{
                    setTimeout(() => {
                        this.set("orderError",false);
                    }, 2000);                }
                this.set("isBuyProduct",false);
                
            }).catch(error => {
                console.log(error);
                this.set("isLoader",false);
                this.set("isBuyProduct",false);

                let status = error.status; // Get status code
                let message = encodeURIComponent(error.statusText); // Get status text
          
                // Navigate to the error route with code and message
                this.transitionToRoute('errorpage', status.toString(), message);    });
        },

        // add coupon 
        addCoupon(event){
            console.log(" triggring .",event.target.value);
            var name = event.target.value;
            if (name === "user"){
                this.set("discountPriceCode",(this.get("customerCoupon").discountPrice * 0.01 ) * this.get("totalPrice"));
                this.set("couponCode","\nCoupon Code : "+this.get("customerCoupon").coupon+" \ndiscount :"+this.get("customerCoupon").discountPrice+"% ,");
                this.set("userCoupon",true);
            }
            else if(name === "maxprice"){
                this.set("discountPriceCode",(this.get("totalPriceCoupon").discountPrice * 0.01 ) * this.get("totalPrice"));
                this.set("couponCode","\nCoupon Code : "+this.get("totalPriceCoupon").coupon+" \ndiscount :"+this.get("totalPriceCoupon").discountPrice+"% ,");
                this.set("userCoupon",false);
            }
            else if (name === "remove"){
                this.set("discountPriceCode",0);
                this.set("couponCode","");
                this.set("userCoupon",false);
            }
            // this.notifyPropertyChange('discount');
        },

        back(){
            this.set("isBuyProduct",false);
            this.set("alterPopup",false);
        },

        buyProduct(){
            this.set("isBuyProduct",true);
        },

    }

});
