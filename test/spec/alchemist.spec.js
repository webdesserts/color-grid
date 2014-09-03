define(function(require) {
  var expect = require('test/setup/chai').expect
  var alchemy = require('alchemist/alchemist')
  var _ = require('lodash')
  describe.only('Alchemist', function() {

    describe('alchemy()', function() {
      it('should store the lab value', function() {
        var color = alchemy(20,10,10)
        expect(color).to.have.property('lab')
        expect(color.lab).to.deep.equal([20,10,10])
      })
    })

    describe('CIELAB', function() {
      var LAB = alchemy.CIELAB

      describe('L*', function() {
        it('should be a number between 0 and 100', function() {
          var valid = [
            [0,0,0],
            [1,0,0],
            [100,0,0],
            [99,0,0]
          ]
          var invalid = [
            [-1,0,0],
            [101,0,0]
          ]

          _(valid).each(function(valid_set) {
            expect(LAB.inBounds.apply(null, valid_set), valid_set).to.be.true
          })
          _(invalid).each(function(invalid_set) {
            expect(LAB.inBounds.apply(null, invalid_set), invalid_set).to.be.false
          })
        })
      })
      describe('a*', function() {
        it('has no bounds')
      })
      describe('b*', function() {
        it('has no bounds')
      })
    })

    describe('RGB', function() {
      var RGB = require('alchemist/rgb')
      describe('R, G, and B', function() {
        it('should be a number between 0 and 255', function() {
          var valid = [
            [0,0,0],
            [1,1,1],
            [255,255,255],
            [254,254,254]
          ]
          var invalid = [
            [-1,0,0],
            [0,-1,0],
            [0,0,-1],
            [256,256,256],
            [256,254,254]
          ]

          _(valid).each(function(valid_set) {
            expect(RGB.inBounds.apply(null, valid_set), valid_set).to.be.true
          })
          _(invalid).each(function(invalid_set) {
            expect(RGB.inBounds.apply(null, invalid_set), invalid_set).to.be.false
          })

        })
      })
    })
  })
})

