import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('signup');
  this.route('changepassword');
  this.route('signin');
  this.route('about');
  this.route('account' ,function() {
    this.route('products',{path:"/:order_id"});
  });
  this.route('error', { path: '*path' });
  this.route('admin', );
  this.route('products', function() {
    this.route('index',{path:"/"})
    this.route('search',{path:'/:searchContent'});
    this.route('product',{path:'/product/:product_id'});
  });
  this.route('Cart',{path:"cart"});
  this.route('errorpage' ,{ path: '/errorpage/:code/:description' });
});

export default Router;
