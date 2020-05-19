/* IIIF Curation Viewer - Customized ImageOverlay Leaflet plugin
 * http://codh.rois.ac.jp/software/iiif-curation-viewer/
 *
 * Copyright 2019 Center for Open Data in the Humanities, Research Organization of Information and Systems
 * Released under the MIT license
 *
 * Core contributor: Jun HOMMA (@2SC1815J)
 *
 * Based on
 * "ImageOverlay.js" (2-clause BSD License, Copyright (c) 2010-2013, Vladimir Agafonkin, Copyright (c) 2010-2011, CloudMade)
 *  https://github.com/Leaflet/Leaflet/blob/v0.7.7/src/layer/ImageOverlay.js
 * "Leaflet-IIIF" (MIT License, Copyright (c) 2014 Jack Reed)
 *  https://github.com/mejackreed/Leaflet-IIIF
 */
L.ImageOverlayCustom = L.Class.extend({
    includes: L.Mixin.Events,

    options: {
        opacity: 1,
        fitBounds: true
    },

    initialize: function(url, width, height, options) { // (String, width(px), height(px), Object)
        this._url = url;
        //----------------------------------------
        this._width = width;
        this._height = height;
        this._bounds = L.latLngBounds([0, 0], [height, width]);
        //----------------------------------------

        L.setOptions(this, options);
    },

    onAdd: function(map) {
        this._map = map;

        //----------------------------------------
        var mapSize = this._map.getSize();
        var tolerance = 0.8;
        var imageSize;
        var zoom = 1;
        for (var i = 5; i >= 0; i--) {
            var j = Math.pow(2, i);
            imageSize = {x: this._width / j, y: this._height / j};
            if (imageSize.x * tolerance < mapSize.x && imageSize.y * tolerance < mapSize.y) {
                zoom = j;
            }
        }
        var sw = this._map.options.crs.pointToLatLng(L.point(0, this._height), zoom);
        var ne = this._map.options.crs.pointToLatLng(L.point(this._width, 0), zoom);
        this._bounds = L.latLngBounds(sw, ne);
        this.maxNativeZoom = zoom;
        //----------------------------------------

        if (!this._image) {
            this._initImage();
        }

        map._panes.tilePane.appendChild(this._image); //map._panes.overlayPane.appendChild(this._image);

        map.on('viewreset', this._reset, this);

        if (map.options.zoomAnimation && L.Browser.any3d) {
            map.on('zoomanim', this._animateZoom, this);
        }
        //----------------------------------------
        if (this.options.fitBounds) {
            this._map.fitBounds(this._bounds, true);
        }
        this.x = this._width;
        this.y = this._height;
        //----------------------------------------

        this._reset();
    },

    onRemove: function(map) {
        map.getPanes().overlayPane.removeChild(this._image);

        map.off('viewreset', this._reset, this);

        if (map.options.zoomAnimation) {
            map.off('zoomanim', this._animateZoom, this);
        }
    },

    addTo: function(map) {
        map.addLayer(this);
        return this;
    },

    setOpacity: function(opacity) {
        this.options.opacity = opacity;
        this._updateOpacity();
        return this;
    },

    // TODO remove bringToFront/bringToBack duplication from TileLayer/Path
    bringToFront: function() {
        if (this._image) {
            this._map._panes.overlayPane.appendChild(this._image);
        }
        return this;
    },

    bringToBack: function() {
        var pane = this._map._panes.overlayPane;
        if (this._image) {
            pane.insertBefore(this._image, pane.firstChild);
        }
        return this;
    },

    setUrl: function(url) {
        this._url = url;
        this._image.src = this._url;
    },

    getAttribution: function() {
        return this.options.attribution;
    },

    _initImage: function() {
        this._image = L.DomUtil.create('img', 'leaflet-image-layer');

        if (this._map.options.zoomAnimation && L.Browser.any3d) {
            L.DomUtil.addClass(this._image, 'leaflet-zoom-animated');
        } else {
            L.DomUtil.addClass(this._image, 'leaflet-zoom-hide');
        }

        this._updateOpacity();

        //TODO createImage util method to remove duplication
        L.extend(this._image, {
            galleryimg: 'no',
            onselectstart: L.Util.falseFn,
            onmousemove: L.Util.falseFn,
            onload: L.bind(this._onImageLoad, this),
            src: this._url
        });
    },

    _animateZoom: function(e) {
        var map = this._map,
            image = this._image,
            scale = map.getZoomScale(e.zoom),
            nw = this._bounds.getNorthWest(),
            se = this._bounds.getSouthEast(),

            topLeft = map._latLngToNewLayerPoint(nw, e.zoom, e.center),
            size = map._latLngToNewLayerPoint(se, e.zoom, e.center)._subtract(topLeft),
            origin = topLeft._add(size._multiplyBy((1 / 2) * (1 - 1 / scale)));

        image.style[L.DomUtil.TRANSFORM] =
            L.DomUtil.getTranslateString(origin) + ' scale(' + scale + ') ';
    },

    _reset: function() {
        var image = this._image,
            topLeft = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
            size = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(topLeft);

        L.DomUtil.setPosition(image, topLeft);

        image.style.width = size.x + 'px';
        image.style.height = size.y + 'px';
    },

    _onImageLoad: function() {
        this.fire('load');
    },

    _updateOpacity: function() {
        L.DomUtil.setOpacity(this._image, this.options.opacity);
    }
});

L.imageOverlayCustom = function(url, width, height, options) {
    return new L.ImageOverlayCustom(url, width, height, options);
};