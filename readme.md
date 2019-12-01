# process-dir

# Quick start

`npm i @toolia/process-dir`

`const processRecursively = require("@toolia/process-dir").default;`

`processRecursively(inputDirectory, (filename, { level, fullPath, stats}) => /* your code */ )`

# What is this

This function recursively reads out the paths of files/subdirectories within a given directory.

You are given nested `level`, `fullPath`, and fs `stats` in the callback, for each file/folder found.

Therefore, you could do some processing on recursive files/folders using this tool.

# Example

- Find example in [./example/process-dir.js](./example/process-dir.js)

```
const processRecursively = require("@toolia/process-dir").default;

processRecursively(process.cwd(), (filename, { level, fullPath, stats }) => {
  const isFile = stats.isFile();
  const isJsonFile = isFile && filename.endsWith(".json");
  let msg = "-".repeat(level) + filename;
  console.log(msg);
  //do what you want using fullPath to reference each file / folder.
});

```

See node.js fs [stats](https://nodejs.org/api/fs.html#fs_class_fs_stats)

# Todo:

- Implement CLI version.
