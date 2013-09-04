#!/usr/bin/env node

var express    = require('express'),
    HowdyMaker = require('./lib/howdyMaker'),
    rimraf     = require('rimraf');


var slidesFile = process.argv[2] || 'slides.md';


// Create a new Howdy presentation, and serve it
// from an express app.
var howdy = new HowdyMaker(slidesFile, function () {
  var app = express();

  app.set('port', 9999);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(howdy.publicDir));

  app.listen(app.get('port'));
  console.log('Howdy listening on port ' + app.get('port'));
});


// When interrupting this process, first remove
// the existing howdy presentation directory.
process.on('SIGINT', function () {
  console.log('\nRemoving "' + howdy.publicDir + '"...');
  rimraf.sync(howdy.publicDir);
  console.log('Exiting.');
  process.exit(0);
});
