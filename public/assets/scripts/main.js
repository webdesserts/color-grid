define(function (require) {
  'use strict'
  var uiPalette = require('ui/palette')
  var uiGrid = require('ui/grid')
  var Grid = require('grid/grid')
  var chroma = require('chroma')
  var theme = require('theme/personal')

  var grid = new Grid()

  theme(grid)

  window.Color = require('grid/color')
  window.grid = grid

  uiPalette.attachTo('.palette')
  uiGrid.attachTo('.grid', {grid: grid})
})
