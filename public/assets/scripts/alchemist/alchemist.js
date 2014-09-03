/* Alchemist is a color convertor built around the Lab color space */

define(function(require) {

  alchemy = function(l, a, b) {
    return new CIELAB(l, a, b)
  }

  alchemy.CIELAB = CIELAB

  function CIELAB (l, a, b) {
    if (!CIELAB.inBounds(l, a, b)) return null
    this.lab = [l, a, b]
  }

  CIELAB.inBounds = function(l, a, b) {
    return !(l < 0 || 100 < l)
  }

  return alchemy
})
