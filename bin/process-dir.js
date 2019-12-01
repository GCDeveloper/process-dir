#!/usr/bin/env node

const pd = require('../index.js');

const args = process.argv.slice(2);

if(args.length != 1) {
  throw new Error('must have only 1 argument, the js file which exports a function to consume processDir fn.');
}

const fn = require(args[0]);

pd(process.cwd(), fn);
