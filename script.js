const HTML = {};
window.addEventListener("DOMContentLoaded", init);

function init() {
  HTML.colorTemplate = document.querySelector(".colorSwatchTemplate").content;
  HTML.colorSwatchesContainer = document.querySelector(".colorBlocks");
  HTML.colorInput = document.querySelector(".colorInput");
  HTML.colorInput.addEventListener("input", getColorInputValue);
  createColorSwatches();
}

function getColorInputValue() {
  let colorCode = event.target.value;
  assignMainColorValues(colorCode);
}

const ColorSwatch = {
  rgb: {},
  hsl: {},
  hex: ""
};

const colorSwatches = [];

function createColorSwatches() {
  for (let index = 0; index < 5; index++) {
    const colorSwatch = Object.create(ColorSwatch);
    colorSwatches.push(colorSwatch);
  }
  displayColorSwatches();
}

function displayColorSwatches() {
  colorSwatches.forEach(e => {
    const colorSwatchCln = HTML.colorTemplate.cloneNode(true);
    HTML.colorSwatchesContainer.appendChild(colorSwatchCln);
  });
}

function assignMainColorValues(colorCode) {
  colorSwatches.forEach(colorSwatch => {
    if (colorSwatches.indexOf(colorSwatch) === 2) {
      colorSwatch.hex = colorCode;
      colorSwatch.rgb = hextToRGB(colorSwatch.hex);
      colorSwatch.hsl = rgbToHsl(
        colorSwatch.rgb.r,
        colorSwatch.rgb.g,
        colorSwatch.rgb.b
      );
      changeToAnalogousValues();
    }
  });
}

function displayMainColorValues(colorSwatch) {
  const hexColorCodes = document.querySelectorAll(".hexColorCode");
  const rgbColorCodes = document.querySelectorAll(".rgbColor");
  const hslColorCodes = document.querySelectorAll(".hslColor");
  const colorBlock = document.querySelectorAll(".color");
  hexColorCodes[
    colorSwatches.indexOf(colorSwatch)
  ].textContent = `HEX: ${colorSwatch.hex}`;
  rgbColorCodes[
    colorSwatches.indexOf(colorSwatch)
  ].textContent = `RGb: (${colorSwatch.rgb.r}, ${colorSwatch.rgb.g}, ${colorSwatch.rgb.b})`;
  hslColorCodes[
    colorSwatches.indexOf(colorSwatch)
  ].textContent = `HSL: (${colorSwatch.hsl.h}, ${colorSwatch.hsl.s}%, ${colorSwatch.hsl.l}%)`;
  colorBlock[colorSwatches.indexOf(colorSwatch)].style.backgroundColor =
    colorSwatch.hex;
}

function changeToAnalogousValues() {
  let value = colorSwatches[2].hsl.h;
  colorSwatches[2].hsl.h = value;
  colorSwatches.forEach(colorSwatch => {
    if (colorSwatches.indexOf(colorSwatch) < 2) {
      colorSwatch.hsl.h = value -= 16;
    } else if (colorSwatches.indexOf(colorSwatch) > 2) {
      value = colorSwatches[2].hsl.h += 16;
      colorSwatch.hsl.h = value;
    }
    colorSwatch.hsl.s = colorSwatches[2].hsl.s;
    colorSwatch.hsl.l = colorSwatches[2].hsl.l;

    colorSwatch.rgb = HSLToRGB(
      colorSwatch.hsl.h,
      colorSwatch.hsl.s,
      colorSwatch.hsl.l
    );

    colorSwatch.hex = RGBToHex(
      colorSwatch.rgb.r,
      colorSwatch.rgb.g,
      colorSwatch.rgb.b
    );
    displayMainColorValues(colorSwatch);
  });
}

function getHSlColor(colorCode) {
  r = hextToRGB(colorCode).r;
  g = hextToRGB(colorCode).g;
  b = hextToRGB(colorCode).b;
  hsl = rgbToHsl(r, g, b);
  return hsl;
}

function hextToRGB(colorCode) {
  let hexColorSeparated = [
    colorCode.substring(1, 3),
    colorCode.substring(3, 5),
    colorCode.substring(5, 7)
  ];

  const convertedArrToRGbValues = hexColorSeparated.map(characterPair =>
    parseInt(characterPair, 16)
  );

  const rgb = {};
  rgb.r = convertedArrToRGbValues[0];
  rgb.g = convertedArrToRGbValues[1];
  rgb.b = convertedArrToRGbValues[2];
  return rgb;
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
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  h = parseInt(h);
  s = parseInt(s);
  l = parseInt(l);
  hsl = {
    h,
    s,
    l
  };

  return hsl;
}

let newArr = [];

function HSLToRGB(h, s, l) {
  // Must be fractions of 1

  if (h < 0) {
    h *= -1;
  }
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
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

  const rgb = {};
  rgb.r = r;
  rgb.g = g;
  rgb.b = b;
  return rgb;
}

// hsl(283, 100%, 50%)

function RGBToHex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return "#" + r + g + b;
}
