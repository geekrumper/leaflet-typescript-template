import * as L from 'leaflet';

declare module 'leaflet' {
	function shapeMarker(latlng: L.LatLngExpression, options?: ShapeMarkerOptions): ShapeMarker;

	interface ShapeMarkerOptions extends L.PathOptions {
		shape: 'diamond' | 'square' | 'triangle' | 'triangle-up' | 'triangle-down' | 'arrowhead' | 'arrowhead-up' | 'arrowhead-down' | 'circle' | 'x';
		radius: number;
	}

	class ShapeMarker extends L.Path {
		options: ShapeMarkerOptions;

		initialize(latlng: L.LatLngExpression, options: ShapeMarkerOptions);
		setLatLng(latlng: L.LatLngExpression): L.Evented;
		getLatLng(): L.LatLngExpression;
		setRadius(radius: number): ShapeMarker;
		getRadius(): number;
		setStyle(style: ShapeMarkerOptions);
	}
}
