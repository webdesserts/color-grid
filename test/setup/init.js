define(function(require) {
  var chai = require('test/setup/chai');
  require('test/setup/mocha');
  require('jquery');
  //require('chai-jquery');

  mocha.setup('bdd');

  require([
    'spec/grid.spec',
    'spec/group.spec',
    'spec/variant.spec',
    'spec/color.spec',
    'spec/alchemist.spec'
  ], function(require) {
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  });

});
