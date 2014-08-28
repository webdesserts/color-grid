'use strict'
require.config({
  baseUrl: '../public/assets/scripts/',
  deps: ['test/setup/init'],
  paths: {
    test: '../../../test',
    spec: '../../../test/spec',
    jquery: 'vendor/jquery.min',
    flight: 'vendor/flight',
    chroma: 'vendor/chroma',
    lodash: 'vendor/lodash.min',
  },
  packages: [
    { name: 'flight', main: 'index.js', },
  ],
})
