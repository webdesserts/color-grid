'use strict';
// Dependencies
var express = require('express'),
    path = require('path'),
    error_handler = require('errorhandler'),
    logger = require('morgan');

// create the server
var server = express()

// include middleware
//server.use(logger({format: 'prod'}))

/* Index */
server.route('/').get(function(req, res, next){
  res.sendfile('public/index.html', function(err) {
    //console.log('index route stat')
    if(err) next(err)
  })
})

server.use(pages)
server.use(assets)
server.use(missing)
server.use(error_handler())
server.listen(8080)

/* Pages */
function pages(req, res, next) {
  if (path.extname(req.path)) { return next() }
  res.sendfile('public/'+req.path+'.html', function(err) {
    //console.log(req.req.path, 'stat')
    if(err) next();
  })
}

/* Assets */
function assets (req, res, next) {
  res.sendfile('public/'+req.path, function(err){
    //console.log(path.basename(req.path), 'stat')
    if (err) next();
  })
}

/* 404 */
function missing (req, res) {
  res.status(404).sendfile('public/404.html')
}

