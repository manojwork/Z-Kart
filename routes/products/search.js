import Ember from 'ember';
import URI from '../../Classes/URIClass';

var uri = new URI("search");

const categorySynonyms = {
  audio: ["sound", "music", "earphones", "headphones"],
  components: ["parts", "hardware", "pieces"],
  gaming: ["video games", "games","game console", "console", "playstation", "xbox"],
  "Home Appliance": ["appliances", "household", "kitchen", "electronic devices"],
  Laptops: ["notebook", "computer", "laptop"],
  Smartphones: ["phones", "mobile", "cellphone"], 
  Audio: ["sound", "stereo"],
  Cameras: ["camera", "photography", "lens"],
  Televisions: ["tv", "television", "screen"],
  smartwatch: ["watch", "wearable", "smart watch"]
};

export default Ember.Route.extend({
   filterStore: Ember.inject.service("filter-store"),

   model(param) {
      let content = param.searchContent.toLowerCase();

      // Find the category by checking if any synonym includes the input content
      let category = Object.keys(categorySynonyms).find(key => 
         key.toLowerCase().includes(content) ||
         categorySynonyms[key].some(synonym => content.includes(synonym))
      ) || content;

      console.log(" categorry is ",category);
      return uri.get({
         "searchContext": category,
      }).then(data => {
         return data;
      }).catch(error => {
         let status = error.status;
         let message = encodeURIComponent(error.statusText);
         this.transitionTo('errorpage', status, message);
      });
   },

   setupController(controller, model) {
      this._super(controller, model);
      this.get("filterStore").clear();
      
      controller.set("products", model);
      controller.set("filteredProducts", []);
   }
});
