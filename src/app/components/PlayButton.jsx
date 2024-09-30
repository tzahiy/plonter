import React from "react";
import { Button } from "@mui/joy";
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const PlayButton = (props) => {
  const { listening, isGameStart, onStop, onStart } = props;

  if (!isGameStart) {
    return (
      <Button onClick={onStart} >Start</Button>
    );  
  }

  return (
    <Button
      variant="soft"
      onClick={onStop}
      endDecorator={listening ? <MicIcon color="success"  /> : <MicOffIcon color="error" /> }
    >Stop</Button>
  )
};

export default PlayButton;
