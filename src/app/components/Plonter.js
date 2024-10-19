import React, { useEffect, useRef, useState } from "react";
import { Box, Stack } from "@mui/joy";
import WheelComponent from "./WheelComponent";
import { useSpeech } from "react-text-to-speech";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { SEGMENTS, SEGMENTS_COLORS, WORDS } from "../constants";
import PlayButton from "./PlayButton";
import Winner from "./Winner";
import NoSleep from "nosleep.js"

const getWidth = () => (Math.min(window.innerWidth, window.innerHeight) / 2) - 36 - 8;

const Plonter = () => {
  const [isGameStart, setIsGameStart] = useState(false);

  const [isRunning, setIsRunning] = useState(false);
  const [width, setWidth] = useState(getWidth());
  const [winner, setWinner] = useState("");
  const [lastWinner, setLastWinner] = useState("");

  const [noSleep] = useState(new NoSleep())

  const timeOutRef = useRef();

  const startRecognition = () => {
    console.log("start");
    SpeechRecognition.startListening({ continuous: true, language: "he-IL" });
  };

  const stopRecognition = () => {
    console.log("stop");
    SpeechRecognition.stopListening();
  };

  // eslint-disable-next-line no-unused-vars
  const { start, Text } = useSpeech({ text: winner, lang: "he-IL", autoPlay: true,
    onStop: (event) => {
      timeOutRef.current && clearTimeout(timeOutRef.current);
      timeOutRef.current = undefined;
      setWinner("");
    },
    onError: (error) => {
      console.error(error);
    },
    onStart: (event) => {
      console.log("Speech Started:");
    },
  });

  const onFinished = (text) => {
    setWinner(text);
    setIsRunning(false);
    timeOutRef.current = setTimeout(() => {
      timeOutRef.current = undefined;
      setWinner("");
    }, 10 * 1000);
  }

  const { spin, component }  = WheelComponent({
    segments: SEGMENTS,
    segColors: SEGMENTS_COLORS,
    onFinished: (winner) => {
      onFinished(winner)
    },
    buttonText: "סובב",
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
      setLastWinner("");
      stopRecognition();
    }
  };

  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  
  useEffect(() => {
    if(WORDS.some((target) => transcript.includes(target))) {
      handleSpeechSuccess?.();
      resetTranscript();
    } 
  }, [transcript])

  const updateSize = () => {
    setWidth(getWidth());
  }

  const handleStartGame = () => {
    setIsGameStart(true);
  };

  const handleStopGame = () => {
    setIsGameStart(false);
  };

  useEffect(() => {
    isGameStart ? startRecognition() : stopRecognition();

  }, [isGameStart])
  
  useEffect(() => {
    winner && setLastWinner(winner);
    !winner && isGameStart && startRecognition();
  }, [winner])
  
  useEffect(() => {
    window.addEventListener("resize", updateSize);
    noSleep?.enable();

    return () => {
      window.removeEventListener("resize", updateSize);
      noSleep?.disable();
    }
  }, []);

  return (
    <Box>
      <Stack direction="row" display="flex" gap={2} height={36} alignItems="center" sx={{ pt: 1, pb: 0, pl: 2, pr: 2 }} >
        <PlayButton
          listening={listening}
          isGameStart={isGameStart}
          onStart={handleStartGame}
          onStop={handleStopGame}
        />
        <Box flex={1} textAlign={"right"}>{transcript}</Box>
      </Stack>
      {component}
      <Winner winner={lastWinner} />
    </Box>
  );
};

export default Plonter;
