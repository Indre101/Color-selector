const HTML = {}
window.addEventListener("DOMContentLoaded", init)

function init() {
  HTML.colorInput = document.querySelector(".colorInput");
  HTML.hexColorCode = document.querySelector(".mainColor .hexColorCode");
  HTML.mainColorBlock = document.querySelector(".mainColor .color");
  HTML.rgbColor = document.querySelector(".mainColor .rgbColor");
  HTML.hslColor = document.querySelector(".mainColor .hslColor");
  HTML.colorInput.addEventListener("input", displayColorValues);
}


function displayColorValues() {
  let colorCode = (event.target).value
  HTML.hexColorCode.textContent = "HEX: " + colorCode
  HTML.rgbColor.textContent = "RGB: " + hextToRGB(colorCode).join(", ")
  HTML.hslColor.textContent = "HSL: " + getHSlColor(hextToRGB(colorCode));
  HTML.mainColorBlock.style.backgroundColor = colorCode;
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




function HSLToRGB(h, s, l) {

  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs((h / 60) % 2 - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return "rgb(" + r + "," + g + "," + b + ")";
}

// hsl(283, 100%, 50%)


function RGBToHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}

console.log(RGBToHex(100, 120, 155));