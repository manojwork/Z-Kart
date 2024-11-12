import Controller from '@ember/controller';
import Ember from 'ember';
import URI from "../Classes/URIClass"

export default Controller.extend({

  // allowing the tour .
  allowTour:Ember.computed("done",function(){
    var applicationModel = Ember.getOwner(this).lookup("route:application").modelFor("application")
    if ( this.get("done") !== undefined  || applicationModel === undefined){
      return false;
    }
    return applicationModel.log_first >= 1 ;
    }),

  // caterories content .  
  categories: Ember.computed(function(){

    return [
          {
            "name":"Smartphones & Tablets",
            "image": "https://fliponn.ae/wp-content/uploads/2024/02/mobile.jpg",
            "value":"smartphone"

          },
          {
            "name": "Laptops & Accessories",
            "image": "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/page/category/laptop/xps/fy24-family-launch/prod-312204-apjc-laptop-xps-16-9640-14-9440-13-9340-800x620-pl-gr.png?fmt=png-alpha&wid=800&hei=620",
            "value": "laptop"
          },
          {
            "name": "Home Appliances",
            "image":"https://www.ecoredux.com/wp-content/uploads/home-appliance.jpg",
            "value":"Home Appliance"
          },
          {
            "name":"Audio & Headphones",
            "image":"https://media.licdn.com/dms/image/v2/D5612AQELOuIYM83W1w/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1710946583440?e=2147483647&v=beta&t=YnL2ENrcoriziKrmCFI0Ek02dFSigt5s42-_QzLkLgw",
            "value":"audio"
          },
          {
            "name":"Gaming Consoles & Accessories",
            "image":"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRB9XchBo3M4R893Ri05p2o6Tuyi5UvMthgJjHq_PbMv84NF8eAra7Z032TohZaveGBuWOVQX8QG9sYswo3Aga8VRTE96fsAki7dz7ePbeDHIoj8MOqyKEUnw&usqp=CAE",
            "value":"gaming"

          },
          {
            "name":"Cameras & Drones",
            "image":"https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTwFXBCBgND6F73qjiKvK5O07LHFmisg69mHj1UhUt22OMYYmeec9WZbKyk6Ret3huym7rHkjaYbqEKI0UO-YJeJ80JK-_2Ke6yY8qJV34hIUoQFlXiEgIv&usqp=CAE",
            "value":"cameras"

          },
          {
            "name":"Smartwatches",
            "image":"https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1360/2400x1600/filters:focal(1020x680:1021x681):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/24259063/226428_Garmin_Venu_Sq_2_AKrales_0049.jpg",
            "value":"smartwatch"

          },
          {
            "name":"Computer Components",
            "image":"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTpt48lS6gkY8ndMUy2l8caQBlOCHtGkpvdiT4Y068rRPCMJ8RY3XB7cptAQ7SJQEefrWRI3-1TEeswP4EHoJ307Ti7qAv9ovf-3qfKK-cX4TuMCHpdKSUd&usqp=CAE",
            "value":"components"
          },
    ]
  }),


  actions: {

    // start the tour . 
    startTour() {
      this.set('showTour', false);
    },

    // skip the tour .
    skipTour(){
      var uri = new URI("customer",this.get("model").customer_id);

      uri.put({ "logFirst":0 }).then(data=>{
        if(data["message"] === true){
            this.set("done",true);
        }

       }).catch(error => {
       let status = error.status; // Get status code
       let message = encodeURIComponent(error.statusText); // Get status text
       this.transitionToRoute('errorpage', status, message);    });

    }
  },
});
