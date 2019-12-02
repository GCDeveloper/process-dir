#!/usr/bin/env node

const processDir = require("../index.js").default;
const jsonArgs = require("@toolia/json-args").default;
const path = require("path");

const inputs = jsonArgs(process.argv.slice(2), {
  help: false,
  directory: "",
  maxLevel: 128,
  skipDirectories: true,
  logJSON: false,
  logProcessing: false
});

function getHelp(inputs) {
  const help =
    "[Help] Available arguments:\r\n\r\n" +
    Object.entries(inputs)
      .map(([input, value]) => "--" + input + "=" + value)
      .join("\r\n");
  return help;
}
let helpMessage = inputs.help && getHelp(inputs);

// resolve directory to absolute or relative string.
const directory = inputs.directory;
inputs.directory = directory.startsWith("/")
  ? path.normalize(directory)
  : path.join(process.cwd(), directory);

async function processFolderStructure({
  directory,
  maxLevel,
  skipDirectories,
  logJSON,
  logProcessing
}) {
  let output = [];
  await processDir(directory, (filename, { level, fullPath, stats }) => {
    if (level > maxLevel) {
      return; // "Skipping level, too deep.";
    }
    const isDirectory = stats.isDirectory();
    if (skipDirectories && isDirectory) {
      return; // "Skipping directory.";
    }
    if (logJSON) {
      output.push({ filename, fullPath, isDirectory, level });
    }
    if (logProcessing) {
      console.log("-".repeat(level) + filename);
    }
  });
  return output;
}
processFolderStructure(inputs)
  .then(jsonOutput => {
    const { logProcessing, logJSON } = inputs;
    if (logProcessing) console.log("\r\nProcessing all done. output:\r\n");
    if (logJSON) console.log(JSON.stringify(jsonOutput, null, 2));
    if (logProcessing) console.log("");
    if (!logProcessing && !logJSON) {
      console.log(
        "\r\n(nothing) done successfully, here are a list of arguments you can use:"
      );
      if (!inputs.help) {
        if (!helpMessage) helpMessage = getHelp(inputs);
        console.log("\r\n" + helpMessage + "\r\n");
      }
    }
    if (inputs.help) {
      if (!helpMessage) helpMessage = getHelp(inputs);
      console.log("\r\n" + helpMessage + "\r\n");
    }
  })
  .catch(err => {
    throw err;
  });
