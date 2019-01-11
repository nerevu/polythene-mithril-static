import Metalsmith from "metalsmith";
import fingerprint from "metalsmith-fingerprint-ignore";
import mithril from "metalsmith-mithril";

import markdown from "./markdown";
import paths from "../paths";

const __PROD__ = process.env.NODE_ENV === "production";

export default new Metalsmith(paths.projectRoot)
  .clean(__PROD__)
  .source(paths.source)
  .destination(paths.dest)
  .metadata(paths)
  .use(fingerprint({ pattern: ["**/*.css", "**/*.js"] }))
  .use(markdown())
  .use(
    mithril.layouts({
      ext: ".js"
    })
  );
