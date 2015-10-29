/* global google */
import Ember from 'ember';

const {
  K,
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

  // events
  panoDidChange: K,
  _panoChanged() {
    this.panoDidChange();
    let panorama = this.get('panorama');
    this.sendAction('panoChanged', panorama);
  },

  linksDidChange: K,
  _linksChanged() {
    this.linksDidChange();
    let panorama = this.get('panorama');
    this.sendAction('linksChanged', panorama);
  },

  povDidChange: K,
  _povChanged() {
    this.povDidChange();
    let panorama = this.get('panorama');
    this.sendAction('povChanged', panorama);
  },

  positionDidChange: K,
  _positionChanged() {
    this.positionDidChange();

    let panorama = this.get('panorama');
    let position = panorama.getPosition();

    this.sendAction('positionChanged', {
      lat: position.lat(),
      lng: position.lng()
    }, panorama);
  },

  updatePanoramaPosition: on('init', observer('lat', 'lng', 'panorama', function() {
    let lat = this.get('lat');
    let lng = this.get('lng');
    let panorama = this.get('panorama');

    if (panorama && lat && lng) { panorama.setPosition({lat, lng}); }
  })),

  didInsertElement() {
    this.createStreetView();
  },

  createOptionsObject() {
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
       "linksControl"
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
       this.linksControl
     ];

     let options = {
       position: position
     };

     for(let i=0; i < optionsProperties.length; i++) {
       if( optionsProperties[i] !== null ) {
         options[optionsKeys[i]] = optionsProperties[i];
       }
     }

    return options;
  },

  createStreetView() {
    let options = this.createOptionsObject();
    let width = this.width;
    let height = this.height;
    this.$().css({width: width, height: height});
    let panorama = new google.maps.StreetViewPanorama(this.$().get(0), options);
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
