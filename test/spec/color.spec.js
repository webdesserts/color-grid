define(function(require) {
  var Grid = require('grid/grid')
  var Group = require('grid/group')
  var Variant = require('grid/variant')
  var Color = require('grid/color')
  var _ = require('lodash')

  describe('Color', function() {
    describe('constructor', function() {
      var v, g, v_args, g_args

      beforeEach(function(){
        v_args = {l: 30, c: 50}
        g_args = {h: 70, c: 40}
        v = new Variant(v_args)
        g = new Group(g_args)
      })

      it("shouldn't change the group and variant defaults", function() {
        var v_old = _(v.defaults).clone()
        var g_old = _(g.defaults).clone()
        var color = new Color(g, v)
        v.defaults.should.deep.equal(v_old)
        g.defaults.should.deep.equal(g_old)
      })

      it("prefers a variant's lightness over a group's", function() {
        var variant_lightness = v_args.l
        var color_lightness = new Color(g, v).lch()[0]
        variant_lightness.should.be.closeTo(color_lightness, 1)
      })

      it("prefers a group's chroma over a variant's", function() {
        var group_chroma = g_args.c
        var color_chroma = new Color(g, v).lch()[1]
        color_chroma.should.be.closeTo(group_chroma, 1)
      })

      it("prefers a group's hue over a variant's", function() {
        var group_hue = g_args.h
        var color_hue = new Color(g, v).lch()[2]
        color_hue.should.be.closeTo(group_hue, 1)
      })

      describe('when given a group with a chroma', function() {
        var group, variant, color

        before(function() {
          group = new Group({h: 20, c: 50})
          variant = new Variant({c: 30, l: 40})
          color = new Color(group, variant).lch()
        })

        it("should use the group's chroma", function() {
          color[1].should.be.closeTo(50, 1)
        })
      })

      describe('when given a group without a chroma', function() {
        var group
        before(function() {
          group = new Group({h: 20})
        })

        it("should use the variant's chroma if it has one", function() {
          var variant = new Variant({c: 30, l: 40})
          var color = new Color(group, variant).lch()
          color[1].should.be.closeTo(30, 1)
        })

        it("should use 0 if neither have chromas", function() {
          var variant = new Variant({l: 40})
          var color = new Color(group, variant).lch()
          color[1].should.be.closeTo(0, 1)
        })
      })
    })
  })
})
