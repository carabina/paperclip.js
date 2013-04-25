// Generated by CoffeeScript 1.6.2
var StringBuilder,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

StringBuilder = (function(_super) {
  __extends(StringBuilder, _super);

  /*
  */


  StringBuilder.prototype.type = "string";

  /*
  */


  function StringBuilder(buffer) {
    if (buffer == null) {
      buffer = "";
    }
    this._buffer = buffer;
  }

  /*
  */


  StringBuilder.prototype.write = function(info, callback) {
    info.buffer.push(this._buffer);
    return callback();
  };

  /*
  */


  StringBuilder.prototype.clone = function() {
    return new StringBuilder(this._buffer);
  };

  return StringBuilder;

})(require("./base"));

module.exports = StringBuilder;