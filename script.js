const HTML = {}
window.addEventListener("DOMContentLoaded", init)

function init() {
  HTML.colorInput = document.querySelector("input");
  HTML.hexColorCode = document.querySelector(".hexColorCode");
  HTML.rgbColor = document.querySelector(".rgbColor");
  HTML.hslColor = document.querySelector(".hslColor");
  HTML.colorInput.addEventListener("input", displayColorValues);

}


function displayColorValues() {
  let colorCode = (event.target).value
  HTML.hexColorCode.textContent = "HEX: " + colorCode
  HTML.rgbColor.textContent = "RGB: " + hextToRGB(colorCode).join(", ")
  HTML.hslColor.textContent = "HSL: " + getHSlColor(hextToRGB(colorCode));
}

function getHSlColor(convertedArrToRGbValues) {
  r = convertedArrToRGbValues[0];
  g = convertedArrToRGbValues[1];
  b = convertedArrToRGbValues[2];
  return rgbToHsl(r, g, b)
}


function hextToRGB(hexColorValue) {
  let hexColorSeparated = [hexColorValue.substring(1, 3), hexColorValue.substring(3, 5), hexColorValue.substring(5, 7)]
  const convertedArrToRGbValues = hexColorSeparated.map(characterPair => parseInt(characterPair, 16));
  return convertedArrToRGbValues;
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;


  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else
  if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else
  if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else
  if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / (Math.min(l, 1 - l));
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  return `(${parseInt(h)}, ${parseInt(s)}%, ${parseInt(l)}% )`;

}