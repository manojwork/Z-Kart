import Ember from 'ember';

export default Ember.Component.extend({

    // toggling the properties .
    toggleProperties(param){
        this.setProperties({
            upi: false,
            card: false,
            cash: false,
            [param]: true
          });
    },

    // to allow card payment if all conditions are ok .
    isAllowCard: Ember.computed(
        'isValidCardNo', 'isValidCardCvv', 'isValidCardDate',
        function () {
            console.log("Card No : " + this.get('isValidCardNo'));
            console.log("Card CVV : " + this.get('isValidCardCvv'));
            console.log("Card Date : " + this.get('isValidCardDate'));
          return (
            this.get('isValidCardNo') &&
            this.get('isValidCardCvv') &&
            this.get('isValidCardDate')
          );
        }
      ),

    actions:{

        // trigerring parent action .
        back(){
            this.get('triggerBack')();
        },

        buy(){
            var name = this.get("name");
            var mobile = this.get("mobile");
            var address = this.get("address");

            // UPI payment .
            if (this.get("upi")){
                this.set("stopUpi",true);
                setTimeout(() => {
                    this.set("stopUpi",false);
                    this.get('triggerBuy')(name,mobile,address); // Calling parent action .
                }, 4000);

            // Cash On Delivery .
            }else if(this.get("cash")){
                this.get('triggerBuy')(name,mobile,address); // Calling parent action .
            
            // Card Payment .
            }else if (this.get("card")){
                this.get('triggerBuy')(name,mobile,address); // Calling parent action .
            }

        },

        upi(){
            this.toggleProperties("upi");
        },

        card(){
            this.toggleProperties("card"); 
        },

        cash(){
            this.toggleProperties("cash");
        },

        // UPI validation .
        validateUpi(){
                const upiPattern = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
               var value = event.target.value;
                if (upiPattern.test(value)) {
                  this.set("isValidUpi",true);
                  this.set("errorUpi","");
                } else {
                    this.set("isValidUpi",false);
                    this.set("errorUpi","invalid UPI ID ");               
                 }
              
        },

        // Card Number validation .
        validateCardNumber(event) {
            let value = event.target.value.split(" ").slice(0,4).join(""); // Remove non-numeric characters
        
            const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
        
            this.set("cardNumber", formattedValue);

            console.log(value.length);
        
            if (value.length > 15 || (!/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) ) {
                event.preventDefault();

            } 

            if (value.length === 16){
                this.set("errorCard", "");
                this.set("isValidCardNo", true);
            }else{
                this.set("isValidCardNo", false);
            }

        },

        // Card CVV number validation .
        validateCardCvv(event){

            let value = event.target.value;

            if (value.length > 2 || (!/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) ) {
                event.preventDefault();
            }
            
            if(value.length === 3){
                this.set("errorCard", "");
                this.set("isValidCardCvv", true);
            }else{
                this.set("isValidCardCvv", false);
            }

        },

        // OTP validation .
        validateOtp(event){

            let value = event.target.value;

            if ( value.length > 5 || (!/^[0-9]$/.test(event.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) ) {
                event.preventDefault();
            }

        },

        // validating expire date 
        validateExpiryDate(event) {
            let value = event.target.value;
            if (
                (!/^[0-9]$/.test(event.key) && 
                !["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Delete"].includes(event.key)) ||
                value.length >= 5
            ) {
                event.preventDefault();
                return;
            }
        
            if (value.length === 2 && event.key !== "Backspace") {
                event.target.value = value + "/";
            }
    
        },
        validateDate(event) {
            let value = event.target.value;
            value = value.split("/");
        
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed in JavaScript
        
            if (value.length === 2) {
                const month = parseInt(value[0], 10);
                const year = parseInt("20" + value[1], 10); // Assuming the year is entered as two digits
        
                // Check if the month is valid and if the year is either the current year or later
                const isValidMonth = month > 0 && month <= 12;
                const isValidYear = year > currentYear || (year === currentYear && month >= currentMonth);
        
                this.set("isValidCardDate", isValidMonth && isValidYear);
            } else {
                this.set("isValidCardDate", false);
            }
        }        

    }
});
