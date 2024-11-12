import Ember from 'ember';



export default Ember.Component.extend({

  actions: {

    // enable the menu option in mobile view .
    showList : function(){
        this.toggleProperty("isMenuVisible");
    }
  }

});
