import Ember from 'ember';

export default Ember.Service.extend({

        // To Check The Password Requriements .
        checkPasswordComplexity: function(password) {

            const lowerCasePattern = /(?=(.*[a-z].*)){2}/; // At least 2 lowercase letters
            const upperCasePattern = /(?=(.*[A-Z].*)){2}/; // At least 2 uppercase letters
            const numberPattern = /(?=(.*\d.*)){2}/; // At least 2 numbers
            const symbolPattern = /(?=(.*[\W_].*)){0,}/; // Accepts symbols, but not mandatory
            const lengthRequirement = password.length >= 6; // Minimum length of 6
        
            return (
                lowerCasePattern.test(password) &&
                upperCasePattern.test(password) &&
                numberPattern.test(password) &&
                lengthRequirement &&
                symbolPattern.test(password) // Check for symbols, if present
            );
        },
        
});
