// Generated by CoffeeScript 1.6.2
var Base, async;

async = require("async");

Base = (function() {
  /*
  */
  function Base() {
    this._children = [];
  }

  /*
  */


  Base.prototype.load = function(info, callback) {};

  /*
  */


  Base.prototype.write = function(info, callback) {
    var _this = this;

    return this._writeHead(info, function(err) {
      if (err != null) {
        return callback(err);
      }
      return _this._writeChildren(info, function(err) {
        if (err != null) {
          return callback(err);
        }
        return _this._writeTail(info, function(err) {
          return callback(err, info);
        });
      });
    });
  };

  /*
  */


  Base.prototype._writeHead = function(info, callback) {
    return callback();
  };

  /*
  */


  Base.prototype._writeChildren = function(info, callback) {
    return Base.writeEachItem(this._children, info, callback);
  };

  /*
  */


  Base.prototype._writeTail = function(info, callback) {
    return callback();
  };

  /*
  */


  Base.prototype.addChild = function() {
    var child, _i, _len, _results;

    _results = [];
    for (_i = 0, _len = arguments.length; _i < _len; _i++) {
      child = arguments[_i];
      child.parent = this;
      _results.push(this._children.push(child));
    }
    return _results;
  };

  /*
  */


  Base.writeEachItem = function(source, info, callback) {
    return async.eachSeries(source, (function(child, next) {
      return child.write(info, next);
    }), callback);
  };

  /*
  */


  Base.cloneEach = function(source) {
    var item, items, _i, _len;

    items = [];
    for (_i = 0, _len = source.length; _i < _len; _i++) {
      item = source[_i];
      items.push(item.clone());
    }
    return items;
  };

  return Base;

})();

module.exports = Base;