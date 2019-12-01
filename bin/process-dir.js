#!/usr/bin/env node
const processRecursively = require("../index.js").default;

processRecursively(
  process.cwd(),
  (filename, { level, fullPath }) => {
    console.log("-".repeat(level) + filename);
    if (true) {
      if (filename.endsWith(".js")) {
        console.log("found a js file at " + fullPath);
      }
    }
  },
  {
    childrenFirst: true
  }
);
