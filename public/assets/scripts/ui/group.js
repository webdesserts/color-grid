'use strict'

define(function(require) {
  var component = require('flight/component')
  return component(uiGroup)

  function uiGroup() {
    this.attributes({ })
    this.after('initialize', function() {
      this.init()

    })

    //Initialize
    this.init = function() {}

    //Create
    this.create = function(evt, data) { }

    //Destroy
    this.destroy = function(evt, data) { }
  }
})
