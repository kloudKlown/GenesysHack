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


        POC.$(this).append('<button id="test"> test </button>');
        
        var but = POC.$(this).find('#test')[0]
        console.log(but);
        window.thebutton = but;
        //clearInterval(r);

        but.addEventListener('click',function(){
        	window.parent.postMessage('post message from Ext', '*');
        });

        clearInterval(r);
        
    });


}, 1000);


        window.addEventListener("message",function(){
            console.log(arguments);
            // var startBtn = document.getElementById("Record");
            // startBtn.click();            
        });