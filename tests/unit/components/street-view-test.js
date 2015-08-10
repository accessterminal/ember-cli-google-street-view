/* global google */
import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('street-view', {
  // specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar']
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('that lat and lng are assigned properly', function ( assert ) {

  let component = this.subject();
  component.set('lat', 15.45);
  component.set('lng', 17.43);
  this.render();

  Ember.run( function() {
    component.createStreetView();
    assert.equal(component.lat, 15.45);
    assert.equal(component.lng, 17.43);
  } );

});

test('that options are assigned properly to the map', function( assert ) {
  let component = this.subject();
  let lat = 12.34;
  let lng = 43.21;
  let height = "600px";
  let width = "400px";
  let options = {
    position: new google.maps.LatLng(lat, lng),
    pov: {
      heading: 165,
      pitch: 4
    },
    zoom: 6
  };
  this.$().css({width: width, height: height});
  let streetView = new google.maps.StreetViewPanorama(this.$().get(0), options);
  component.set('map', streetView);
  this.render();

  Ember.run(function() {
    let map = component.map;

    //position
    assert.equal(map.position.A, options.position.A);
    assert.equal(map.position.A, 12.34);
    assert.equal(map.position.F, options.position.F);
    assert.equal(map.position.F.toFixed(2), 43.21);

    //pov
    assert.equal(map.pov.heading, options.pov.heading);
    assert.equal(map.pov.heading, 165);
    assert.equal(map.pov.pitch, options.pov.pitch);
    assert.equal(map.pov.pitch, 4);

    //zoom
    assert.equal(map.zoom, options.zoom);
    assert.equal(map.zoom, 6);
  });
});