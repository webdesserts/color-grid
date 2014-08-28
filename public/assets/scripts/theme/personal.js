define(function(require) {
  var chroma = require('chroma')
  return function personal(grid) {
    //var base = grid.group({h: 170, c: 10})
    var magenta = grid.group({h: 355})
    var red = grid.group({h: 27})
    var yellow = grid.group({h: 88})
    var green = grid.group({h: 120})
    var cyan = grid.group({h: 203})
    var blue = grid.group({h: 252})
    var violet = grid.group({h: 311})

    // variants
    var v03 = grid.variant({c: 21, l: 42})
    var v0 = grid.variant({c: 30, l: 57})
    var v2 = grid.variant({c: 40, l: 75})

    grid.mixAll()

    /*
    var bkg = [30, 10, 197]

    $('html').css({
      'background-color': chroma(bkg, 'lch').hex()
    })*/

  }
})
