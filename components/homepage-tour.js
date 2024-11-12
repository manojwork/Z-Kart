import Component from '@ember/component';
import Ember from "ember";

export default Component.extend({

    //starting index of the content
    index:0,

    // get the content with help of index .
    getContent: Ember.computed("index","content",function(){
        return this.get("content")[this.get("index")];
    }),

    // moving furture 
    allowNext: Ember.computed("content","index",function(){
        return this.get("content").length -1 !== this.get("index");
    }),


    actions:{

        // index+1;
        next(){
            this.set("index",this.get("index")+1);
        },
        
        // stoping the tour .
        skip(){
            this.get("triggerSkipTour")();
        }


    },

    // content for tour .
    content:[

        {
           "title":" Zoho Kart",
           "content": " The Zoho Kart where All the Tech Gagets are Available .",
           "highlight":"logoH",
           "background":"logoB"
        },
        {
            "title":" Search Bar",
            "content": " Search Any Products That you want to buy .",
            "highlight":"searchH",
            "background":"searchB"
        },
        {
            "title":" Menu Options ",
            "content":" Here You can navigate to any Page in The Application ",
            "highlight":"optionsH",
            "background":"optionsB"
        }

    ]

});
