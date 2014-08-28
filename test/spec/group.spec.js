define(function(require) {
  var Grid = require('grid/grid')
  var Group = require('grid/group')
  var Variant = require('grid/variant')
  var Color = require('grid/color')
  var chroma = require('chroma')

describe('Group', function() {

  describe('constructor', function() {
    it('returns a new group', function() {
      var group = new Group({h: 12})
      group.should.be.an.instanceOf(Group)
    })

    it('accepts a hue and a chroma', function() {
      var group = new Group({h: 12, c: 30})
      group.defaults.should.be.deep.equal({h: 12, c: 30})
    })

    it('accepts a hue only', function() {
      var group = new Group({h: 12})
      group.defaults.should.be.deep.equal({h: 12, c: 0})
    })
  })

  describe('#mix()', function() {
    var magenta, dark

    beforeEach(function() {
      magenta = new Group({h: 12})
      dark = new Variant({l: 10})
    })

    it('expects a variant', function() {
      (function() {
        magenta.mix('#333')
      }).should.throw(TypeError)
    })

    it('returns a color', function() {
      var mix = magenta.mix(dark).lch()
      var result = chroma.lch(10, 0, 30).lch()
      mix.forEach(function(item, i) {
        item.should.be.closeTo(result[i], 1)
      })
    })
  })

  describe('#has()', function() {
    var magenta, dark, light, dark_magenta

    beforeEach(function() {
      magenta = new Group({h: 12})
      dark = new Variant({l: 10})
      light = new Variant({l: 30})

      dark_magenta = magenta.mix(dark)
    })
    it('throws an error if input is invalid', function() {
      (function() {
        magenta.has('#333')
      }).should.throw(TypeError)
    })
    it('accepts a Color', function() {
      (function() {
        magneta.has(dark_magenta)
      }).should.not.throw(TypeError)
    })
    it('accepts a Variant', function() {
      (function() {
        magneta.has(dark)
      }).should.not.throw(TypeError)
    })
    it('returns false, when a variant hasn\'t been mixed', function() {
      magenta.has(light).should.be.false
    })
    it('returns true, when a variant has been mixed', function() {
      //light.mix(magenta)

      magenta.has(dark).should.be.true
      //magenta.has(light).should.be.true
      magenta.has(dark_magenta).should.be.true
    })
  })

})
})
