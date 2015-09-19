/* global google */
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['street-view-container'],

  panorama: null,
  lat: null,
  lng: null,
  zoom: 0,
  pov: null,

  // controls
  panControl: null,
  panControlOptions: null,
  zoomControl: null,
  zoomControlOptions: null,
  addressControl: null,
  addressControlOptions: null,
  linksControl: null,

  // events
  panoDidChange: Ember.K,
  _panoChanged() {
    this.panoDidChange();
    let panorama = this.get('panorama');
    this.sendAction('panoChanged', panorama);
  },

  linksDidChange: Ember.K,
  _linksChanged() {
    this.linksDidChange();
    let panorama = this.get('panorama');
    this.sendAction('linksChanged', panorama);
  },

  povDidChange: Ember.K,
  _povChanged() {
    this.povDidChange();
    let panorama = this.get('panorama');
    this.sendAction('povChanged', panorama);
  },

  positionDidChange: Ember.K,
  _positionChanged() {
    this.positionDidChange();

    let panorama = this.get('panorama');
    let position = panorama.getPosition();

    this.sendAction('positionChanged', {
      lat: position.lat(),
      lng: position.lng()
    }, panorama);
  },

  updatePanoramaPosition: Ember.observer('lat', 'lng', function() {
    let lat = this.get('lat');
    let lng = this.get('lng');
    let panorama = this.get('panorama');

    if (panorama) { panorama.setPosition({lat, lng}); }
  }),

  didInsertElement() {
    this.createStreetView();
  },

  createOptionsObject() {
    let optionsKeys = [
      'pov',
      'zoom',
      'panControl',
      'panControlOptions',
      'zoomControl',
      'zoomControlOptions',
      'addressControl',
      'addressControlOptions',
      'linksControl'
    ];


    let lat = this.get('lat');
    let lng = this.get('lng');
    let position = {lat, lng};

    let options = {
      position
    };

    optionsKeys.forEach(function(key) {
      let prop = Ember.get(this, key);
      if (prop !== null) {
        options[key] = prop;
      }
    }, this);

    return options;
  },

  createStreetView() {
    let options = this.createOptionsObject();

    let panorama = new google.maps.StreetViewPanorama(this.element, options);
    panorama.addListener('pano_changed', Ember.run.bind(this, '_panoChanged'));
    panorama.addListener('links_changed', Ember.run.bind(this, '_linksChanged'));
    panorama.addListener('position_changed', Ember.run.bind(this, '_positionChanged'));
    panorama.addListener('pov_changed', Ember.run.bind(this, '_povChanged'));

    this.set('panorama', panorama);
  }
});
