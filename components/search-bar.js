import Ember from 'ember';

export default Ember.Component.extend({


    actions:{

    searchProducts(event) {
      let content = event.target.value; 

      // Clear the previous timeout if it exists
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout);
      }

      // Set a new timeout for 1 seconds
      this.searchTimeout = setTimeout(() => {
        localStorage.removeItem('localCategories');
        localStorage.removeItem('localLowPrice');
        localStorage.removeItem('localHighPrice');
        localStorage.removeItem('localBrands');
        localStorage.removeItem('localModels');
        this.get('triggerSearchProducts')(content.trim()); // Call the actual search action
      }, 1000); // 1 seconds debounce time
    }


    }

});
