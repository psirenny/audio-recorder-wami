module.exports = function (options) {
  return {
    available: function (callback) {
      if (typeof navigator === 'undefined') return callback(false);
      return callback(!!navigator.mimeTypes['application/x-shockwave-flash']);
    },
    clear: function (callback) {
      this.rec = {};
      callback();
    },
    config: function (opts, callback) {
      if (opts.uploadUrl) options.uploadUrl = opts.uploadUrl;
      callback();
    },
    name: 'wami',
    permission: function (callback) {
      this.rec = {};
      Wami.setup({
        id: options.elementId,
        onReady: callback,
        swfUrl: options.swfUrl
      });
    },
    send: function (url, callback) {
      callback(this.rec.err, this.rec.res);
    },
    start: function (callback) {
      var self = this
        , start = Wami.nameCallback(callback);

      var stop =  Wami.nameCallback(function (res) {
        self.rec.res = res[0];
        self.rec.callback();
      });

      var error = Wami.nameCallback(function (res) {
        self.rec.err = res[0];
        self.rec.callback();
      });

      Wami.startRecording(options.uploadUrl, start, stop, error);
    },
    stop: function (callback) {
      this.rec.callback = callback;
      Wami.stopRecording();
    }
  };
};
