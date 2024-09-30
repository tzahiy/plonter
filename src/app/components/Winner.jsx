import React from "react";
import { Sheet, Typography } from "@mui/joy";
import { WINNER_ICONS } from "../constants";


const Winner = (props) => {
  const { winner } = props;

  if(!winner) {
    return null;
  }

  const winnerObj =  WINNER_ICONS[winner];

  const Icon = winnerObj?.icon

  return (
    <Sheet
      variant="plain"
      sx={{
        position: "absolute",
        borderRadius: 8,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        top: "50%",
        left: "50%",
        p: 4,
        pl: 5,
        pr: 5,
        svg: {
          [`& #${winnerObj.id}`]: {
            fill: winnerObj.color,
            stroke: winnerObj.color,
          }
        }
      }}
    >
      <Typography level="h2">{winner}</Typography>
      {Icon && (<Icon />) }
    </Sheet>
  );
};

export default Winner;
