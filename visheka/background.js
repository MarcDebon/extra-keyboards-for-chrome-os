/*
Copyright 2018 The Extra Keyboards for Chrome OS Authors.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var contextID = 0;

var lut = {
  "KeyQ": [ "q", "q" ],
  "KeyW": [ "ω", "ω" ],
  "KeyE": [ "ɛ", "ɛ̃" ],
  "KeyR": [ "p", "p̥" ],
  "KeyT": [ "t", "t" ],
  "KeyY": [ "y", "ỹ" ],
  "KeyU": [ "u", "ũ" ],
  "KeyI": [ "i", "ĩ" ],
  "KeyO": [ "o", "õ" ],
  "KeyP": [ "π", "π" ],
  "KeyA": [ "a", "ã" ],
  "KeyS": [ "ς", "ς̥" ],
  "KeyD": [ "δ", "δ" ],
  "KeyF": [ "φ", "φ" ],
  "KeyG": [ "г", "г̃" ],
  "KeyH": [ "x", "x" ],
  "KeyJ": [ "j", "j" ],
  "KeyK": [ "k", "k̃" ],
  "KeyL": [ "λ", "λ" ],
  "KeyZ": [ "z", "z̥" ],
  "KeyX": [ "χ", "χ̃" ],
  "KeyC": [ "c", "c̥" ],
  "KeyV": [ "β", "β" ],
  "KeyB": [ "б", "б" ],
  "KeyN": [ "η", "η" ],
  "KeyM": [ "μ", "μ" ],
};
    

chrome.input.ime.onFocus.addListener(
    function(context) {
      contextID = context.contextID;
    }
);

chrome.input.ime.onBlur.addListener(() => {
  contextID = 0;
})


// TODO: Add support for virtual keyboard input.

chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      
      if (keyData.type == "keydown") {
        if (lut[keyData.code]) {
          let shifted = keyData.shiftKey ^ keyData.altKey;
          let emit = lut[keyData.code][shifted];

          if (emit != null && contextID != 0) {
            chrome.input.ime.commitText({
              "contextID": contextID,
              "text": emit,
            }, () => {
              if (chrome.runtime.lastError) {
                console.error('Error committing text:', chrome.runtime.lastError);
                return;
              }
            });
          }
          handled = true;
        }
      }
      return handled;
});
