'use strict'

define(function(require) {
  var component = require('flight/component')
  var Grid = require('grid/grid')
  var uiGroup = require('ui/group')
  var uiVariant = require('ui/variant')
  var uiColor = require('ui/color')
  require('jquery')

  return component(uiGrid)

  function uiGrid() {
    this.attributes({
      'selected:selector': '.selected',
      'group:selector': '.group',
      'variant:selector': '.variant',
      'color:selector': '.swatch',
      grid: new Grid()
    })
    this.after('initialize', function() {
      // Temporary Starter Grid
      var grid = this.attr.grid
      grid.node = this.node

      // Initialize Colors
      _.forEach(grid.groups, this.initGroup, this)
      _.forEach(grid.variants, this.initVariant, this)
      _.forEach(grid.colors, this.initColor, this)

      this.on('color:selected', this.clearSelection)
    })

    /* Event Handlers */
    this.clearSelection = function (ev) {
      this.select('selected:selector').not(ev.target).trigger('deselect')
    }

    /* Initializers */
    this.initGroup = function(group) {
      var grid = group.grid
      group.node = document.createElement('div')
      group.node.className = this.attr['group:selector'].slice(1)
      uiGroup.attachTo(group.node, {
        data: group
      })
      $(grid.node).append(group.node)
    }

    this.initVariant = function(variant) {
      var grid = variant.grid

      // a variant applies accross several groups, so we loop through
      _.forEach(grid.groups, function (group) {
        var ele = document.createElement('div')
        var className = this.attr['variant:selector'].slice(1)
        // make variant empty if it's not included in group
        if (!variant.has(group)) { className = className + ' empty'};
        ele.className = className
        variant.nodes.push(ele)
        $(group.node).append(ele)
        uiVariant.attachTo(ele, { data: variant })
      }, this)
    }

    this.initColor = function(color) {
      // create the swatch element
      color.node = document.createElement('div')
      color.node.className = this.attr['color:selector'].slice(1)
      $(color.node).css({'background-color': color.hex()})
      if (color.out_of_bounds) {
        $(color.node).css({'outline': '2px solid red', 'z-index': 3})
      }

      // loop through your variant... to do something
      _.forEach(color.variant.nodes, function(node) {
        if ($(color.group.node).has(node).length) {
          uiColor.attachTo(color.node, { data: color })
          $(node).append(color.node)
        }
      })
    }
  }
})
