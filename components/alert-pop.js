import Ember from 'ember';

export default Ember.Component.extend({

    actions:{
        // Triggering The Back parent action
        back(){
            this.get("triggerBack")();
        },
        
        // Triggering The Confrim parent action
        confirm(id){
            this.get("triggerConfrim")(id);
        }
    }
});
