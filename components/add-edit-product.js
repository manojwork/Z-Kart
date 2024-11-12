import Ember from 'ember';
import URI from '../Classes/URIClass';
 
export default Ember.Component.extend({

    availableCategories: [], // Add as needed
    selectedCategories :[],

    didInsertElement(){

      this.set('availableCategories',['Smartphones', 'Smartwatches', 'Home Appliance', 'Gaming', 'Computer Components', 'Audio', 'Headphones' , 'Laptops', 'Tablets' , 'Cameras' , 'Drones']);

      if(this.get("category")){
        this.set('selectedCategories', this.get("category").split(","));
        this.set('availableCategories', this.availableCategories.filter(category => 
          !this.selectedCategories.includes(category)))
      }
      else{
        this.set('selectedCategories',[]);
      }

    },
    
    actions: { 

        toggleDropdown() {

            console.log(" toggle DropDown action is triggered . ");
            this.toggleProperty('showDropdown');
          },
          selectCategory(category) {
              this.set("categoryError",undefined);
              this.selectedCategories.pushObject(category);
              this.availableCategories.removeObject(category);
              this.set("category",this.selectedCategories.join(","));
              this.set('showDropdown', false);
          },

          removeCategory(category) {
            this.availableCategories.pushObject(category);
            this.selectedCategories.removeObject(category);
            this.set("category",this.selectedCategories.join(","));
          },

        back() {
            this.get("triggerBack")();
        },
    
        onSubmit(){
    
          let name = this.get('name');
            let brand = this.get('brand');
            let model = this.get('productModel');
            let category = this.get('selectedCategories').join(",");
            let stock = this.get('stock');
            let price = this.get('price');
            let image = this.get('image') ? this.get('image') : "https://ih1.redbubble.net/image.533910704.5853/fposter,small,wall_texture,product,750x1000.u3.webp" ;
    
            var body={
                name,
                brand,
                model,
                category,
                stock,
                price,
                image
            }


            var uri ;
           if(this.get('selectedCategories.length') > 0){
            if (this.get("isEdit") ===  true){

              uri = new URI("product",this.get("productId"));
              uri.put(body).then(data =>{

                  if (data["message"] === true){

                      body["product_id"]= this.get("productId") ;  
                                          
                      this.get("triggerUpdate")(body);
                  }
                  else{
                      this.set("error"," try again ! ");
                  }

              }).catch(error => {
                  this.get("triggerAfterError")(error);
              });
              
          }
          else{

              uri = new URI("product");
              uri.post(body).then(data =>{
                  if (data["message"] != "null"){
                      body["product_id"] = data["message"];
                      this.get("triggerAddedProduct")(body);
                  
                  }
                  else{
                      this.set("error"," try again ! ");
                  }
                  
              }).catch(error => {
                  console.log(error);
                  this.get("triggerAfterError")(error);
              });
              }

           }else{
            this.set("categoryError"," categories are not selected ");
           }
        },
    
        validateStock(event){
    
          if ((!/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) ) {
              event.preventDefault();
          }
          },
    
        storeStock(event){
    
            this.set("stock",event.target.value);
    
          },
    
        validatePrice(event){
    
          if ((!/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) ) {
                event.preventDefault();
            }
        },
    
        storePrice(event){
    
          this.set("price",event.target.value);
    
        },
    
      }

});
