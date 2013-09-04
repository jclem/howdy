#!/usr/bin/env node

var HowdyMaker = require('./lib/howdyMaker');


var argv = require('optimist')
  .usage('Usage: howdy {input_file} {output_dir OPTIONAL}')
  .demand(1)
  .argv;


var slidesFile = argv._[0],
    outputDir  = argv._[1] || 'howdy';


// Create a new Howdy presentation, in the specified
// directory.
var howdy = new HowdyMaker(slidesFile, outputDir, function () {
  console.log('Howdy presentation created in ' + outputDir);
  process.exit(0);
});
