if (typeof POC === "undefined") {
    POC = {};
}

//initialize jquery to use POC.$ so that we know what version of jquery we are running
var j = jQuery.noConflict();
var value = "";
console.log("HACKATHON - running poc, modify dom from here")

let dom;


var r = setInterval(function(){
    j.each(j('.webchat-conversation-footer'), function( index, value ) {
        console.log("HACKATHON - FOUND CONVERSATION");

        dom = j(this);

        j(this).append('<button id="test"> test </button>');
        
        var but = j(this).find('#test')[0]
        console.log(but);
        window.thebutton = but;
        //clearInterval(r);

        but.addEventListener('click',function(){
        	window.parent.postMessage({ startRecording: true }, '*');
        });
        clearInterval(r);       
    });
}, 1000);



	 window.addEventListener("message",function(event){
	 	if (event.data.phrase) {
        	console.log('got message from parent frame', arguments);
        	const textArea = document.getElementsByTagName('textarea')[0];
        	textArea.value = event.data.phrase;
        	//j(textArea).trigger('keydown')
        }

    });


