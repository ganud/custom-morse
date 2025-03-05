import { useState } from "react";
import {
  encodeMorse,
  decodeMorseWithCase,
  replaceMorse,
  reverseMorse,
} from "../../morse";

export default function Input() {
  const [input, setInput] = useState("");
  const [isDecrypt, setisDecrypt] = useState(false);
  const [mapping, setMapping] = useState({
    dot: ".",
    dash: "-",
  });

  let output = "";
  if (isDecrypt) {
    output = decodeMorseWithCase(
      reverseMorse(input, mapping.dot, mapping.dash)
    );
  } else {
    output = replaceMorse(encodeMorse(input), mapping.dot, mapping.dash);
  }

  const toggleDecrypt = () => {
    setisDecrypt(!isDecrypt);
    setInput(output);
  };
  return (
    <div className="flex flex-col grow px-10 py-10 gap-4">
      {/* Toggle for switching input and output */}
      <div className="flex justify-between">
        <div role="tablist" class="tabs tabs-lifted">
          <a
            role="tab"
            class={isDecrypt ? "tab" : "tab tab-active"}
            onClick={toggleDecrypt}
          >
            Switch
          </a>
        </div>
        {/* The copy output button */}
        <button
          className="btn max-w-xs btn-ghost  btn-outline"
          onClick={() => {
            navigator.clipboard.writeText(output);
          }}
        >
          Copy Output
        </button>
      </div>
      {/* container for input and output */}
      <div className="flex flex-col sm:flex-row justify-center gap-2 grow">
        <textarea
          class="textarea grow resize-none"
          placeholder={
            isDecrypt ? "Enter text to decode" : "Enter text to encode"
          }
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></textarea>
        {/* output textarea */}
        <textarea
          class="textarea grow resize-none"
          value={output}
          placeholder={isDecrypt ? "Decoded output" : "Encoded output"}
        ></textarea>
      </div>
      {/* input for key */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter dot substitte"
          class="input input-bordered w-full max-w-xs"
          value={mapping.dot}
          onChange={(e) => {
            // Essentially sets maxLength to 1, but also supports emojis.
            const inputValue = e.target.value;
            const firstCharacter = [...inputValue][0] || "";
            setMapping((prevMapping) => ({
              ...prevMapping,
              dot: firstCharacter,
            }));
          }}
        />
        <input
          type="text"
          placeholder="Enter dash substitute"
          class="input input-bordered w-full max-w-xs"
          value={mapping.dash}
          onChange={(e) => {
            const inputValue = e.target.value;
            const firstCharacter = [...inputValue][0] || "";
            setMapping((prevMapping) => ({
              ...prevMapping,
              dash: firstCharacter,
            }));
          }}
        />
      </div>
    </div>
  );
}
