import Ember from 'ember';

export default Ember.Component.extend({
	map: null,
	lat: null,
	lng: null,
	height: "550px",
	width: "400px",

	didInsertElement: function(){
		let lat = this.get('lat');
		let lng = this.get('lng');
		let width = this.get('width');
		let height = this.get('height');
		
		let options = {
			position: new google.maps.LatLng(lat, lng),
			pov: {
				heading: 165,
				pitch: 0
			},
			zoom: 1
		};
		this.$().css({width: width, height: height});
		let streetView = new google.maps.StreetViewPanorama(this.$().get(0), options);
		this.set('map', streetView);
	}
});
