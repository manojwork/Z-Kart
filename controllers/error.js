import Ember from 'ember';

export default Ember.Controller.extend({

    actions:{
        goToIndex(){
            this.transitionToRoute("index");

            setTimeout(()=>{
                window.location.reload();
            },1)
        }
    }
});
