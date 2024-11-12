import Ember from 'ember';

export default Ember.Route.extend({

    model(params) {
        return {
          code: params.code,
          description: decodeURIComponent(params.description),
        };
      },
      
});
