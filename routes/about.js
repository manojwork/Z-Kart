import Ember from 'ember';

export default Ember.Route.extend({

// about data .
model(){
  return [
    {   
        "align": 1,
        "image": "https://c8.alamy.com/comp/2J3NEEE/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-and-password-safety-measures-2J3NEEE.jpg",
        "title": "User-Friendly Authentication",
        "body": "Experience seamless sign-up and login with our user-friendly authentication system. Customers are guided through the process, ensuring security with encrypted passwords. Existing users are prompted to log in, making navigation intuitive and hassle-free."
    },
    {
        "image": "https://static.vecteezy.com/system/resources/previews/014/435/776/non_2x/best-deal-banner-best-deal-badge-icon-discount-price-offer-modern-illustration-vector.jpg",
        "title": "Deal of The Moment",
        "body": "Don't miss out on our special discounts! The item with the highest stock is featured as the Deal of the Moment, giving you an automatic 10% discount. This deal refreshes with every purchase, ensuring you always get the best price."
    },
    {
        "align": 1,
        "image": "https://img.freepik.com/premium-vector/free-delivery-icon-fast-food-service-scooter-sign_8071-38373.jpg",
        "title": "Free Delivery on Orders",
        "body": "Enjoy free delivery on all orders over a specified amount! We ensure your gadgets reach you safely and swiftly without any additional cost, enhancing your shopping experience."
    },
    {
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEHFu1IN6nxgpeOu3TpXvTXsQtx85qUBsDaw&s",
        "title": "Exclusive Discount Codes",
        "body": "Unlock exclusive discounts as you shop! Customers who exceed a certain spending threshold receive unique discount codes between 20% - 30% for their next purchases. These codes add extra value to your shopping experience."
    }
]
}

});
