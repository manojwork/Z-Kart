import Ember from 'ember';

export default Ember.Component.extend({

  // banners content .
  banners: [
    {
      src: "https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/Electronics-Page-Banner.jpg?context=bWFzdGVyfHJvb3R8MjEyMDcxM3xpbWFnZS9qcGVnfGFESXpMMmhqT0M4eE5qYzVORGN3TkRJME9EZzJNaTlGYkdWamRISnZibWxqY3kxUVlXZGxMVUpoYm01bGNpNXFjR2N8MGVmNWMxNGJlMTE5MDRmMGQwMDIxODg5ZWU4YTM0MTZkNTEzMzRlNzcxNzgxOWZlZjM4YjIzOWYyZGVkNzJjOA",
      alt: "Electronics Banner",
      linkto: "smartphone",
      class:"max"
    },
    {
      src: "https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/samsung-tv-d-series-web.jpg?context=bWFzdGVyfGltYWdlc3wxODg5NDA1fGltYWdlL2pwZWd8YURSbEwyZzVaUzh5TmpnME56VTFNRE0zTXpreE9DOXpZVzF6ZFc1bkxYUjJMV1F0YzJWeWFXVnpMWGRsWWk1cWNHY3w5ZjNiYzEzZDcxZDMxODU5ZDVmNTlmNzRlY2NkYWNlMzczOTRlZmIxMGZmMDYxY2JmZDdkNjhmZjU1YjlkNWZh",
      alt: "Samsung",
      linkto: "samsung",
      class:"max"
    },
    {
      src: "https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/Macbook-air-13-Shop-now-banner-web.jpg?context=bWFzdGVyfGltYWdlc3wxNTEwNDN8aW1hZ2UvanBlZ3xhR015TDJnME5pOHlOalEwTnprME5UUXdNRE0xTUM5TllXTmliMjlyTFdGcGNpMHhNeTFUYUc5d0xXNXZkeTFpWVc1dVpYSXRkMlZpTG1wd1p3fDlkNzNlYTI3YmVlM2E4NWMwYjNmODVkMGJmMDY4MzE1ZjZkZWQ0YThiMzI4MjIxNDAyNmRlYTFmOWI1MGUwOTY",
      alt: "Apple",
      linkto: "apple",
      class:"minscreen",
        },
  ],

  currentSlide: 0,
  autoSlideInterval: null,

  didInsertElement() {
    this._super(...arguments);
    this.startAutoSlide(); // Start the automatic slide when the component is inserted
  },

  willDestroyElement() {
    this._super(...arguments);
    this.stopAutoSlide(); // Stop the timer when the component is destroyed
  },

  startAutoSlide() {
    this.set(
      'autoSlideInterval',
      Ember.run.later(this, this.nextSlide, 4000) // Slide every 2 seconds
    );
  },

  stopAutoSlide() {
    Ember.run.cancel(this.autoSlideInterval); // Cancel the scheduled timer
  },

  nextSlide() {
    this.incrementProperty('currentSlide');
    if (this.currentSlide >= this.banners.length) {
      this.set('currentSlide', 0);
    }
    this.startAutoSlide(); // Restart the timer after each slide
  },

  prevSlide() {
    this.decrementProperty('currentSlide');
    if (this.currentSlide < 0) {
      this.set('currentSlide', this.banners.length - 1);
    }
    this.startAutoSlide(); // Restart the timer after manual slide change
  },

  actions: {
    nextSlide() {
      this.stopAutoSlide(); // Stop the timer to avoid conflicts
      this.nextSlide(); // Call the next slide function manually
    },
    prevSlide() {
      this.stopAutoSlide(); // Stop the timer to avoid conflicts
      this.prevSlide(); // Call the previous slide function manually
    },
  },
});
