"use strict";

var restify = require('restify');
var monster = require('./monsterid.js');

/*
 * TODO: bit more docs
 *       figure out debug and live-reloading
 *       tests (pretty easy, check get same binary for same string, check
 *       short strings, invalid URLs, sizes)
 *       ***NOT correctly 404ing currently***
 */
var DEFAULT_SIZE = 20;
function respond(req, res, next) {

  var width = DEFAULT_SIZE;
  var height = DEFAULT_SIZE;

  if (req.params.size) {
      width = req.params.size;
      height = req.params.size;
  }
  if (req.params.width) {
      width = req.params.width;
  }
  if (req.params.height) {
      height = req.params.height;
  }

  var img = monster.getAvatar(req.params.name, width, height);
  res.setHeader('Content-Type', 'image/png');
  res.send(img);
  next();
}

var server = restify.createServer({
    formatters: {
        'image/png': function formatPng(req, res, body) {
            if (body instanceof Error) {
                return body.stack;
            } 
            //Just send the bytes - should be a Buffer
            return body;
        }
    },
    name: "dnmonster"

});

server.use(restify.queryParser());
server.get('/monster/:name', respond);

server.listen(process.env.PORT || 8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
