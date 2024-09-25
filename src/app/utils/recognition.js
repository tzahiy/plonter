import { useEffect, useRef, useState } from "react";


const useRecognition = ({targets, onSuccess}) => {
  const recognitionRef = useRef(new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)());
  const isShouldStartRef = useRef(false);
  const isListeningRef = useRef(false);
  const [transcript, setTranscript] = useState("")  

  const start = () => {
    
    if (!isListeningRef.current) {
      console.log("start");
      recognitionRef?.current?.start();
      isListeningRef.current = true;  
    }
    isShouldStartRef.current = true;
    
  };

  const stop = () => {
    console.log("stop");
    recognitionRef?.current?.stop();
    isListeningRef.current = false;
    isShouldStartRef.current = false;
  };

  const handleStart = () => {
    console.log("Listening...");
  };

  const handleResult = (event) => {
    const trans = event.results[0][0].transcript;
    console.log({ trans });

    setTranscript(trans);
    trans.split(" ").some((t) => targets.some((target) => target === t )) && onSuccess?.(trans);
  };

  const handleEnd = () => {
    console.log("handleEnd - End Voice Input", isShouldStartRef.current);
    isListeningRef.current = false;
    isShouldStartRef.current && start();
  };

  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    // recognition.continuous = true;
    // recognition.interimResults = true;
    recognition.lang = "he-IL";
    
    recognition.onstart = handleStart;
    recognition.onresult = handleResult;
    recognition.onend = handleEnd;
    recognition.speechend = () => { console.log( "speechend" )};

    recognitionRef.current = recognition;
  }, []);
 
  
  return { start, stop, transcript };
};

export default useRecognition;
