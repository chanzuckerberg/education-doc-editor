'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://www.npmjs.com/package/color
// https://stackoverflow.com/questions/3849115/image-palette-reduction
// https://stackoverflow.com/questions/7650703/web-safe-colour-generator-or-algorithm
// https://stackoverflow.com/questions/19782975/convert-rgb-color-to-the-nearest-color-in-palette-web-safe-color
// TODO: Use binary search when palleteColors is sorted.

function getNearestColor(color, palleteColors) {
  var hue = color.hue();
  var lightness = color.lightness();
  var saturationv = color.saturationv();

  var colorStr = color.string();
  var hueDelta = 1000;
  var lightnessDelta = 1000;
  var saturationvDelta = 1000;
  var result = null;
  for (var ii = 0, jj = palleteColors.length; ii < jj; ii++) {
    var curr = palleteColors[ii];
    var hd = Math.abs(curr.hue() - hue);
    var ld = Math.abs(curr.lightness() - lightness);
    var sd = Math.abs(curr.saturationv() - saturationv);
    if (hd < 20 && ld < 20 && sd < 20 && hd <= hueDelta && ld <= lightnessDelta && sd <= saturationvDelta) {
      hueDelta = hd;
      lightnessDelta = ld;
      saturationvDelta = sd;
      result = curr;
    }

    if (hd === 0 && ld === 0 && sd === 0) {
      // Match exactly
      return curr;
    }
  }
  return result;
}

exports.default = getNearestColor;