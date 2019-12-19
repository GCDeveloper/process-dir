#!/usr/bin/env node
const processRecursively = require("../index.js").default;
console.log('This requires the peer dependency of \'chalk\', try `npm i chalk --no-save`');
const chalk = require("chalk");

// Example usage of processRecursively:

processRecursively(process.cwd(), (filename, { level, fullPath, stats }) => {
  const isFile = stats.isFile();
  const isJsFile = isFile && filename.endsWith(".js");
  const isJsonFile = isFile && filename.endsWith(".json");
  let msg = "-".repeat(level) + filename;
  if (isJsFile) {
    msg = chalk.yellow.inverse(msg);
  } else if (isJsonFile) {
    msg = chalk.yellow(msg);
  } else if (isFile) {
    msg = chalk.rgb(180, 160, 0)(msg);
  } else {
    msg += "/ processed.";
    msg = chalk.rgb(120, 100, 0).italic(msg);
  }
  if (level === 1) {
    msg = chalk.bold(msg + "\r\n");
  }

  console.log(msg);
  //using fullPath you could apply some function to each file
});
