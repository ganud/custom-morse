// The supported morse code mappings.
const morseCode = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  0: "-----",
  "&": ".-...",
  "'": ".----.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-",
  ":": "---...",
  ",": "--..--",
  "=": "-...-",
  "!": "-.-.--",
  ".": ".-.-.-",
  "-": "-....-",
  "%": "----- -..-. -----",
  "+": ".-.-.",
  '"': ".-..-.",
  "?": "..--..",
  "/": "-..-.",
};

// Return the encoded variant if it exists, else return undefined.
function encodeChar(char) {
  return morseCode[char];
}

// Return the decoded variant if it exists, else don't modify
function decodeChar(morse) {
  if (Object.keys(morseCode).find((key) => morseCode[key] === morse)) {
    return Object.keys(morseCode).find((key) => morseCode[key] === morse);
  }
  return morse;
}

// Convert space delimited morse chars into a single word.
function decodeWord(morse) {
  return morse.split(" ").map(decodeChar).join("");
}

export function encodeMorse(text) {
  text = text.toLowerCase();
  let morse = "";
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (encodeChar(char)) {
      morse += encodeChar(char) + " ";
    } else if (char == " ") {
      morse += "/ ";
    } else {
      morse += char + " ";
    }
  }
  return morse;
}

export function decodeMorse(morse) {
  return morse.trim().split("/").map(decodeWord).join(" ");
}

// Replace the original morse with the substitute variants.
export function replaceMorse(morse, dot, dash) {
  let newMorse = "";
  for (let i = 0; i < morse.length; i++) {
    let char = morse[i];
    if (char == ".") {
      newMorse += dot;
    } else if (char == "-") {
      newMorse += dash;
    } else {
      newMorse += char;
    }
  }
  return newMorse;
}

// Replace the dot and dash substitutes with their corresponding Morse code symbols
export function reverseMorse(morse, dot, dash) {
  // Use Intl.Segmenter to handle multi-character emojis
  const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
  const segments = Array.from(segmenter.segment(morse), (s) => s.segment);

  let morseCode = "";

  for (let char of segments) {
    if (char === dot) {
      morseCode += "."; // Replace dot substitute with a dot
    } else if (char === dash) {
      morseCode += "-"; // Replace dash substitute with a dash
    } else {
      morseCode += char; // Ignore anything else
    }
  }

  return morseCode;
}
