define(function(require) {
  var Grid = require('grid/grid')
  var Group = require('grid/group')
  var Variant = require('grid/variant')
  var Color = require('grid/color')
  var chroma = require('chroma')

describe('Variant', function() {

  describe('constructor', function() {
    it('returns a new variant', function() {
      var variant = new Variant({l: 12})
      variant.should.be.an.instanceOf(Variant)
    })

    it('accepts a lightness and a chroma', function() {
      var variant = new Variant({l: 12, c: 30})
      variant.defaults.should.be.deep.equal({l: 12, c: 30})
    })

    it('accepts a lightness only', function() {
      var variant = new Variant({l: 12})
      variant.defaults.should.be.deep.equal({l: 12, c: 0})
    })
  })

  describe('#mix()', function() {
    var magenta, dark

    beforeEach(function() {
      magenta = new Group({h: 12})
      dark = new Variant({l: 10})
    })

    it('expects a group', function() {
      (function() {
        dark.mix('#333')
      }).should.throw(TypeError)
    })

    it('returns a color', function() {
      var mix = dark.mix(magenta).lch()
      var result = chroma.lch(10, 0, 30).lch()
      mix.forEach(function(item, i) {
        item.should.be.closeTo(result[i], 1)
      })
    })
  })

  describe('#has()', function() {

    beforeEach(function() {
      magenta = new Group({h: 12})
      blue = new Group({h: 200})
      dark = new Variant({l: 10})
    })

    it('expects a group', function() {
      (function() {
        dark.has('#333')
      }).should.throw(TypeError)
    })

    it('returns false, when a group hasn\'t been mixed', function() {
      dark.has(magenta).should.be.false
      dark.has(blue).should.be.false
    })

    it('returns true, when a group has been mixed', function() {
      dark.mix(magenta)
      dark.mix(blue)

      dark.has(magenta).should.be.true
      dark.has(blue).should.be.true
    })
  })

})
})
