// Generated by CoffeeScript 2.3.2
import m from "mithril";

import SiteMeta from "./site-meta";

export default {
  view: function(vnode) {
    var attrs;
    attrs = vnode.attrs;
    return [
      m("!doctype[html]"),
      m(
        "html",
        {
          lang: attrs.site.language,
          prefix: "og: http://ogp.me/ns#"
        },
        [
          m("head", [
            m(SiteMeta, attrs),
            m("title", attrs.title),
            m("link", {
              rel: "stylesheet",
              href: attrs.fingerprint[`${attrs.paths.css}/app.css`],
              type: "text/css"
            })
          ]),
          m("body", [
            m("#container", attrs.content),
            m("script[async]", {
              src: attrs.fingerprint[`${attrs.paths.js}/app.js`]
            })
          ])
        ]
      )
    ];
  }
};
