'use strict';

var Querious = require('querious');

module.exports.register = function (server, options, next) {

  server.ext('onPreAuth', function (request, reply) {

    options.client = request.pg.client;

    request.querious = new Querious(options);

    reply.continue();
  }, { after: 'hapi-node-postgres' });

  next();
};


exports.register.attributes = {
  pkg: require('./package.json')
};
