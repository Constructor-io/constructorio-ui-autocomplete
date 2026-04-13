const JSDOMEnvironment = require('jest-environment-jsdom').default;

// Patch jsdom's LocationImpl so that setting window.location.href updates the
// document URL instead of throwing "Not implemented: navigation".
// This must run before any JSDOM instance is created (module-level).
const LocationImpl = require('jsdom/lib/jsdom/living/window/Location-impl.js').implementation;

LocationImpl.prototype._locationObjectNavigate = function (url) {
  this._relevantDocument._URL = url;
};

module.exports = JSDOMEnvironment;
