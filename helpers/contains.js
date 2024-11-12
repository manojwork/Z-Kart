import Ember from 'ember';

export function contains([selectedCategories, category]) {

  return selectedCategories.includes(category.toLowerCase());
  
}

export default Ember.Helper.helper(contains);
