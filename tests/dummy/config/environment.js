/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    contentSecurityPolicy: {
      'default-src': " * 'none' 'unsafe-inline' http://fonts.googleapis.com http://localhost:4200",
      // Allow scripts
      'script-src': " * 'self' 'unsafe-eval' http://*.googleapis.com http://maps.gstatic.com http://dev.virtualearth.net/REST/V1/Imagery/Copyright/en-us/Road/1/-86.9322…so=r2&key=",
      'font-src': " * 'self' http://fonts.gstatic.com", // Allow fonts
      'connect-src': " * 'self' http://maps.gstatic.com", // Allow data (ajax/websocket)
      'img-src': " * 'self' http://*.googleapis.com http://maps.gstatic.com http://csi.gstatic.com/csi?v=2&s=mapsapi3&action=apiboot&rt=jl.73,mc.477,mb.704,ep.970,vt.1027,prt.1027,plt.623,mt.1028&size=620x0&maptype=m&vr=1  ",
      // Allow inline styles and loaded CSS
      'style-src': " * 'self' 'unsafe-inline' http://fonts.googleapis.com http://maps.gstatic.com "
    },
    modulePrefix: 'dummy',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    streetView: {
      apiKey: 'AIzaSyAnY39WJpdVPX7EOASb2Sz0MbJmbZHRDX0'
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.baseURL = '/ember-cli-google-street-view'
  }

  return ENV;
};
