define(function(require) {
  function CIELAB (l, a, b) {
    if (!CIELAB.inBounds(l, a, b)) return null
    this.lab = [l, a, b]
  }

  CIELAB.inBounds = function(l, a, b) {
    return !(l < 0 || 100 < l)
  }

  return CIELAB
})
