const fs = require("fs");
const path = require("path");
export async function readPaths(pathstring) {
  return new Promise((resolve, reject) => {
    const stats = fs.statSync(pathstring);
    if (stats.isDirectory()) {
      fs.readdir(pathstring, (err, names) => {
        if (err) console.error("readdirerr", err);
        if (err) reject(err);
        // filter out filenames, only get folder names.
        // const foldernames = names.filter(name => !name.includes("."));
        resolve(names);
      });
    } else if (stats.isFile()) {
      resolve([]);
    } else {
      throw new Error("neither file nor folder", pathstring, stats);
    }
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
    let childrenFirst = options.childrenFirst;
    level++;
    //for await... of requires Node.js 10+
    for await (let pathname of readPathsGenerator(pathstring)) {
      const fullPath = path.join(pathstring, pathname);
      cb(pathname, { fullPath, pathstring, level });
      const recurse = recursivelyReadPaths.bind(
        this,
        fullPath,
        cb,
        options,
        level
      );
      if (childrenFirst) {
        await recurse();
      } else {
        recurse();
      }
    }
  } catch (err) {
    throw err;
  }
}

export default recursivelyReadPaths;
