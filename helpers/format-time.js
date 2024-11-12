import Ember from 'ember';

export function formatTime(params/*, hash*/) {
 var date = params[0].split(" ");
return date[0];
} 

export default Ember.Helper.helper(formatTime);
