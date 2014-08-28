'use strict'

define(function(require) {
  var lodash = require('lodash')
  var chroma = require('chroma')
  var Color  = require('grid/color')
  var utils  = require('grid/utils')
  var Group

  var ColorVariant = function(opts) {
    var no_color = {l: 0, c: 0}
    this.groups = []
    this.colors = []
    this.defaults = _.merge(no_color, opts) || no_color
    this.nodes = []
  }

  // variant.has(group || color) -> boolean
  ColorVariant.prototype.has = function(item) {
    var Color = (Color || require('grid/color'))
    var Group = (Group || require('grid/group'))
    if (Group.isGroup(item)) {
      return Boolean(~this.groups.indexOf(item))

    } else if (Color.isColor(item)) {
      return Boolean(~this.colors.indexOf(item))

    } else {
      throw new TypeError('has() expectes a Group or Color')
    }
  }

  // variant.mix(group) -> color
  ColorVariant.prototype.mix = function(group) {
    return utils.mix(group, this, this.grid)
  }

  // Variant.isVariant(variant)
  ColorVariant.isVariant = function(variant) {
    return variant instanceof ColorVariant
  }

  // Exports
  return ColorVariant

})
