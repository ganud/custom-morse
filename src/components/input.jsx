import { useState } from "react";
import {
  encodeMorse,
  decodeMorse,
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
    console.log(reverseMorse(input, mapping.dot, mapping.dash));
    output = decodeMorse(reverseMorse(input, mapping.dot, mapping.dash));
    // output = decodeMorse(input);
  } else {
    output = replaceMorse(encodeMorse(input), mapping.dot, mapping.dash);
    // output = encodeMorse(input);
  }

  const toggleDecrypt = () => {
    setisDecrypt(!isDecrypt);
    setInput("");
  };

  return (
    <div className="flex flex-col grow px-10 py-10 gap-4">
      {/* encrypt decrypt navigation tabs */}
      <div className="flex justify-between">
        <div role="tablist" class="tabs tabs-lifted">
          <a
            id="encryptTab"
            role="tab"
            class={isDecrypt ? "tab" : "tab tab-active"}
            onClick={toggleDecrypt}
          >
            Encrypt
          </a>
          <a
            id="decryptTab"
            role="tab"
            class={isDecrypt ? "tab tab-active" : "tab"}
            onClick={toggleDecrypt}
          >
            Decrypt
          </a>
        </div>
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
            isDecrypt ? "Enter text to decrypt" : "Enter text to encrypt"
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
          placeholder={isDecrypt ? "Decrypted output" : "Encrypted output"}
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
            setMapping((prevMapping) => ({
              ...prevMapping,
              dot: e.target.value,
            }));
          }}
        />
        <input
          type="text"
          placeholder="Enter dash substitute"
          class="input input-bordered w-full max-w-xs"
          value={mapping.dash}
          onChange={(e) => {
            setMapping((prevMapping) => ({
              ...prevMapping,
              dash: e.target.value,
            }));
          }}
        />
      </div>
    </div>
  );
}
