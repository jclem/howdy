#!/usr/bin/env node

var HowdyMaker = require('./lib/howdyMaker'),
    optimist   = require('optimist');


var argv = optimist
  .usage('Usage: howdy {input_file} -o output_dir -vh')
  .alias('o', 'output')
  .describe('o', 'Directory to output to')
  .default('o', '.')
  .boolean('v')
  .alias('v', 'verbose')
  .describe('v', 'Verbose logging')
  .boolean('h')
  .alias('h', 'help')
  .describe('h', 'Display this usage message')
  .demand(1)
  .argv;


if (argv.h) {
  optimist.showHelp();
  process.exit(0);
}


var slidesFile = argv._[0],
    outputDir  = argv.o || '.',
    verbose    = argv.v;


// Create a new Howdy presentation, in the specified
// directory.
var howdy = new HowdyMaker(slidesFile, outputDir, verbose, function () {
  console.log(outputDir + '/index.html');
  process.exit(0);
});
