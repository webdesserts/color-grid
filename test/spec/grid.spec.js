define(function(require) {
  var Grid = require('grid/grid')
  var Group = require('grid/group')
  var Variant = require('grid/variant')
  var Color = require('grid/color')

describe('Grid', function() {
  describe('constructor', function() {
    it('should return a new instance', function() {
      var grid = new Grid()
      grid.should.be.an.instanceOf(Grid)
    })
  })

  describe('#group()', function() {
    var grid
    beforeEach(function() { grid = new Grid()  })

    it('should create a group', function() {
      var group1 = grid.group({h: 10, c: 10})
      var group2 = grid.group({h: 20, c: 30})
      group1.should.be.an.instanceof(Group)
      group2.should.be.an.instanceof(Group)
      group1.defaults.should.deep.equal({h: 10, c: 10})
      group2.defaults.should.deep.equal({h: 20, c: 30})
    })

    it('should put the new group in the "groups" array', function() {
      var group1 = grid.group({h: 10, c: 10})
      var group2 = grid.group({h: 20, c: 30})
      grid.groups.should.contain(group1)
      grid.groups.should.contain(group2)
    })
  })

  describe('#variant()', function() {
    var grid
    beforeEach(function() { grid = new Grid()  })

    it('should create a variant', function() {
      var variant1 = grid.variant({l: 10, c: 10})
      var variant2 = grid.variant({l: 20, c: 30})
      variant1.should.be.an.instanceof(Variant)
      variant2.should.be.an.instanceof(Variant)
      variant1.defaults.should.deep.equal({l: 10, c: 10})
      variant2.defaults.should.deep.equal({l: 20, c: 30})
    })

    it('should put the new variant in the "variants" array', function() {
      var variant1 = grid.variant({l: 10, c: 10})
      var variant2 = grid.variant({l: 20, c: 30})
      grid.variants.should.contain(variant1)
      grid.variants.should.contain(variant2)
    })
  })

  describe('#mix()', function() {
    var grid
    beforeEach(function() { grid = new Grid()  })

    it('should mix the defaults', function() {
      var group = grid.group({c: 20, h: 30})
      var variant = grid.variant({l: 10, c: 10})
      var color = grid.mix(group, variant).lch()
      var lch = {l: color[0], c: color[1], h: color[2]}
      lch.l.should.be.closeTo(10, 1)
      lch.c.should.be.closeTo(20, 1)
      lch.h.should.be.closeTo(30, 1)
    })
  })
})
})
