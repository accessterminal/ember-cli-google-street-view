# Ember-cli-google-street-view
[![Build Status](https://travis-ci.org/cometaworks/ember-cli-google-street-view.svg?branch=master)](https://travis-ci.org/cometaworks/ember-cli-google-street-view)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-google-street-view.svg)](http://emberobserver.com/addons/ember-cli-google-street-view)

A simple google street view component for ember-cli aplications.
[Demo](http://cometaworks.github.io/ember-cli-google-street-view)

## Installation

Run:
```bash
ember install ember-cli-google-street-view
```

Google's javascript library will be automatically referenced inside `<head>`. To use your API key, specify it in your application configuration in `config/environment.js`:

```javascript
var ENV = {
  // ...
  streetView: {
    apiKey: 'API-KEY-HERE',
    // or the clientId if using Maps for Work
    // https://developers.google.com/maps/documentation/business/clientside/#client_id
    clientId: 'CLIENT-ID-HERE'
  },
  // ...
};
```

If for some reason you want to prevent this addon from adding the script tag (e.g another library already does it), just specify:

```javascript
var ENV = {
  // ...
  streetView: {
    include: false
  },
  // ...
};
```

### Content Security Policy

Street View uses many resources from Google's servers, so the URLs to them have to be white listed.   You can set this by adding to the Content Security Policy defined in `config/environment.js` like so:

```js
ENV.contentSecurityPolicy = {
  'default-src': "'none'",
  'script-src': "'self' 'unsafe-eval' *.googleapis.com",
  'font-src': "'self' fonts.gstatic.com",
  'img-src': "'self' *.googleapis.com maps.gstatic.com *.gstatic.com",
  'style-src': "'self' 'unsafe-inline' *.googleapis.com"
},
```

You can find out more information on the CSP addon page [here](https://github.com/rwjblue/ember-cli-content-security-policy#ember-cli-content-security-policy).


## Usage

Use the `street-view` component in your templates:

```hbs
{{street-view lat=lat lng=lng}}
```

If you have the coords already in the google maps api form: `google.maps.LatLng(lat, lng)` you can also pass it directly to the component like so:

```hbs
{{street-view latLng=latLng}}
```

Note that you may need to assign a class and style the container element according to your needs. By default the component adds the class `street-view-container`.

## Actions

The component will send the corresponding actions to the street view control events:

- `positionChanged` - sent with a `{lat, lng}` object param when the street view possition changed
- `povChanged` - sent whenever the Street View's StreetViewPov changes. Note that this event may fire while the position, and pano ID, remain stable (currently receives `panorama` object as a parameter)
- `linksChanged` - sent whenever the Street View's links change (currently receives `panorama` object as a parameter)
- `panoChanged` - sent whenever the individual pano ID changes (currently receives `panorama` object as a parameter)

For more information, please refer to [Street View Events](https://developers.google.com/maps/documentation/javascript/streetview?hl=en#StreetViewEvents) documentation.

## Supported properties

The component supports the following properties:

- `lat`
- `lng`
- `latLng` = `google.maps.LatLng` class result.
- `zoom`
- `pov`
- `panControl`
- `panControlOptions`
- `zoomControl`
- `zoomControlOptions`
- `addressControl`
- `addressControlOptions`
- `linksControl`
- `fullscreenControl`
- `fullscreenControlOptions`
- `imageDateControl`

You can also pass in a `map` property with an existing Google maps instance. This component will create a Street View panorama bound to that existing map instance, with the same position.

For more information, please refer to [Street View Developer docs](https://developers.google.com/maps/documentation/javascript/streetview) documentation.

### Contributions

Make all Pull Requests to the `dev` branch.
