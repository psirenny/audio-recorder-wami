module.exports = function () {
  return {
    available: function (callback) {
      if (typeof navigator === 'undefined') return callback(false);
      return callback(!!navigator.mimeTypes['application/x-shockwave-flash']);
    },
    permission: function (callback) {
      return callback(true);
    },
    start: function (callback) {
      return callback();
    },
    stop: function (callback) {
      return callback();
    }
  };
};