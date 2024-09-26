import React, { useEffect, useState } from "react";
import { Box, Button, Stack } from "@mui/joy";
import WheelComponent from "./WheelComponent";
import { useSpeech } from "react-text-to-speech";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { SEGMENTS, SEGMENTS_COLORS, WORDS } from "../constants";

const getWidth = () => (Math.min(window.innerWidth, window.innerHeight) / 2) - 36;

const Plonter = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [width, setWidth] = useState(getWidth());
  const [winner, setWinner] = useState("");

  const { start, Text } = useSpeech({ text: winner, lang: "he-IL", autoPlay: true });

  const onFinished = (text) => {
    setWinner(text);
    setIsRunning(false);
  }

  const { spin, component }  = WheelComponent({
    segments: SEGMENTS,
    segColors: SEGMENTS_COLORS,
    onFinished: (winner) => onFinished(winner),
    buttonText: 'סובב',
    isOnlyOnce: false,
    size: width,
    fontSize: `${width / 12}px`,
    upDuration: 100,
    downDuration: 500,
  });

  const handleSpeechSuccess = () => {
    if(!isRunning) {
      spin?.();
      setIsRunning(true);
    }
  };

  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  
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
  
  const updateSize = () => {
    setWidth(getWidth());
  }

  useEffect(() => {
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    }
  }, []);

  return (
    <Box>
      <Stack direction="row" display="flex" gap={2} height={36} alignItems="center" justifyContent="space-between">
        {!listening && <Button onClick={handleStart} >Start</Button> }
        {listening && <Button onClick={handleStop} >Stop</Button> }
        <Box>{transcript}</Box>
      </Stack>
      {component}
    </Box>
  );
};


export default Plonter;
