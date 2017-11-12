if (typeof POC === "undefined") {
    POC = {};
}

//initialize jquery to use POC.$ so that we know what version of jquery we are running
POC.$ = jQuery.noConflict();

console.log("HACKATHON - running poc, modify dom from here")


var r = setInterval(function(){
    POC.$.each(POC.$('.webchat-conversation-footer'), function( index, value ) {
        console.log("HACKATHON - FOUND CONVERSATION");

        console.log(POC.$(this));

        POC.$(this).append('<button> test </button>')

        clearInterval(r);

        // let conversation = [];
        // POC.$(this).find('.chat-message ').each(function(){
        //     let message = {};
        //     var user = POC.$(this).find('.user-name').text()
        //     message.user = user;
        //     message.text = [];

        //     POC.$(this).find('.message-container ').each(function(){
        //         message.text.push(POC.$(this).text());
        //     });

        //     conversation.push(message);

        // });

        // console.log("HACKATHON", conversation);

    });
}, 1000);
