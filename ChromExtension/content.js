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


var message = "";


// var rr = setInterval(function(){
//      var phrase = j.each(j("#phraseDiv"), function( index, value ) {

//     	// console.log(POC.$(this))
// 		var div = j(this);
// 		console.log(div);
// 		return div
// 		// console.log( POC.$(this).find("#phraseDiv").val().length);

//         // clearInterval(rr);	
// 		// div.addEventListener('change',function(){
// 		// 		console.log('inside change event');
// 		// 		// console.log(POC.$(this).val());
// 		// 		message = j(this).val();
// 		// 	})


//         // clearInterval(rr);
        
//     });
//     if( phrase.val() != undefined ){
// 	message = phrase.val();
// 	console.log(phrase.val());

//     }
//     // clearInterval(rr);

// }, 10000);

	 window.addEventListener("message",function(event){
	 	if (event.data.phrase) {
        	console.log('got message from parent frame', arguments);
        	const textArea = document.getElementsByTagName('textarea')[0];
        	textArea.value = event.data.phrase;
        	//j(textArea).trigger('keydown')
        }

    });


console.log(message);

// var r2 = setInterval(function(){
// 	var input = j.each(j('#wc0-w2-input'), function( index, value ) {
//         console.log("HACKATHON - FOUND CONVERSATION");

//         return j(this);
//         // console.log($('#phraseDiv', window.parent));
//         // // window.parent
//         // console.log(message);
//         // console.log( j(this) );
//         // // console.log(leng);
//         // j(this).val(message);
//         // console.log(j(this));        
//         // clearInterval(r2);
//         // return j(this).val(message).length;

//     });
//     console.log(message, message.length);
//     // input[0].val(message)

//     // console.log(input[0]);
//     // if( message.length > 0 ){
// 	// message = input.val();
// 	input.val(message);

//     }
//  	// console.log(le);

// }, 1000);


// console.log(POC.$('#wc0-w2-input'))