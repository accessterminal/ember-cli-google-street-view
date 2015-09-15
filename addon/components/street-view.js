/* global google */
import Ember from 'ember';

export default Ember.Component.extend({
  map: null,
  lat: null,
  lng: null,
  height: "400px",
  width: "600px",
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
  panoChanged: null,
  linksChanged: null,
  positionChanged: null,
  povChanged: null,

  didInsertElement() {
    this.createStreetView();
  },

  createStreetView() {

    let width = this.width;
    let height = this.height;
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

    this.$().css({width: width, height: height});
    let streetView = new google.maps.StreetViewPanorama(this.element, options);

    if( this.panoChanged ) {
      google.maps.event.addListener(streetView, 'pano_changed', () => {
        this.panoChanged();
      });
    }

    if( this.linksChanged ) {
      google.maps.event.addListener(streetView, 'links_changed', () => {
        this.linksChanged();
      });
    }

    if( this.positionChanged ) {
      google.maps.event.addListener(streetView, 'position_changed', () => {
        this.positionChanged();
      });
    }

    if( this.povChanged ) {
      google.maps.event.addListener(streetView, 'pov_changed', () => {
        this.povChanged();
      });
    }

    this.set('map', streetView);

    //bootstrap tabs fix for grey display
    // $(document).on('shown.bs.tab', function () {
    //       google.maps.event.trigger(streetView, 'resize');
    //   });
  }
});
