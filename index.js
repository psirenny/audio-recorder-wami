module.exports = function (options) {
  return {
    available: function (callback) {
      if (typeof navigator === 'undefined') return callback(false);
      return callback(!!navigator.mimeTypes['application/x-shockwave-flash']);
    },
    permission: function (callback) {
      this.rec = {};
      Wami.setup({
        id: options.elementId,
        onReady: callback,
        swfUrl: options.swfUrl
      });
    },
    send: function (url, callback) {
      callback(null, this.rec.url);
    },
    start: function (callback) {
      var self = this;

      var error = Wami.nameCallback(function (err) {
        self.rec.callback(err[0]);
      });

      var stop =  Wami.nameCallback(function (data) {
        self.rec.url = data[0].url;
        self.rec.callback();
      });

      Wami.startRecording(options.uploadUrl, null, stop, error);
      return callback();
    },
    stop: function (callback) {
      this.rec.callback = callback;
      Wami.stopRecording();
    }
  };
};