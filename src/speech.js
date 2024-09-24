
const speechText = (value, rate = 1) => {
  window.speechSynthesis.cancel();
  console.log({ value });
  const msg = new SpeechSynthesisUtterance(value);
  msg.rate = rate;
  msg.volume = 0.6;
  msg.lang = "he-IL";
  //  msg.onend = (event) => { };
  window.speechSynthesis.speak(msg);
};


export default speechText;