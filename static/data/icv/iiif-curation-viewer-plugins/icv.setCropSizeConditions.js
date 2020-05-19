/*
 * IIIF Curation Viewer - Crop size conditions set plugin
 * http://codh.rois.ac.jp/software/iiif-curation-viewer/
 *
 * Copyright 2019 Center for Open Data in the Humanities, Research Organization of Information and Systems
 * Released under the MIT license
 *
 * Core contributor: Jun HOMMA (@2SC1815J)
 */
var ICVSetCropSizeConditions = function(config) {
    'use strict';
    var pluginHost = typeof iiifViewer !== 'undefined' ? iiifViewer : void 0;
    var err;

    //依存関係の確認
    if (!pluginHost) {
        err = new Error(); logError('Plugin host not found.', err.lineNumber);
        return;
    }

    //オプション設定
    var conf = configure(config, {
        //デフォルト選択サイズ
        enableDefaultSize: false,
        defaultWidth: 100,
        defaultHeight: 100,
        keepDefaultAspectRatio: false,
        //最小選択サイズ
        enableMinimumSize: false,
        minPercentageToCanvasShortSideLength: 10 //単位は %
    });

    var lng = iiifViewer.getLang();

    iiifViewer.setEventHandler(L.Draw.Event.DRAWSTART, function(/*e*/) {
        //console.log(e);
        //e: Object { layerType: "rectangle", type: "draw:drawstart", target: Object }
        var text = (lng !== 'ja') ? 'Select Options' : '選択設定';
        var $config = $('<li><a id="leaflet-draw-actions-crop_size_config" href="#">' + text + '</a></li>').on('click dblclick mousedown touchstart', function(e) {
            e.stopPropagation();
            if (document.getElementById('crop_size_config_win') === null) {
                var title = (lng !== 'ja') ? 'Options for Region Selection' : '領域選択の設定';
                //デフォルト選択サイズ
                var labelDefaultSizeEnable = (lng !== 'ja') ? 'Use default selection size' : 'デフォルト選択サイズを利用する';
                var labelDefaultSizeWidth = (lng !== 'ja') ? 'Width (pixel)' : '幅（ピクセル）';
                var labelDefaultSizeHeight = (lng !== 'ja') ? 'Height (pixel)' : '高さ（ピクセル）';
                var labelDefaultSizeKeepAspectRatio = (lng !== 'ja') ? 'Keep aspect ratio when resizing (experimental)' : 'サイズ変更中に縦横比を維持する（実験的）';
                //最小選択サイズ
                var labelMinSizeEnable = (lng !== 'ja') ? 'Use minimum selection size' : '最小選択サイズ制限を利用する';
                //
                var textApply = (lng !== 'ja') ? 'Apply' : '適用';
                var textClose = (lng !== 'ja') ? 'Close' : '閉じる';
                var setCropSizeConfigModal =
                    '<div class="modal fade" tabindex="-1" id="crop_size_config_win">' +
                    '  <div class="modal-dialog modal-sm" id="crop_size_config_dialog">' +
                    '    <div class="modal-content">' +
                    '      <div class="modal-body">' +
                    '        <h4 id="crop_size_config_title" class="curation_list_title" style="margin-bottom: 20px;">' + title + '</h4>' +
                    '        <form id="crop_size_config_form">' +
                    '          <div>' +
                    '            <div class="form-group">' +
                    '              <div class="checkbox">' +
                    '                <label>' +
                    '                  <input type="checkbox" id="default_crop_size_enable"> ' + labelDefaultSizeEnable +
                    '                </label>' +
                    '              </div>' +
                    '            </div>' +
                    '            <fieldset id="default_crop_size_width_and_height" style="margin-left: 15px;">' +
                    '              <div class="form-group">' +
                    '                <label for="default_crop_size_width" class="control-label">' + labelDefaultSizeWidth + '</label>' +
                    '                <input class="form-control" id="default_crop_size_width" type="number" min="1" required>' +
                    '                <div class="help-block with-errors"></div>' +
                    '              </div>' +
                    '              <div class="form-group">' +
                    '                <label for="default_crop_size_height" class="control-label">' + labelDefaultSizeHeight + '</label>' +
                    '                <input class="form-control" id="default_crop_size_height" type="number" min="1" required>' +
                    '                <div class="help-block with-errors"></div>' +
                    '              </div>' +
                    '              <div class="form-group">' +
                    '                <div class="checkbox">' +
                    '                  <label>' +
                    '                    <input type="checkbox" id="default_crop_size_keep_aspect_ratio"> ' + labelDefaultSizeKeepAspectRatio +
                    '                  </label>' +
                    '                </div>' +
                    '              </div>' +
                    '            </fieldset>' +
                    '          </div>' +
                    '          <div>' +
                    '            <div class="form-group">' +
                    '              <div class="checkbox">' +
                    '                <label>' +
                    '                  <input type="checkbox" id="min_crop_size_enable"> ' + labelMinSizeEnable +
                    '                </label>' +
                    '              </div>' +
                    '            </div>' +
                    '          </div>' +
                    '        </form>' +
                    '      </div>' +
                    '      <div class="modal-footer modal-footer-custom">' +
                    '        <button type="button" class="btn btn-default" id="crop_size_config_apply">'+ textApply + '</button>' +
                    '        <button type="button" class="btn btn-default" data-dismiss="modal" id="crop_size_config_close">' + textClose + '</button>' +
                    '      </div>' +
                    '    </div>' +
                    '  </div>' +
                    '</div>';
                $('#curation_list_win').after(setCropSizeConfigModal);
                $('#crop_size_config_win').on('show.bs.modal', function() {
                    //デフォルト選択サイズ
                    $('#default_crop_size_enable').prop('checked', conf.enableDefaultSize);
                    $('#default_crop_size_width_and_height').prop('disabled', !conf.enableDefaultSize);
                    $('#default_crop_size_width').val(conf.defaultWidth);
                    $('#default_crop_size_height').val(conf.defaultHeight);
                    $('#default_crop_size_keep_aspect_ratio').prop('checked', conf.keepDefaultAspectRatio);
                    //最小選択サイズ
                    $('#min_crop_size_enable').prop('checked', conf.enableMinimumSize);
                    $('#min_crop_size_width_and_height').prop('disabled', !conf.enableMinimumSize);
                    $('#min_crop_size_width').val(conf.minWidth);
                    $('#min_crop_size_height').val(conf.minHeight);
                    //
                    $('#crop_size_config_form').validator('validate');
                });
                $('#crop_size_config_form').validator();
                $('#default_crop_size_enable').on('change', function() {
                    var checked = $(this).prop('checked');
                    $('#default_crop_size_width_and_height').prop('disabled', !checked);
                });
                $('#default_crop_size_width, #default_crop_size_height').on('keydown', function(e) {
                    e.stopPropagation();
                });
                $('#crop_size_config_apply').on('click', function() {
                    //デフォルト選択サイズ
                    var hasErrorDefaultSize = false;
                    var w = $('#default_crop_size_width').val();
                    var h = $('#default_crop_size_height').val();
                    var enableDefaultSize = $('#default_crop_size_enable').prop('checked');
                    if (enableDefaultSize) {
                        if (w && h && w.match(/^[0-9]+$/) && h.match(/^[0-9]+$/)) {
                            w = parseInt(w, 10);
                            h = parseInt(h, 10);
                            if (isNaN(w) || isNaN(h) || w < 1 || h < 1) {
                                hasErrorDefaultSize = true;
                            }
                        } else {
                            hasErrorDefaultSize = true;
                        }
                    }
                    //最小選択サイズ
                    var hasErrorMinimumSize = false;
                    var enableMinimumSize = $('#min_crop_size_enable').prop('checked');
                    //デフォルト選択サイズ
                    if (enableDefaultSize && !hasErrorDefaultSize) {
                        conf.enableDefaultSize = true;
                        conf.defaultWidth = w;
                        conf.defaultHeight = h;
                        conf.keepDefaultAspectRatio = $('#default_crop_size_keep_aspect_ratio').prop('checked');
                    } else {
                        conf.enableDefaultSize = false;
                    }
                    //最小選択サイズ
                    if (enableMinimumSize && !hasErrorMinimumSize) {
                        conf.enableMinimumSize = true;
                    } else {
                        conf.enableMinimumSize = false;
                    }
                    $('#crop_size_config_win').modal('hide');
                });
            }
            iiifViewer.resetSubWindows(function() { $('#crop_size_config_win').modal('show'); });
        });
        $('.leaflet-draw-actions').append($config);
    });

    iiifViewer.setEventHandler(L.Draw.Event.CREATED, function(e) {
        //console.log(e);
        if (!conf.enableDefaultSize && !conf.enableMinimumSize) {
            return;
        }
        var iiif = getIIIFlayer(e);
        if (iiif && iiif.x && iiif.y) {
            var layer = e.layer;
            var bounds = layer.getBounds();
            var minLatLng = bounds.getNorthWest();
            var maxLatLng = bounds.getSouthEast();
            var maxCanvasPoint = L.point(iiif.x, iiif.y);
            var maxCanvasLatLng = iiif._map.unproject(maxCanvasPoint, iiif.maxNativeZoom); //LatLng
            if (maxCanvasLatLng.lng > 0 && maxCanvasLatLng.lat < 0) {
                var region = {};
                region.x = Math.round(iiif.x * minLatLng.lng / maxCanvasLatLng.lng);
                region.y = Math.round(iiif.y * minLatLng.lat / maxCanvasLatLng.lat);
                region.width = Math.round(iiif.x * (maxLatLng.lng - minLatLng.lng) / maxCanvasLatLng.lng);
                region.height = Math.round(iiif.y * (maxLatLng.lat - minLatLng.lat) / maxCanvasLatLng.lat);
                if (conf.enableDefaultSize) {
                    //デフォルト選択サイズ
                    region.width = parseInt(conf.defaultWidth, 10);
                    region.height = parseInt(conf.defaultHeight, 10);
                }
                if (conf.enableMinimumSize) {
                    //最小選択サイズ
                    var minLength = ((iiif.x < iiif.y) ? iiif.x : iiif.y) * parseInt(conf.minPercentageToCanvasShortSideLength, 10) / 100;
                    if (region.width < minLength) {
                        region.width = minLength;
                    }
                    if (region.height < minLength) {
                        region.height = minLength;
                    }
                }
                if (region.x < 0) { region.x = 0; }
                if (region.y < 0) { region.y = 0; }
                if (region.width < 1) { region.width = 1; }
                if (region.height < 1) { region.height = 1; }

                var minPoint = L.point(region.x, region.y);
                var maxPoint = L.point(region.x + region.width, region.y + region.height);
                var minLatLng_ = iiif._map.unproject(minPoint, iiif.maxNativeZoom);
                var maxLatLng_ = iiif._map.unproject(maxPoint, iiif.maxNativeZoom);
                var bounds_ = L.latLngBounds(minLatLng_, maxLatLng_);
                layer.setBounds(bounds_);
            }
        }
    });

    iiifViewer.setEventHandler(L.Draw.Event.EDITRESIZE, function(e) {
        //console.log(e);
        if ((!conf.enableDefaultSize || !conf.keepDefaultAspectRatio) && !conf.enableMinimumSize) {
            return;
        }
        var iiif = getIIIFlayer(e);
        if (iiif && iiif.x && iiif.y) {
            var layer = e.layer;
            var bounds = layer.getBounds();
            var minLatLng = bounds.getNorthWest();
            var maxLatLng = bounds.getSouthEast();
            var maxCanvasPoint = L.point(iiif.x, iiif.y);
            var maxCanvasLatLng = iiif._map.unproject(maxCanvasPoint, iiif.maxNativeZoom); //LatLng
            if (maxCanvasLatLng.lng > 0 && maxCanvasLatLng.lat < 0) {
                var region = {};
                region.x = Math.round(iiif.x * minLatLng.lng / maxCanvasLatLng.lng);
                region.y = Math.round(iiif.y * minLatLng.lat / maxCanvasLatLng.lat);
                region.width = Math.round(iiif.x * (maxLatLng.lng - minLatLng.lng) / maxCanvasLatLng.lng);
                region.height = Math.round(iiif.y * (maxLatLng.lat - minLatLng.lat) / maxCanvasLatLng.lat);
                //最小選択サイズの制限
                var minLength;
                if (conf.enableMinimumSize) {
                    //最小選択サイズ
                    minLength = ((iiif.x < iiif.y) ? iiif.x : iiif.y) * parseInt(conf.minPercentageToCanvasShortSideLength, 10) / 100;
                    if (region.width < minLength) {
                        region.width = minLength;
                    }
                    if (region.height < minLength) {
                        region.height = minLength;
                    }
                }
                //デフォルト選択サイズの縦横比を維持
                if (conf.enableDefaultSize && conf.keepDefaultAspectRatio) {
                    var w = parseInt(conf.defaultWidth, 10);
                    var h = parseInt(conf.defaultHeight, 10);
                    if (w !== 0) {
                        //幅をキープして、縦を設定する
                        region.height = region.width * h / w;
                    }
                    if (conf.enableMinimumSize) {
                        //最小選択サイズの制限もかかっている場合
                        if (region.height < minLength && h !== 0) {
                            //最小高さをキープして、幅を設定する
                            region.height = minLength;
                            region.width = minLength * w / h;
                        }
                    }
                }
                if (region.x < 0) { region.x = 0; }
                if (region.y < 0) { region.y = 0; }
                if (region.width < 1) { region.width = 1; }
                if (region.height < 1) { region.height = 1; }

                var minPoint = L.point(region.x, region.y);
                var maxPoint = L.point(region.x + region.width, region.y + region.height);
                var minLatLng_ = iiif._map.unproject(minPoint, iiif.maxNativeZoom);
                var maxLatLng_ = iiif._map.unproject(maxPoint, iiif.maxNativeZoom);
                var bounds_ = L.latLngBounds(minLatLng_, maxLatLng_);
                layer.setBounds(bounds_);
            }
        }
    });

    function getIIIFlayer(e) {
        if (e && e.target && e.target._layers) {
            for (var key in e.target._layers) {
                if (e.target._layers[key] && e.target._layers[key].id === 'iiif') {
                    return e.target._layers[key];
                }
            }
        }
        return null;
    }

    //----------------------------------------------------------------------
    function configure(config, defaultConfig) {
        function helper(conf, input, paramName, paramType) {
            if ($.type(input[paramName]) === paramType) {
                conf[paramName] = input[paramName];
            }
        }
        var conf_ = defaultConfig;
        if ($.isPlainObject(config)) {
            helper(conf_, config, 'enableDefaultSize', 'boolean');
            helper(conf_, config, 'defaultWidth', 'number');
            helper(conf_, config, 'defaultHeight', 'number');
            helper(conf_, config, 'keepDefaultAspectRatio', 'boolean');
            helper(conf_, config, 'enableMinimumSize', 'boolean');
            helper(conf_, config, 'minPercentageToCanvasShortSideLength', 'number');
        }
        return conf_;
    }

    function logError(message, lineNumber) {
        if (window.console) {
            var pluginName = 'Default crop size set plugin';
            var msg = (pluginHost ? pluginHost.getName() : 'IIIF Curation Platform') + ' (' + pluginName + '): ';
            var details = [];
            if (message) {
                details.push(message);
            }
            if (lineNumber) {
                details.push('line: ' + lineNumber);
            }
            if (details.length > 0) {
                msg += details.join(', ');
            }
            console.log(msg); // eslint-disable-line no-console
        }
    }
};