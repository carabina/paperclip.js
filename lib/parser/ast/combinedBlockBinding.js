var BaseExpression  = require("./base");
var ArrayExpression = require("./array");
var uniq            = require("../../utils/uniq");

function CombinedBlockBinding(children) {
  BaseExpression.apply(this, arguments);
}

BaseExpression.extend(CombinedBlockBinding, {
  type: "elementNode",
  toJavaScript: function() {

    var refs = [];

    var scripts = [];

    for (var i = 0, n = this._children.length; i < n; i++) {
      var child = this._children[i];

      if (child.type === "textNode") {
        scripts.push("\'" + child.value.replace("'","\\'") + "\'");
      } else if (child.type === "blockBinding") {
        scripts.push("((v = " + child.scripts.value.value.value.toJavaScript() + ") == void 0 ? \"\" : v)");
        refs = refs.concat(child.scripts.value.value.getRefs());
      }
    }

    refs = uniq(refs.map(function(ref) {
      return ref.join(".");
    })).map(function(ref) {
      return ref.split(".");
    });

    var script = "{";

    script += "run: function() { var v; return " + scripts.join(" + ") + "}";

    script += ", refs: " + JSON.stringify(refs);

    script += "}";

    return "block(" + script + ")";
  }
});

module.exports = CombinedBlockBinding;
