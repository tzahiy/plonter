import { ReactComponent as HandsIcon } from "../assets/hands.svg";
import { ReactComponent as LegsIcon } from "../assets/leg.svg";

const LEG_LEFT = "רגל שמאל"
const LEG_RIGHT = "רגל ימין"
const HAND_LEFT = "יד שמאל"
const HAND_RIGHT = "יד ימין"

const COLOR_RED = "אדום";
const COLOR_YALOW = "צהוב";
const COLOR_GREEN = "ירוק";
const COLOR_BLUE = "כחול";

const COLORS = {
  RED: "#EE4040",
  YALOW: "#F0CF50",
  GREEN: "#34A24F",
  BLUE: "#3DA5E0",
};

export const WORDS = [
  "מסובב",
  "סובב",
  "לסובב",
  "נסובב",
  "מסתובב",
  "לדגדג",
  "נקסט",
  "ספין",
  "תסובב",
];

export const SEGMENTS = [
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

export const SEGMENTS_COLORS = [
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
];


export const WINNER_ICONS = {
  [SEGMENTS[0]]: {icon: LegsIcon, id: "L", color: COLORS.RED },
  [SEGMENTS[1]]: {icon: LegsIcon, id: "L", color: COLORS.YALOW },
  [SEGMENTS[2]]: {icon: LegsIcon, id: "L", color: COLORS.GREEN },
  [SEGMENTS[3]]: {icon: LegsIcon, id: "L", color: COLORS.BLUE },
  
  [SEGMENTS[4]]: {icon: LegsIcon, id: "R", color: COLORS.RED },
  [SEGMENTS[5]]: {icon: LegsIcon, id: "R", color: COLORS.YALOW },
  [SEGMENTS[6]]: {icon: LegsIcon, id: "R", color: COLORS.GREEN },
  [SEGMENTS[7]]: {icon: LegsIcon, id: "R", color: COLORS.BLUE },
  
  [SEGMENTS[8]]: {icon: HandsIcon, id: "L", color: COLORS.RED },
  [SEGMENTS[9]]: {icon: HandsIcon, id: "L", color: COLORS.YALOW },
  [SEGMENTS[10]]: {icon: HandsIcon, id: "L", color: COLORS.GREEN },
  [SEGMENTS[11]]: {icon: HandsIcon, id: "L", color: COLORS.BLUE },
  
  [SEGMENTS[12]]: {icon: HandsIcon, id: "R", color: COLORS.RED },
  [SEGMENTS[13]]: {icon: HandsIcon, id: "R", color: COLORS.YALOW },
  [SEGMENTS[14]]: {icon: HandsIcon, id: "R", color: COLORS.GREEN },
  [SEGMENTS[15]]: {icon: HandsIcon, id: "R", color: COLORS.BLUE },
};
