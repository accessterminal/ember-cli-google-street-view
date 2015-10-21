/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-google-street-view',

  contentFor: function(type, config) {
    if (type === 'head') {
      var config = config.streetView || {};

      if (config.include !== false) {
        var value = config.clientId || config.apiKey;
        var type = config.clientId ? 'client' : 'key';

        return '<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?' + type + '=' + value + '"></script>';
      }
    }
  }
};
