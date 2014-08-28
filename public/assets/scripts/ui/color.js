define([ 'flight/component' ], function(component) {
  'use strict'

  return component(uiColor)

  function uiColor() {
    this.attributes({
      'create:selector': '.create-color',
      'destroy:selector': '.remove',
      'selected': false,
      'empty': false,
    })

    this.after('initialize', function() {
      if (this.$node.hasClass('empty'))
        this.attr['empty'] = true

      this.on('click', this.toggleSelection)
      this.on('select', this.select)
      this.on('deselect', this.deselect)
      this.on('click', {
        'create:selector': this.create,
        'destroy:selector': this.destroy
      })
    })

    //Create
    this.create = function () {
      //console.log('creating')
      var destroyer_class = this.attr['destroy:selector'].slice(1)

      this.$node.removeClass('empty')
        .html('<div class="swatch"><button class="' + destroyer_class + '">x</button></div>')
      this.attr['empty'] = false
      this.trigger('color:created')
    }

    //Destroy
    this.destroy = function () {
      //console.log('destroying')
      var creator_class = this.attr['create:selector'].slice(1)
      this.$node.addClass('empty')
        .html('<button class="' + creator_class + '">+</button>')
      this.attr['empty'] = true
      this.trigger('color:deselect')
      this.trigger('color:destroyed')
    }

    // Toggle Select
    this.toggleSelection = function() {
      this.attr['selected'] ? this.deselect() : this.select()
    }

    // Select
    this.select = function() {
      console.log(this)
      if (!this.attr['empty']) {
        this.$node.addClass('selected')
        this.attr['selected'] = true
        this.trigger('color:selected')
      }
    }

    // Deselect
    this.deselect = function() {
      //console.log('deselected')
      if (this.attr['selected']) {
        this.$node.removeClass('selected')
        this.attr['selected'] = false
        this.trigger('color:deselected')
      }
    }

  }
})
