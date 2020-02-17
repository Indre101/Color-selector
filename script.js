const colorInput = document.querySelector("input");
const hexColorCode = document.querySelector(".hexColorCode");
const rgbColor = document.querySelector(".rgbColor");

colorInput.addEventListener("input", getValue)

function getValue() {
  let colorCode = (event.target).value
  hexColorCode.textContent = "HEX: " + colorCode

  let styleC = window.getComputedStyle(colorInput);
  let a = styleC.getPropertyValue("backgrund-color")
  rgbColor.textContent = "RGB: " + hextToRGB(colorCode).join(", ")

}

function hextToRGB(hexColorValue) {
  let arr = [hexColorValue.substring(1, 3), hexColorValue.substring(3, 5), hexColorValue.substring(5, 7)]
  const stingifyArr = arr.map(e => parseInt(e, 16));
  return stingifyArr;

}

// let r = 255;
// let g = 255;
// let b = 255;

// let h, s, l;

// const min = Math.min(r, g, b);
// const max = Math.max(r, g, b);

// if (max === min) {
//   h = 0;
// } else
// if (max === r) {
//   h = 60 * (0 + (g - b) / (max - min));
// } else
// if (max === g) {
//   h = 60 * (2 + (b - r) / (max - min));
// } else
// if (max === b) {
//   h = 60 * (4 + (r - g) / (max - min));
// }

// if (h < 0) {
//   h = h + 360;
// }

// l = (min + max) / 2;

// if (max === 0 || min === 1) {
//   s = 0;
// } else {
//   s = (max - l) / (Math.min(l, 1 - l));
// }
// // multiply s and l by 100 to get the value in percent, rather than [0,1]
// s *= 100;
// l *= 100;

// console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing