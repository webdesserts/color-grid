'use strict';

define([ 'lodash', 'grid/group', 'grid/variant', 'grid/color', 'grid/utils' ], function(lodash, Group, Variant, Color, utils) {

  // Exports
  return ColorGrid

  function ColorGrid(node) {
    this.groups = []
    this.variants = []
    this.colors = []

    // a node to associate with this grid
    this.node = node || null

    // create a group
    this.group = function(opts) {
      var group = new Group(opts)
      group.grid = this
      this.groups.push(group)
      return group
    }

    // create a variant
    this.variant = function(opts) {
      var variant = new Variant(opts)
      variant.grid = this
      this.variants.push(variant)
      return variant
    }

    // mix a group and variant together to make a color
    this.mix = function(group, variant) {
      return utils.mix(group, variant, this)
    }

    this.mixAll = function() {
      _.forEach(this.groups, function(group) {
        _.forEach(this.variants, function(variant) {
          this.mix(group, variant)
        }, this)
      }, this)
    }

  }

})
