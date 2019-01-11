// Generated by CoffeeScript 2.3.2
var DEFAULTS, markdown, renderer, slug, defaults;

import { extname, dirname, basename } from "path";
import marked from "marked";

renderer = new marked.Renderer();

slug = function(text, opts) {
  text = (text != null ? text.trim() : void 0) || "";
  text.replace(/\W+/g, "-").replace(/[\-]+/g, "-");
  return text;
};

defaults = function(options, extra) {
  // http://stackoverflow.com/questions/10430279/javascript-object-extending
  for (var i in extra) {
    if (!options.hasOwnProperty(i)) {
      options[i] = extra[i];
    }
  }

  return options;
};

// add an embedded anchor tag like on GitHub
renderer.heading = function(text, level) {
  var slugged = slug(text);
  return `<h${level} class='heading'>${text}<a title='${text}' id='${slugged}' class='anchor' href='#${slugged}' aria-hidden='true'></a></h${level}>`;
};

DEFAULTS = {
  renderer: renderer,
  smartypants: true
};

markdown = function(file) {
  return /\.md|\.markdown/.test(extname(file));
};

export default function(options) {
  var keys, opts;
  options = options || {};
  opts = defaults(options, DEFAULTS);
  keys = options.keys || [];
  return function(files, metalsmith, done) {
    var data, dir, file, htmlPath, str;
    for (file in files) {
      data = files[file];
      if (markdown(file)) {
        dir = dirname(file);
        htmlPath = `${basename(file, extname(file))}.html`;
        if (dir !== ".") {
          htmlPath = `${dir}/${htmlPath}`;
        }
        if (data.contents) {
          data.markdown = data.contents;
          str = marked(data.markdown.toString(), opts);
          data.html = new Buffer(str);
        }
        keys.forEach(function(key) {
          return (data[key] = marked(data[key], opts));
        });
        delete files[file];
        files[htmlPath] = data;
      }
    }
    return done();
  };
};
