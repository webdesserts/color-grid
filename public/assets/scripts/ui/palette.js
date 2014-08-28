define(function(require) {
  'use strict'
  var component = require('flight/component')
  require('jquery')

  return component(palette)

  function palette() {
    this.attributes({ selector: '.palette' })
    this.after('initialize', function() {})
  }
})
