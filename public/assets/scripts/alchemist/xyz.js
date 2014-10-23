define(function (require) {
  _ = require('lodash')

  XYZ = function (x, y, z) {
    if (_(arguments[0]).isArray()) {
      var xyz = arguments[0]
      x = xyz[0]
      y = xyz[1]
      z = xyz[2]
    }
    this.x = x
    this.y = y
    this.z = z
  }

  // reference white
  // TODO: find a better place for this if possible
  XYZ.RefWhite = {X: 0.95047, Y: 1, Z: 1.08883}

  XYZ.prototype.lab = function () {
    var x = this.x, y = this.y, z = this.z, rW = XYZ.RefWhite;

    // values adjusted to reference white and ran through adjustment curve
    var fx = XYZ.f(x / rW.X)
    var fy = XYZ.f(y / rW.Y)
    var fz = XYZ.f(z / rW.Z)

    var L = 116 * fy - 16
    var a = 500 * (fx - fy)
    var b = 200 * (fy - fz)

    return [L, a, b]
  }

  XYZ.f = function (x) {
    var kE = 216 / 24389 // 0.08856
    var kK = 24389 / 27 // 903.3
    return (x > kE) ? Math.pow(x, 1 / 3) : ((kK * x + 16) / 116)
  }

  return XYZ
})
