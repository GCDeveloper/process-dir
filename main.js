const fs = require("fs");
const path = require("path");
export async function readPaths(pathstring) {
  return new Promise((resolve, reject) => {
    fs.readdir(pathstring, (err, names) => {
      if (err) console.error("readdirerr", err);
      if (err) reject(err);
      names = names.sort();
      // filter out filenames, only get folder names.
      // const foldernames = names.filter(name => !name.includes("."));
      resolve(names);
    });
  });
}

async function* readPathsGenerator(pathstring) {
  try {
    const paths = await readPaths(pathstring);
    for (let pathname of paths) {
      yield pathname;
    }
  } catch (err) {
    throw err;
  }
}

export async function recursivelyReadPaths(
  pathstring,
  cb = Function.prototype,
  options = {},
  level = 0
) {
  try {
    level++;
    const stats = fs.statSync(pathstring);
    if (stats.isDirectory()) {
      //for await... of requires Node.js 10+
      for await (let pathname of readPathsGenerator(pathstring)) {
        const fullPath = path.join(pathstring, pathname);

        const recurse = recursivelyReadPaths.bind(
          this,
          fullPath,
          cb,
          options,
          level
        );
        const stats = await recurse();
        cb(pathname, { fullPath, pathstring, level, stats });
      }
    }
    return stats;
  } catch (err) {
    throw err;
  }
}

export default recursivelyReadPaths;
