// Uses the browser's built-in text-to-speech. No files or network needed.
export function say(text) {
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.8;   // slow for little ears
    u.pitch = 1.3;  // friendly
    // u.lang = 'en-IN'; // uncomment to prefer an Indian English voice
    window.speechSynthesis.speak(u);
  } catch (e) { /* speech not supported */ }
}

export const sayLetter = (L) => say(`${L.label}. ${L.label} says ${L.sound}. ${L.label} is for ${L.word}`);
export const sayNumber = (N) => say(`${N.n}. ${N.word}`);
