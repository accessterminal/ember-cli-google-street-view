# Ember-cli-google-street-view

A simple google street view component for ember-cli aplications.
[Demo](http://cometaworks.github.io/ember-cli-google-street-view)

## Installation

```
ember install ember-cli-google-street-view
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
