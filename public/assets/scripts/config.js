'use strict'

require.config({
  baseUrl: 'assets/scripts/',
  deps: ['main'],
  paths: {
    jquery: 'vendor/jquery.min',
    flight: 'vendor/flight',
    chroma: 'vendor/chroma',
    lodash: 'vendor/lodash.min',
  },
  packages: [
    { name: 'flight', main: 'index.js', },
  ],
})
