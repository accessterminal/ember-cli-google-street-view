import Ember from 'ember';
import layout from '../templates/components/street-component';

export default Ember.Component.extend({
  layout: layout,
  lat: 51.492148,
  lng: -0.1930833,
  height: "600px",
  width: "100%",
  zoom:0,
  pov: {
  	heading: 165,
  	pitch: 0
  },

  panoChanged: function(){
  	Ember.Logger.debug('pano_changed happened');
  },

  linksChanged: function(){
  	Ember.Logger.debug('links_changed happened');
  },

  positionChanged: function(){
  	Ember.Logger.debug('position_changed happened');
  },

  povChanged: function(){
  	Ember.Logger.debug('pov_changed happened');
  }
});
