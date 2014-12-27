'use strict';

var Hoek = require('hoek');
var Querious = require('querious');

var DEFAULTS = {
  // Reflecting the attach setting on node-hapi-postgres.
  attach: 'onPreHandler'
};

module.exports.register = function (server, options, next) {

  var config = Hoek.applyToDefaults(DEFAULTS, options);

  server.ext(config.attach, function (request, reply) {

    config.client = request.pg.client;

    request.querious = new Querious(config);

    reply.continue();
  }, { after: 'hapi-node-postgres' });

  next();
};


exports.register.attributes = {
  pkg: require('./package.json')
};
