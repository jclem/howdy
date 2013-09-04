#!/usr/bin/env node

var HowdyMaker = require('./lib/howdyMaker'),
    optimist   = require('optimist');


optimist = optimist
  .usage('Usage: howdy {input_file} {output_dir OPTIONAL} -vh')
  .boolean('v')
  .alias('v', 'verbose')
  .describe('v', 'Verbose logging')
  .boolean('h')
  .alias('h', 'help')
  .describe('h', 'Display this usage message');


if (optimist.argv.h) {
  optimist.showHelp();
  process.exit(0);
}


argv = optimist.demand(1).argv;


var slidesFile = argv._[0],
    outputDir  = argv._[1] || 'howdy',
    verbose    = argv.v;


// Create a new Howdy presentation, in the specified
// directory.
var howdy = new HowdyMaker(slidesFile, outputDir, verbose, function () {
  console.log(outputDir + '/index.html');
  process.exit(0);
});
