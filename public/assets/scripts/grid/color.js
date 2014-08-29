'use strict';

define(['require', 'lodash', 'chroma'], function(require, lodash, chroma) {
  var lodash = require('lodash')
  var chroma = require('chroma')
  var Variant, Group

  var Color = function(group, variant) {
    var Variant = (Variant || require('grid/variant'))
    var Group = (Group || require('grid/group'))
    if (!Group.isGroup(group)) throw TypeError('Color expects a Group');
    if (!Variant.isVariant(variant)) throw TypeError('Color expects a Variant');
    var g = group.defaults
    var v = variant.defaults
    var lch = []
    lch[0] = v.l || 0
    lch[1] = g.c || v.c || 0
    lch[2] = g.h || 0
    var chroma_color = new chroma._Color(lch, 'lch')
    var clipped = chroma.rgb(chroma_color.rgb()).lch()
    chroma_color.out_of_bounds = false
    chroma_color.node = null
    chroma_color.variant = variant
    chroma_color.group = group

    variant.colors.push(chroma_color)
    group.colors.push(chroma_color)

    _.some(lch, function(value, i) {
      //console.log('checking ' + i)
      if (i === 2 && clipped[i] < 0) clipped[i] = 360 + clipped[i]
      var diff = value - clipped[i]
      if (diff > 1 || diff < -1) {
        chroma_color.out_of_bounds = true
      }
    })

    return chroma_color
  }

  Color.isColor = function(color) {
    return color instanceof chroma._Color && !_.isUndefined(color.group) && !_.isUndefined(color.variant)
  }

  // Exports
  return Color

})
