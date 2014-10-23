define(function (require) {
  _ = require('lodash')
  XYZ = require('alchemist/xyz')

  RGB = function (r, g, b) {
    if (!RGB.inBounds(r, g, b)) { return null }
    this.r = r
    this.g = g
    this.b = b
  }

  RGB.inBounds = function (r, g, b) {
    var result = true
    _([r, g, b]).each(function(v) {
      if (v < 0 || 255 < v) { return result = false }
    })
    return result
  }

  RGB.prototype.lab = function() {
    xyz = new XYZ(this.xyz())
    return xyz.lab()
  }

  RGB.prototype.xyz = function() {
    var r = this.invCompand(this.r)
    var g = this.invCompand(this.g)
    var b = this.invCompand(this.b)
    var x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375
    var y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750
    var z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041
    return [x, y, z]
  }

  RGB.prototype.invCompand = function(V) {
    if (V <= 0.04045) {
      return V / 12.92
    } else {
      return Math.pow((V + 0.055) / 1.055, 2.4)
    }
  }

  return RGB
})
