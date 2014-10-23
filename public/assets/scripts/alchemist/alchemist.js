/* Alchemist is a color convertor built around the Lab color space */

define(function(require) {
  var LAB = require('alchemist/lab')

  var Alchemist = function(options) {
    this.white = options.white || 'D65'
  }

  Alchemist.LAB = LAB

  return Alchemist
})
