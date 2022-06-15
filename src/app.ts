import * as L from 'leaflet';
import './leaflet-svg-shape-markers';

delete (<any>L.Icon.Default.prototype)._getIconUrl;

L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

import './style.scss';

window.onload = () => {
	console.log('onload');

	let map = L.map('map').setView([51.505, -0.09], 13);
	let square = L.shapeMarker([51.505, -0.09], {
		shape: "square",
		radius: 20
	}).addTo(map);

	var diamond = L.shapeMarker([51.505, -0.09], {
		fillColor: "#cccccc",
		color: "black",
		shape: "diamond",
		radius: 200
	}).addTo(map);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	L.marker([51.5, -0.09]).addTo(map)
		.bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
		.openPopup();
};
