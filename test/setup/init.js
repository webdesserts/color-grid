define(function(require) {
  var chai = require('test/setup/chai');
  require('test/setup/mocha');
  require('jquery');
  //require('chai-jquery');

  // Chai
  var should = chai.should();
  //chai.use(chaiJquery);

  console.log()
  mocha.setup('bdd');

  require([
    'spec/grid.spec',
    'spec/group.spec',
    'spec/variant.spec',
    'spec/color.spec'
  ], function(require) {
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run();
    } else {
      mocha.run();
    }
  });

});
