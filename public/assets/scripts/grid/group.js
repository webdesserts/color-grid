'use strict'

define(function(require) {
  var lodash = require('lodash')
  var chroma = require('chroma')
  var Color  = require('grid/color')
  var utils  = require('grid/utils')
  var Variant

  var ColorGroup = function ColorGroup(opts) {
    var no_color = {h: null, c: null}
    this.variants = []
    this.colors = []
    this.defaults = _.merge(no_color, opts) || no_color
    this.node = null
  }

  // group.mix(variant1[, variant2...]) -> color
  ColorGroup.prototype.mix = function() {
    var mixed_colors = []

    if (arguments.length > 1) {
      _(arguments).forEach(function(variant) {
        mixed_colors.push(utils.mix(this, variant, this.grid))
      }, this)
      return mixed_colors
    } else {
      return utils.mix(this, arguments[0], this.grid)
    }
  }

  // group.has(variant || color) -> boolean
  ColorGroup.prototype.has = function(obj) {
    var Color = Color || require('grid/color')
    var Variant = Variant || require('grid/variant')

    if (Variant.isVariant(obj)) {
      return Boolean(~this.variants.indexOf(obj))

    } else if (Color.isColor(obj)) {
      return Boolean(~this.colors.indexOf(obj))

    } else {
      throw new TypeError('has expects a Variant or Color')
    }
  }

  // Group.isGroup(group)
  ColorGroup.isGroup = function(group) {
    return group instanceof ColorGroup
  }

  // Exports
  return ColorGroup

})
