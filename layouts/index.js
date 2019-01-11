// Generated by CoffeeScript 2.3.2
var m = require('mithril')
var Base = require('./_components/base')
var Heart = require('./_components/heart')

module.exports = {
  ctrl: function(file, metalsmith) {
    this.attrs = metalsmith._metadata;
    this.attrs.title = file.title;
    this.attrs.content = [
      m(".logos", [
        m(
          ".logo",
          m("img", {
            src: `${this.attrs.images}/metalsmith-logo.svg`,
            alt: "Metalsmith"
          })
        ),
        m(".heart", m(Heart)),
        m(
          ".logo",
          m("img", {
            src: `${this.attrs.images}/webpack-logo.svg`,
            alt: "Webpack"
          })
        )
      ]),
      m.trust(file.html)
    ];
    return this;
  },
  view: function(ctrl, file, metalsmith) {
    return m(Base, ctrl.attrs);
  }
};
