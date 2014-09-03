define(function (require) {
  _ = require('lodash')

  RGB = function (r, g, b) {
    if (!RGB.inBounds(r, g, b)) { return null }
    this.values = {r: r, g: g, b: b}
  }

  RGB.inBounds = function (r, g, b) {
    var result = true
    _([r, g, b]).each(function(value) {
      if (value < 0 || 255 < value) return result = false
    })
    return result
  }

  RGB.lab = function() {}
  return RGB
})
