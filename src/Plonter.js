import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/joy";
import WheelComponent from "./WheelComponent";
import speechText from "./speech";
import useRecognition from "./recognition";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";


const WORDS = [
  "מסובב",
  "סובב",
  "לסובב",
  "נסובב",
  "מסתובב",
  "לדגדג",
  "נקסט",
  "ספין",
]
const LEG_LEFT = "רגל שמאל"
const LEG_RIGHT = "רגל ימין"
const HAND_LEFT = "יד שמאל"
const HAND_RIGHT = "יד ימין"

const COLOR_RED = "אדום";
const COLOR_YALOW = "צהוב";
const COLOR_GREEN = "ירוק";
const COLOR_BLUE = "כחול";


const segments = [
  `${LEG_LEFT} ${COLOR_RED}`,
  `${LEG_LEFT} ${COLOR_YALOW}`,
  `${LEG_LEFT} ${COLOR_GREEN}`,
  `${LEG_LEFT} ${COLOR_BLUE}`,
  
  `${LEG_RIGHT} ${COLOR_RED}`,
  `${LEG_RIGHT} ${COLOR_YALOW}`,
  `${LEG_RIGHT} ${COLOR_GREEN}`,
  `${LEG_RIGHT} ${COLOR_BLUE}`,
  
  `${HAND_LEFT} ${COLOR_RED}`,
  `${HAND_LEFT} ${COLOR_YALOW}`,
  `${HAND_LEFT} ${COLOR_GREEN}`,
  `${HAND_LEFT} ${COLOR_BLUE}`,

  `${HAND_RIGHT} ${COLOR_RED}`,
  `${HAND_RIGHT} ${COLOR_YALOW}`,
  `${HAND_RIGHT} ${COLOR_GREEN}`,
  `${HAND_RIGHT} ${COLOR_BLUE}`,
];

const COLORS = {
  RED: "#EE4040",
  YALOW: "#F0CF50",
  GREEN: "#34A24F",
  BLUE: "#3DA5E0",

}


const segColors = [
  COLORS.RED,
  COLORS.YALOW,
  COLORS.GREEN,
  COLORS.BLUE,

  COLORS.RED,
  COLORS.YALOW,
  COLORS.GREEN,
  COLORS.BLUE,

  COLORS.RED,
  COLORS.YALOW,
  COLORS.GREEN,
  COLORS.BLUE,

  COLORS.RED,
  COLORS.YALOW,
  COLORS.GREEN,
  COLORS.BLUE,
]

const Plonter = (props) => {

  const [isRunning, setIsRunning] = useState(false);

  const onFinished = (winner) => {
    speechText(winner);
    setIsRunning(false);

    console.log(winner)
  }

  const { spin, component }  = WheelComponent({
    segments:segments,
    segColors: segColors,
    onFinished: (winner) => onFinished(winner),
    primaryColor: 'black',
    contrastColor: 'white',
    buttonText: 'Spin',
    isOnlyOnce: false,
    size: 200,
    upDuration: 100,
    downDuration: 500,
    fontFamily: 'Arial',
  });


  const handleSpeechSuccess = () => {
    if(!isRunning) {
      spin?.();
      setIsRunning(true);
    }
  };

    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

  // const { start, transcript } = useRecognition({targets: WORDS, onSuccess: handleSpeechSuccess });
  
  useEffect(() => {
    if(transcript.split(" ").some((t) => WORDS.some((target) => target === t ))) {
      handleSpeechSuccess?.();
      resetTranscript();
    } 
  }, [transcript])



const handleStart = () => {
  SpeechRecognition.startListening({ continuous: true, language: "he-IL" });
};

const handleStop = () => {
  SpeechRecognition.stopListening();
};

  useEffect(() => {
    // start?.();
  }, []);
  
  return (
    <Box>
      <Box display="flex" gap={2}>
        {!listening && <Button onClick={handleStart} >Start</Button> }
        {listening && <Button onClick={handleStop} >Stop</Button> }
        {/* <Button onClick={start} >start</Button> */}
        {/* <Button onClick={SpeechRecognition.startListening} >start</Button> */}
        <Box>{transcript}</Box>
      </Box>

      {component}
    </Box>
  );
};


export default Plonter;
