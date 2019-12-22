:warning: Requires Node >= 10

# process-dir

## Quick start

`npm i @toolia/process-dir`

`const processRecursively = require("@toolia/process-dir").default;`

`processRecursively(inputDirectory, (filename, { level, fullPath, stats}) => /* your code */ )`

## What is this

This function recursively reads out the paths of files/subdirectories within a given directory.

You are given nested `level`, `fullPath`, and fs `stats` in the callback, for each file/folder found.

Therefore, you could do some processing on recursive files/folders using this tool.

## Example

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

## CLI version

You can use this as a command line tool:

`npm i @toolia/process-dir -g`

`process-dir`

Specify arguments with `--argumentName=argumentValue`

For example:

`process-dir --directory="some/subdirectory"`

You can leave directory empty and it will default to the current working directory of the node script.

List of arguments with defaults:

```
--help=false
--directory=
--maxLevel=128
--skipDirectories=true
--logJSON=false
--logProcessing=false
```

# Todo:

- Improve CLI version.

- Write tests

- Fix an error "Error: ENOENT: no such file or directory" in rare cases.
