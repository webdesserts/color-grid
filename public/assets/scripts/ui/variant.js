define([ 'flight/component' ], function(component) {
  'use strict'

  return component(uiColor)

  function uiColor() {
    this.attributes({
      empty: true,
      data: null
    })

    this.after('initialize', function() {})

    //Create
    this.create = function() {
      //console.log('creating')
      this.$node.removeClass('empty')
        .html('<div class="swatch"><button class="' + destroyer_class + '">x</button></div>')
      this.attr.empty = false
      this.trigger('variant:created')
    }

    //Destroy
    this.destroy = function() {
      //console.log('destroying')
      var creator_class = this.attr['create:selector'].slice(1)
      this.$node.addClass('empty')
        .html('<button class="' + creator_class + '">+</button>')
      this.attr.empty = true
      this.trigger('color:deselect')
      this.trigger('color:destroyed')
    }

  }
})
