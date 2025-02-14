L.SVG.include({
	_updateShape: function _updateShape(layer) {

		var p = layer._point;
		var s = layer._radius;
		var shape = layer.options.shape;

		if(shape === "diamond"){
			var d = "M"+ (p.x-(Math.sqrt(2)*s))+ " "+ (p.y)+ " L " + (p.x) +" "+ (p.y-(Math.sqrt(2)*s))+ " L"  + (p.x+(Math.sqrt(2)*s)) + " " + (p.y)+ " L"  + (p.x) + " " + (p.y+(Math.sqrt(2)*s)) +" L"  + (p.x-(Math.sqrt(2)*s)) + " " + (p.y);
			this._setPath(layer, d);
		}
		if(shape === "square"){
			var d = "M"+ (p.x-s)+ " "+ (p.y-s)+ " L " + (p.x+s) +" "+ (p.y-s)+ " L"  + (p.x+s) + " " + (p.y+s)+ " L"  + (p.x-s) + " " + (p.y+s) +" L"  + (p.x-s) + " " + (p.y-s);
			this._setPath(layer, d);
		}
		if (shape === "triangle" || shape === "triangle-up") {
			var d = "M" + (p.x - (13/10*s)) + " " + (p.y + (0.75*s)) + " L" + (p.x) + " " + (p.y - (1.5*s)) + " L" + (p.x + (13/10*s)) + " " + (p.y + (0.75*s)) + " Z";
			this._setPath(layer, d);
		}
		if (shape === "triangle-down") {
			var d = "M" + (p.x - (13/10*s)) + " " + (p.y - (0.75*s)) + " L" + (p.x) + " " + (p.y + (1.5*s)) + " L" + (p.x + (13/10*s)) + " " + (p.y - (0.75*s)) + " Z";
			this._setPath(layer, d);
		}
		if (shape === "arrowhead" || shape === "arrowhead-up") {
			var d = "M " + (p.x + (1.3*s)) + " " + (p.y + (1.3*s)) + " L " + (p.x) + " " + (p.y - (1.3*s)) + " L " + (p.x - (1.3*s)) + " " + (p.y + (1.3*s)) + " L " + (p.x) + " " + (p.y + (0.5 * s)) + " L " + (p.x + (1.3*s)) + " " + (p.y + (1.3*s)) + " Z";
			this._setPath(layer, d);
		}
		if (shape === "arrowhead-down") {
			var d = "M " + (p.x - (1.3*s)) + " " + (p.y - (1.3*s)) + " L " + (p.x) + " " + (p.y + (1.3*s)) + " L " + (p.x + (1.3*s)) + " " + (p.y - (1.3*s)) + " L " + (p.x) + " " + (p.y - (0.5 * s)) + " L " + (p.x - (1.3*s)) + " " + (p.y - (1.3*s)) + " Z";
			this._setPath(layer, d);
		}
		if (shape === "circle") {
			this._updateCircle(layer)
		}
		if (shape === "x") {
			s = s / 2;
			var d = 'M' + (p.x + s) + ',' + (p.y + s) +
				'L' + (p.x - s) + ',' + (p.y - s) +
				'M' + (p.x - s) + ',' + (p.y + s) +
				'L' + (p.x + s) + ',' + (p.y - s);
			this._setPath(layer, d);
		}
	}
});

L.ShapeMarker = L.Path.extend({
	options: {
		fill: true,
		shape: 'triangle',
		radius: 10
	},

	initialize: function (latlng, options) {
		L.setOptions(this, options);
		this._latlng = L.latLng(latlng);
		this._radius = this.options.radius;
	},

	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);
		this.redraw();
		return this.fire('move', {latlng: this._latlng});
	},

	getLatLng: function () {
		return this._latlng;
	},

	setRadius: function (radius) {
		this.options.radius = this._radius = radius;
		return this.redraw();
	},

	getRadius: function () {
		return this._radius;
	},

	setStyle : function (options) {
		var radius = options && options.radius || this._radius;
		L.Path.prototype.setStyle.call(this, options);
		this.setRadius(radius);
		return this;
	},

	_project: function () {
		this._point = this._map.latLngToLayerPoint(this._latlng);
		this._updateBounds();
	},

	_updateBounds: function () {
		var r = this._radius,
			r2 = this._radiusY || r,
			w = this._clickTolerance(),
			p = [r + w, r2 + w];
		this._pxBounds = new L.Bounds(this._point.subtract(p), this._point.add(p));
	},

	_update: function () {
		if (this._map) {
			this._updatePath();
		}
	},

	_updatePath: function () {
		this._renderer._updateShape(this);
	},

	_empty: function () {
		return this._size && !this._renderer._bounds.intersects(this._pxBounds);
	},

	toGeoJSON: function () {
		return L.GeoJSON.getFeature(this, {
			type: 'Point',
			coordinates: L.GeoJSON.latLngToCoords(this.getLatLng())
		});
	}

});


// @factory L.shapeMarker(latlng: LatLng, options? ShapeMarker options)
//
L.shapeMarker = function shapeMarker(latlng, options) {
	return new L.ShapeMarker(latlng, options);
};
