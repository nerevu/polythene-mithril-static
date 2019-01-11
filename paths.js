const { resolve, join } = require("path");

const projectRoot = __dirname;

module.exports = {
  projectRoot,
  images: "images",
  css: "styles",
  js: "scripts",
  source: "source",
  dest: "public",
  serverRoot: join(projectRoot, "public"),
  pageBasePath:
    process.env.NODE_ENV !== "production" ? "" : "/polythene-mithril-static"
};
