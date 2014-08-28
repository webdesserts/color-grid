define(function() {
  return function personal(grid) {
    //var base = grid.group({h: 170, c: 10})
    var magenta = grid.group({h: 350})
    var red = grid.group({h: 25})
    var yellow = grid.group({h: 88})
    var green = grid.group({h: 130})
    var cyan = grid.group({h: 210})
    var blue = grid.group({h: 265})
    var violet = grid.group({h: 320})

    // variants
    var v03 = grid.variant({c: 26, l: 20})
    var v02 = grid.variant({c: 26, l: 30})
    var v01 = grid.variant({c: 26, l: 40})
    var v0 = grid.variant({c: 26, l: 50})
    var v1 = grid.variant({c: 26, l: 60})
    var v2 = grid.variant({c: 26, l: 70})
    var v3 = grid.variant({c: 26, l: 80})

    grid.mixAll()

    //base.mix(v03, v02, v01, v0, v1, v2, v3)
    //magenta.mix(v1,v0,v01)
    //red.mix(v1,v0,v01)
    //yellow.mix(v1,v0,v01)
    //green.mix(v1,v0,v01)
    //cyan.mix(v1,v0,v01)
    //blue.mix(v1,v0,v01)
    //violet.mix(v1,v0,v01)

  }
})
