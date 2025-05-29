#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const { stripMethodBodies } = require('./strip-method-bodies');

program
  .name('tree-setter')
  .description('Strip method bodies from source code files using tree-sitter')
  .version('1.0.0')
  .argument('<file>', 'source code file to process')
  .option('-o, --output <file>', 'output file path (default: stdout)')
  .action((file, options) => {
    try {
      const result = stripMethodBodies(file);
      if (options.output) {
        fs.writeFileSync(options.output, result);
        console.log(`Processed file written to: ${options.output}`);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.error('Error:', error.message);
      process.exit(1);
    }
  });

program.parse(); 