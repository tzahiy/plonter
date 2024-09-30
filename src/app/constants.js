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
