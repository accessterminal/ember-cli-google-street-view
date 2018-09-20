/* global google */
import Ember from 'ember';

const {
  on,
  observer,
  Component
} = Ember;

export default Component.extend({
  classNames: ['street-view-container'],

  map: null,
  panorama: null,
  lat: null,
  lng: null,
  latLng: null,
  zoom: 0,
  pov: null,
  height: null,
  width: null,

  // controls
  panControl: null,
  panControlOptions: null,
  zoomControl: null,
  zoomControlOptions: null,
  addressControl: null,
  addressControlOptions: null,
  linksControl: null,
  fullscreenControl: null,
  fullscreenControlOptions: null,
  imageDateControl: null,

  // events
  panoDidChange() {},
  _panoChanged() {
    this.panoDidChange();
    let panorama = this.get('panorama');
    this.sendAction('panoChanged', panorama);
  },

  linksDidChange() {},
  _linksChanged() {
    this.linksDidChange();
    let panorama = this.get('panorama');
    this.sendAction('linksChanged', panorama);
  },

  povDidChange() {},
  _povChanged() {
    this.povDidChange();
    let panorama = this.get('panorama');
    this.sendAction('povChanged', panorama);
  },

  positionDidChange() {},
  _positionChanged() {
    if (this.panorama) {
      this.positionDidChange();
      let position = this.panorama.getPosition();
      // let position = panorama.getPosition();

      this.sendAction('positionChanged', {
        lat: position.lat(),
        lng: position.lng()
      }, this.panorama);
    }
  },

  setLatLng: function() {
    let lat = this.latLng.lat();
    let lng = this.latLng.lng();
    this.set('lat', lat);
    this.set('lng', lng);
  },

  updatePanoramaPosition: on('init', observer('lat', 'lng', 'latLng', 'panorama', 'pov', function() {
    if (this.latLng) {
      this.setLatLng();
    }
    let lat = this.get('lat');
    let lng = this.get('lng');
    let pov = this.get('pov');
    let panorama = this.get('panorama');

    if (panorama) {
      if (lat && lng) {
        panorama.setPosition({ lat, lng });
      }

      if (pov) {
        panorama.setPov(pov);
      }
    }
  })),

  didInsertElement() {
    this.createStreetView();
  },

  createOptionsObject() {
    if (!(this.lat && this.lng) && this.latLng) {
      this.setLatLng();
    }
    let position = new google.maps.LatLng(this.lat, this.lng);
    let optionsKeys = [
     "pov",
     "zoom",
     "panControl",
     "panControlOptions",
     "zoomControl",
     "zoomControlOptions",
     "addressControl",
     "addressControlOptions",
     "linksControl",
     "fullscreenControl",
     "fullscreenControlOptions",
     "imageDateControl"
    ];
    let optionsProperties = [
     this.pov,
     this.zoom,
     this.panControl,
     this.panControlOptions,
     this.zoomControl,
     this.zoomControlOptions,
     this.addressControl,
     this.addressControlOptions,
     this.linksControl,
     this.fullscreenControl,
     this.fullscreenControlOptions,
     this.imageDateControl
    ];

    let options = {
     position: position
    };

    for (let i = 0; i < optionsProperties.length; i++) {
     if (optionsProperties[i] !== null) {
       options[optionsKeys[i]] = optionsProperties[i];
     }
    }

    return options;
  },

  createStreetView() {
    let options = this.createOptionsObject();
    let width = this.width;
    let height = this.height;
    let $this = this.$();

    $this.css({ width, height });

    let panorama = new google.maps.StreetViewPanorama($this.get(0), options);

    panorama.addListener('pano_changed', Ember.run.bind(this, '_panoChanged'));
    panorama.addListener('links_changed', Ember.run.bind(this, '_linksChanged'));
    panorama.addListener('position_changed', Ember.run.bind(this, '_positionChanged'));
    panorama.addListener('pov_changed', Ember.run.bind(this, '_povChanged'));

    this.set('panorama', panorama);

    let map = this.get('map');

    if (map) {
      map.setStreetView(panorama);
      panorama.setPosition(map.getCenter());
    }
  }
});
