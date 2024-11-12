import Ember from 'ember';

export function orderCoupon(params/*, hash*/) {

  if(params[0].length < 6){
    return " No Discount Is Applied To This Order ."
  }
  return params[0];
}

export default Ember.Helper.helper(orderCoupon);
