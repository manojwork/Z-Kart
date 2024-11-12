import Ember from 'ember';

export default Ember.Service.extend({
  localCategories: undefined,
  localModels: undefined,
  localBrands: undefined,
  localHighPrice: undefined,
  localLowPrice: undefined,
  localFilteredProducts:undefined,

  globalCategories: undefined,
  globalModels: undefined,
  globalBrands: undefined,
  globalHighPrice: undefined,
  globalLowPrice: undefined,
  globalFilteredProducts:undefined,

  // Clears all local variables by setting them to undefined
  clear() {
    this.set('localCategories', undefined);
    this.set('localModels', undefined);
    this.set('localBrands', undefined);
    this.set('localHighPrice', undefined);
    this.set('localLowPrice', undefined);
    this.set('localFilteredProducts',undefined);
  },

  // Updates the local variables with the provided parameters
  addLocal(categories, brands, models, highPrice, lowPrice,filterProducts) {
    this.set('localCategories', categories);
    this.set('localModels', models);
    this.set('localBrands', brands);
    this.set('localHighPrice', highPrice);
    this.set('localLowPrice', lowPrice);
    this.set('localFilteredProducts',filterProducts);
  },

  // Updates the global variables with the provided parameters
  addGlobal(categories, brands, models, highPrice, lowPrice,filterProducts) {
    this.set('globalCategories', categories);
    this.set('globalModels', models);
    this.set('globalBrands', brands);
    this.set('globalHighPrice', highPrice);
    this.set('globalLowPrice', lowPrice);
    this.set('globalFilteredProducts',filterProducts);
  }

});
