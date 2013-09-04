#!/usr/bin/env node

var express    = require('express'),
    HowdyMaker = require('./lib/howdyMaker'),
    path       = require('path'),
    rimraf     = require('rimraf');

var slidesFile = process.argv[2] || 'slides.md';

var howdy = new HowdyMaker(slidesFile, function () {
  var app = express();

  app.set('port', 9999);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(howdy.publicDir));

  app.listen(app.get('port'));
  console.log('Howdy listening on port ' + app.get('port'));
});

process.on('SIGINT', function () {
  console.log('\nRemoving "' + howdy.publicDir + '"...');
  rimraf.sync(howdy.publicDir);
  console.log('Exiting.');
  process.exit(0);
});
