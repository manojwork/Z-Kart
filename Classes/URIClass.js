import Ember from 'ember';

 // To Build the Endpoint Using String Builder .
class StringBuilder {
    constructor() {
        this.parts = [];

    }
                                       
    append(part) {
        if (part) {
            this.parts.push(part); 
        }
        return this;
    }

    toString() {
        return this.parts.join('/');
    }
}

export default class URI {
    constructor(source, ...sourceIds) {

        // Resource Names Maping ..
        this.sourceNames={
            "customer":"customers",
            "product":"products",
            "cart":"carts",          
            "order":"orders",
            "search":"searchs",
            "sessionData":"sessionData",
            "logout":"logout"
        }

        // Thumb Uri Endpoint .
        this.thumbURI = "http://localhost:8080/Z-Kart/api/v1";

        // getting the Real Source Name .
        this.source = this.sourceNames[source];
        this.isSourceId = false;

        if (sourceIds.length === 1) {

            // Signle Id ..
            this.sourceId = sourceIds[0];
            this.isSourceId = true;

        } else if (sourceIds.length > 1) {

            // Multiple Ids Joining using '/' .
            this.sourceId = sourceIds.join('/');
            this.isSourceId = true;

        } else {

            // No source Id .
            this.sourceId = '';
        }
    }

    buildEndpoint() {

        // Create an instance of StringBuilder
        const builder = new StringBuilder(); 

        builder.append(this.thumbURI) // Add thumbURI
               .append(this.source); // Add source

        if (this.isSourceId) {
            builder.append(this.sourceId); // Add sourceId if it exists
        }

        return builder.toString(); // Return the constructed URI
    }

    // Get Method
    get(...body) {
        const method = "GET";
        return this.makePromise(this.buildEndpoint(), method, body[0]); // Call buildEndpoint
    }

    // Post Method
    post(...body) {
        const method = "POST";
        return this.makePromise(this.buildEndpoint(), method, body[0]); // Call buildEndpoint
    }

    // Delete Method
    delete(...body) {
        const method = "DELETE";
        return this.makePromise(this.buildEndpoint(), method, body[0]); // Call buildEndpoint
    }

    // Put Method
    put(...body) {
        const method = "PUT";
        return this.makePromise(this.buildEndpoint(), method, body[0]); // Call buildEndpoint
    }
    
    
    // Returning 
    makePromise(uriEndpoint, method, body) {
        return new Ember.RSVP.Promise((resolve, reject) => {
          Ember.$.ajax({
            url: uriEndpoint,
            method: method,
            data: Ember.$.param(body), 
            xhrFields: {
              withCredentials: true 
            },

            dataType: 'json',
            success: (data) => {
              resolve(data);
            },
            error: (jqXHR) => {
              reject(jqXHR);
            }
          });
        });
      }

}
