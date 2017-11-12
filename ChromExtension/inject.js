
        // On document load resolve the SDK dependency
        function InitializeAgent(OnCompleteAgent) {
            require(["Speech.Browser.Sdk"], function(SDK) {
                OnCompleteAgent(SDK);
            });
        }
        
        // Setup the recognizer
        function RecognizerStartAgent(SDK, recognitionMode, language, format, subscriptionKey) {
            recognitionMode = SDK.RecognitionMode.Interactive;

            var recognizerConfig = new SDK.RecognizerConfig(
                new SDK.SpeechConfig(
                    new SDK.Context(
                        new SDK.OS(navigator.userAgent, "Browser", null),
                        new SDK.Device("SpeechSample", "SpeechSample", "1.0.00000"))),
                recognitionMode,
                language, // Supported languages are specific to each recognition mode. Refer to docs.
                format); // SDK.SpeechResultFormat.Simple (Options - Simple/Detailed)
            // Alternatively use SDK.CognitiveTokenAuthentication(fetchCallback, fetchOnExpiryCallback) for token auth
            var authentication = new SDK.CognitiveSubscriptionKeyAuthentication(subscriptionKey);
            return SDK.CreateRecognizer(recognizerConfig, authentication);
        
            /*var files = document.getElementById('filePicker').files;
            if (!files.length) {
                return SDK.CreateRecognizer(recognizerConfig, authentication);
            } else {
                return SDK.CreateRecognizerWithFileAudioSource(recognizerConfig, authentication, files[0]);
            }*/
        }
        // Start the recognition
        function RecognizerStartAgent(SDK, recognizer) {
            recognizer.Recognize((event) => {
                /*
                 Alternative syntax for typescript devs.
                 if (event instanceof SDK.RecognitionTriggeredEvent)
                */
                switch (event.Name) {
                    // case "RecognitionTriggeredEvent" :
                    //     UpdateStatus("Initializing");
                    //     break;
                    // case "ListeningStartedEvent" :
                    //     UpdateStatus("Listening");
                    //     break;
                    // case "RecognitionStartedEvent" :
                    //     UpdateStatus("Listening_Recognizing");
                    //     break;
                    case "SpeechStartDetectedEvent" :
                        //UpdateStatus("Listening_DetectedSpeech_Recognizing");
                        console.log(JSON.stringify(event.Result)); // check console for other information in result
                        break;
                    case "SpeechHypothesisEvent" :
                        //UpdateRecognizedHypothesis(event.Result.Text, false);
                        console.log(JSON.stringify(event.Result)); // check console for other information in result
                        break;
                    case "SpeechFragmentEvent" :
                        //UpdateRecognizedHypothesis(event.Result.Text, true);
                        console.log(JSON.stringify(event.Result)); // check console for other information in result
                        break;
                    case "SpeechEndDetectedEvent" :
                        //OnSpeechEndDetected();
                        //UpdateStatus("Processing_Adding_Final_Touches");
                        console.log(JSON.stringify(event.Result)); // check console for other information in result
                        break;
                    case "SpeechSimplePhraseEvent" :
                        UpdateRecognizedPhraseAgent(JSON.stringify(event.Result.DisplayText, null, 3));
                        break;
                    case "SpeechDetailedPhraseEvent" :
                        UpdateRecognizedPhraseAgent(JSON.stringify(event.Result, null, 3));
                        break;
                    case "RecognitionEndedEvent" :
                        OnCompleteAgent();
                        //UpdateStatus("Idle");
                        console.log(JSON.stringify(event)); // Debug information
                        break;
                    default:
                        console.log(JSON.stringify(event)); // Debug information
                }
            })
            .On(() => {
                // The request succeeded. Nothing to do here.
            },
            (error) => {
                console.error(error);
            });
        }
        // Stop the Recognition.
        function RecognizerStopAgent(SDK, recognizer) {
            // recognizer.AudioSource.Detach(audioNodeId) can be also used here. (audioNodeId is part of ListeningStartedEvent)
            recognizer.AudioSource.TurnOff();
        }


        
        var startBtn2/*, stopBtn, hypothesisDiv*/, phraseDiv2/*, statusDiv*/;
        var key, languageOptions, formatOptions, recognitionMode, inputSource/*, filePicker*/;
        var SDK;
        var recognizer;
        var previousSubscriptionKey;
        document.addEventListener("DOMContentLoaded", function () {
            //createBtn = document.getElementById("createBtn");
            startBtn2 = document.getElementById("RecordAgent");
            //stopBtn = document.getElementById("stopBtn");
            phraseDiv2 = document.getElementById("phraseDivAgent");
            //hypothesisDiv = document.getElementById("hypothesisDiv");
            //statusDiv = document.getElementById("statusDiv");
            key = document.getElementById("key");
            languageOptions = document.getElementById("languageOptions");
            formatOptions = document.getElementById("formatOptions");
            inputSource = document.getElementById("inputSource");
            recognitionMode = document.getElementById("recognitionMode");
            //filePicker = document.getElementById('filePicker');
            //languageOptions.addEventListener("change", Setup);
            //formatOptions.addEventListener("change", Setup);
            //recognitionMode.addEventListener("change", Setup);
            startBtn2.addEventListener("click", function () {
                if (key.value == "" || key.value == "YOUR_BING_SPEECH_API_KEY") {
                    alert("Please enter your Bing Speech subscription key!");
                    return;
                }
                if (!recognizer || previousSubscriptionKey != key.value) {
                        previousSubscriptionKey = key.value;
                        Setup();
                    }
                //hypothesisDiv.innerHTML = "";
                phraseDiv2.innerHTML = "";
                RecognizerStartAgent(SDK, recognizer);
                startBtn2.disabled = true;
            });
            key.addEventListener("focus", function () {
               if (key.value == "YOUR_BING_SPEECH_API_KEY") {
                   key.value = "";
               }
            });
            key.addEventListener("focusout", function () {
               if (key.value == "") {
                   key.value = "YOUR_BING_SPEECH_API_KEY";
               }
            });
            InitializeAgent(function (speechSdk) {
                SDK = speechSdk;
                startBtn2.disabled = false;
            });
        });
        function SetupAgent() {
            recognizer = RecognizerStartAgent(SDK, recognitionMode.value, languageOptions.value, SDK.SpeechResultFormat[formatOptions.value], key.value);
        }
        /*function UpdateStatus(status) {
            statusDiv.innerHTML = status;
        }*/
        /*function UpdateRecognizedHypothesis(text, append) {
            if (append) 
                hypothesisDiv.innerHTML += text + " ";
            else 
                hypothesisDiv.innerHTML = text;
            var length = hypothesisDiv.innerHTML.length;
            if (length > 403) {
                hypothesisDiv.innerHTML = "..." + hypothesisDiv.innerHTML.substr(length-400, length);
            }
        }*/
        /*function OnSpeechEndDetected() {
            stopBtn.disabled = true;
        }*/
        function UpdateRecognizedPhraseAgent(json) {
            //hypothesisDiv.innerHTML = "";
            phraseDiv2.innerHTML += json + "\n";
            console.log(phraseDiv2.innerHTML);

            // console.log(window)
        }
        function OnCompleteAgent() {
            startBtn2.disabled = false;
            console.log('Phrase captured', phraseDiv2.innerHTML);
            const iframe = document.getElementsByTagName('iframe')[0];
            iframe.contentWindow
            .postMessage({phraseAgent: phraseDiv2.innerHTML}, '*');
        }

        window.addEventListener("message",function(event){
            console.log(arguments);
            if (event.data.startRecordingAgent) {
               var startBtn2 = document.getElementById("RecordAgent");
                startBtn2.click(); 
            }

        });

