/* IIIF Curation Viewer - Sliders control Leaflet plugin
 * http://codh.rois.ac.jp/software/iiif-curation-viewer/
 *
 * Copyright 2019 Center for Open Data in the Humanities, Research Organization of Information and Systems
 * Released under the MIT license
 *
 * Core contributor: Jun HOMMA (@2SC1815J)
 *
 * Based on
 * "L.control.layers" (2-clause BSD License, Copyright (c) 2010-2016, Vladimir Agafonkin, Copyright (c) 2010-2011, CloudMade)
 *  https://github.com/Leaflet/Leaflet/blob/v1.3.1/src/control/Control.Layers.js
 *  https://github.com/Leaflet/Leaflet/blob/v0.7.7/src/control/Control.Layers.js
 * "Leaflet.Control.Opacity" (MIT License, Copyright (c) 2018 Yasunori Kirimoto)
 *  https://github.com/dayjournal/Leaflet.Control.Opacity
 */
L.Control.Sliders = L.Control.extend({
    options: {
        collapsed: false,
        position: 'topright',
        header: null,
        footer: null
    },

    initialize: function(sliders, options) {
        L.setOptions(this, options);

        this._sliders = [];
        this._lastZIndex = 0;
        this._handlingClick = false;

        for (var i in sliders) {
            this._addSlider(sliders[i]);
        }
    },

    onAdd: function(map) {
        this._initLayout();
        this._update();

        this._map = map;

        return this._container;
    },

    expand: function() {
        L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
        this._form.style.height = null;
        var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
        if (acceptableHeight < this._form.clientHeight) {
            L.DomUtil.addClass(this._form, 'leaflet-control-layers-scrollbar');
            this._form.style.height = acceptableHeight + 'px';
        } else {
            L.DomUtil.removeClass(this._form, 'leaflet-control-layers-scrollbar');
        }
        return this;
    },

    collapse: function() {
        L.DomUtil.removeClass(this._container, 'leaflet-control-layers-expanded');
        return this;
    },

    _initLayout: function() {
        var className = 'leaflet-control-layers',
            container = this._container = L.DomUtil.create('div', className),
            collapsed = this.options.collapsed;

        container.setAttribute('aria-haspopup', true);

        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.disableScrollPropagation(container);

        var form = this._form = L.DomUtil.create('form', className + '-list');

        if (this.options.header) {
            var header = L.DomUtil.create('div');
            header.innerHTML = this.options.header;
            form.appendChild(header);
        }

        if (collapsed) {
            this._map.on('click', this.collapse, this);

            if (!L.Browser.android) {
                L.DomEvent
                    .on(container, 'mouseover', this._expand, this)
                    .on(container, 'mouseout', this._collapse, this);
            }
        }

        var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
        link.href = '#';
        link.title = 'Sliders';

        if (L.Browser.touch) {
            L.DomEvent.on(link, 'click', L.DomEvent.stop);
            L.DomEvent.on(link, 'click', this.expand, this);
        } else {
            L.DomEvent.on(link, 'focus', this.expand, this);
        }

        if (!collapsed) {
            this.expand();
        }

        this._slidersList = L.DomUtil.create('div', className + '-overlays', form);

        if (this.options.footer) {
            var footer = L.DomUtil.create('div');
            footer.innerHTML = this.options.footer;
            form.appendChild(footer);
        }

        container.appendChild(form);
        L.DomUtil.addClass(container, 'leaflet-control-sliders');
    },

    _getSlider: function(id) {
        for (var i = 0; i < this._sliders.length; i++) {
            if (this._sliders[i] && this._sliders[i].id === id) {
                return this._sliders[i];
            }
        }
    },

    _addSlider: function(slider) {
        this._sliders.push(slider);
    },

    _update: function() {
        if (!this._container) { return this; }

        if (L && !L.DomUtil.empty) { //for Leaflet 0.7.7
            L.DomUtil.empty = function(el) {
                while (el.firstChild) {
                    el.removeChild(el.firstChild);
                }
            };
        }
        L.DomUtil.empty(this._slidersList);

        for (var i = 0; i < this._sliders.length; i++) {
            this._addItem(this._sliders[i]);
        }

        return this;
    },

    _addItem: function(obj) {
        var label = document.createElement('label');
        var input = document.createElement('input');
        input.type = 'range'; //IEは10以降で対応
        input.className = 'leaflet-control-layers-range';
        input.min = 0;
        input.max = 100;
        input.value = ('initialValue' in obj) ? obj.initialValue : 100;
        input.sliderId = obj.id;
        if (obj.title) {
            input.title = obj.title;
        }

        L.DomEvent.on(input, 'change', this._onInputChange, this);

        var name = document.createElement('span');
        name.innerHTML = ' ' + obj.name;

        var holder = document.createElement('div');
        label.appendChild(holder);
        holder.appendChild(name);
        holder.appendChild(input);

        var container = this._slidersList;
        container.appendChild(label);

        return label;
    },

    _onInputChange: function(e) {
        this._handlingClick = true;

        var input = e.target;
        if (input) {
            var slider = this._getSlider(input.sliderId);
            if (slider && typeof slider.callback === 'function') {
                slider.callback(input.value);
            }
        }

        this._handlingClick = false;

        this._refocusOnMap();
    },

    _expand: function () {
        return this.expand();
    },

    _collapse: function () {
        return this.collapse();
    }
});

L.control.sliders = function(sliders, options) {
    return new L.Control.Sliders(sliders, options);
};