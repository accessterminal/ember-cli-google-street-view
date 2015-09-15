# Ember-cli-google-street-view

A simple google street view component for ember-cli aplications.
[Demo](http://cometaworks.github.io/ember-cli-google-street-view)

## Installation

```
ember install ember-cli-google-street-view
```

Google's javascript library will be automatically referenced inside `<head>`. To use your API key, specify it in your application configuration in `config/environment.js`:

```javascript
var ENV = {
  // ...
  streetView: {
    apiKey: 'AIzaSyAnY39WJpdVPX7EOASb2Sz0MbJmbZHRDX0'
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

## Usage

View Component

Example:
`{{street-view lat=lat lng=lng}}`

**Supports:**

_Properties_

`lat`

`lng`

`height` - cannot be in `%`

`width`

`zoom`

`pov`

_Controls_

`panControl`

`panControlOptions`

`zoomControl`

`zoomControlOptions`

`addressControl`

`addressControlOptions`

`linksControl`

_Events_

`panoChanged`

`linksChanged`

`positionChanged`

`povChanged`


Add reference to the map control in the index.html

```
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=[API-KEY]"></script>
```
