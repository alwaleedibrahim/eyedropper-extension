const messagesElement = document.getElementById("messages");
const resultHEXElement = document.querySelector("#result-HEX span");
const resultRGBElement = document.querySelector("#result-RGB span");

const eyeDropperHandler = () => {
  const colorElement = document.getElementById("color");

  if (!window.EyeDropper) {
    messagesElement.textContent = "Your browser doesn't support eye dropper!";
    return;
  }

  const eyeDropper = new EyeDropper();

  eyeDropper
    .open()
    .then((result) => {
      console.log(result);
      resultHEXElement.textContent = result.sRGBHex.toUpperCase();
      resultRGBElement.textContent = HEXToRGB(result.sRGBHex);
      colorElement.style.backgroundColor = result.sRGBHex;
    })
    .catch((e) => {
      console.log(e);
    });
};

const HEXToRGB = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r},${g},${b})`;
};

const showCopyMessage = () => {
  const originalContent = messagesElement.textContent;
  messagesElement.textContent = "Copied to clipboard"
  setTimeout(()=> {
    messagesElement.textContent = originalContent
  }, 1500)
};

const clipboardHandler = (element) => {
  const content = element.textContent.trim();
  navigator.clipboard.writeText(content);
  showCopyMessage();
};

document
  .getElementById("start-button")
  .addEventListener("click", eyeDropperHandler);

document.querySelector("#result-HEX").addEventListener("click", () => {
  clipboardHandler(resultHEXElement);
});
document.querySelector("#result-RGB").addEventListener("click", () => {
  clipboardHandler(resultRGBElement);
});
