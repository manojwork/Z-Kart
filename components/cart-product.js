import Ember from 'ember';

export default Ember.Component.extend({

    actions:{ 

        // To Update The Count Of Cart product Triggering Parent Action
        updateCount(param){
            this.get("triggerUpdateCount")(param);
        },

        // To Update The Count Of Cart product Triggering Parent Action
        deleteProduct(id){
            this.get("triggerDeleteProduct")(id);
        }
        
    }
});
