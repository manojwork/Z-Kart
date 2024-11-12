import Ember from 'ember';
import URI from '../Classes/URIClass';

export default Ember.Component.extend({

 
    actions:{  

        editProduct(product){

            this.set("name",product.name);
            this.set("model",product.model);
            this.set("brand",product.brand);
            this.set("category",product.category);
            this.set("image",product.image);
            this.set("stock",product.stock);
            this.set("price",product.price);
            this.set("productId",product.product_id);
            this.set("isEditProduct",true);

        },

        // calling the parent action .
        back(){

            console.log(" Triggerd Update Products Back.");
            this.set("alertPopup",false);
            this.set("isEditProduct",false);

        },

        updateProduct(body){

            console.log(" Triggerd Update Products .");
            this.set("isEditProduct",false);
            this.get("triggerUpdateProduct")(body);

        },

        // delete pop up enabling .
        deleteProduct(productId){
            this.set("deleteProductId",productId);
            this.set("alertPopup",true);
        },

        // deleting the product .
        deleteProductConfirm(productId){

            this.set("alertPopup",false);
            var uri = new URI("product",productId);

                    uri.delete().then(data=>{
                        if (data["message"] === true){
                            this.get("triggerReloadProducts")(productId);
                        }
                    }).catch(error => {
                        this.get("triggerAfterError")(error);
                    });
                        
        },
    }

});
