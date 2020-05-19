/*
 * IIIF Curation Viewer - Cropped image export plugin
 * http://codh.rois.ac.jp/software/iiif-curation-viewer/
 *
 * Copyright 2019 Center for Open Data in the Humanities, Research Organization of Information and Systems
 * Released under the MIT license
 *
 * Core contributor: Jun HOMMA (@2SC1815J)
 */
var ICVExportCroppedImage = function(config, pluginConfig) {
    'use strict';
    var pluginHost = typeof iiifViewer !== 'undefined' ? iiifViewer : void 0;
    var err;

    var storage;
    try {
        storage = localStorage;
    } catch (e) {
        //
    }

    //オプション設定
    var defaultConfig = {
    };
    var conf = configure(config, defaultConfig);
    var runtimeConf = getCroppedImageExportService();
    var defaultPluginConfig = {
        trustedUrlPrefixes: [] //正規表現不可、前方一致 e.g. ['https://mp.ex.nii.ac.jp/']
    };
    var pluginConf = pluginConfigure(pluginConfig, defaultPluginConfig);

    //依存関係の確認
    if (!pluginHost) {
        err = new Error(); logError('Plugin host not found.', err.lineNumber);
        return;
    }
    if (pluginHost.getCroppedImageExportUrl()) {
        err = new Error(); logError('service.croppedImageExportUrl on the plugin host have priority.', err.lineNumber);
        return;
    }

    //----------------------------------------------------------------------
    //Firebase認証
    var idToken = null;
    if (typeof firebase !== 'undefined' && firebase) {
        updateIdToken(firebase.auth().currentUser);
        firebase.auth().onAuthStateChanged(function(user) {
            updateIdToken(user);
        });
    }
    function updateIdToken(user) {
        idToken = null;
        if (user) {
            var currentUser = firebase.auth().currentUser;
            if (currentUser) {
                currentUser.getIdToken(true).then(function(idToken_) {
                    idToken = idToken_;
                }).catch(function(error) {
                    err = new Error(); logError(error.message, err.lineNumber);
                });
            }
        } else {
            //ログアウトしたとき
            //ポップアップ内のformにidTokenが設定されている可能性があるので閉じる
            var map = pluginHost.getMap();
            if (map) {
                map.closePopup();
            }
        }
    }

    //----------------------------------------------------------------------
    iiifViewer.setEventHandler(L.Draw.Event.DRAWSTART, function(/*e*/) {
        // console.log(e);
        // e: Object { layerType: "rectangle", type: "draw:drawstart", target: Object }
        function updateServiceInfo(config) {
            var name = pluginHost.getPropertyValueI18n(config.name, lang);
            $('#export_cropped_image_name').text(name);
            var description = pluginHost.getPropertyValueI18n(config.description, lang);
            $('#export_cropped_image_description').text(description);
            var homepage = pluginHost.getPropertyValueI18n(config.homepage, lang);
            if (homepage) {
                var $link = $('<a>').attr({ href: homepage, target: '_blank' }).text(homepage);
                $('#export_cropped_image_homepage').html($link);
            } else {
                $('#export_cropped_image_homepage').empty();
            }
            var provider = pluginHost.getPropertyValueI18n(config.provider, lang);
            if (provider) {
                $('#export_cropped_image_provider').text(provider);
            } else {
                $('#export_cropped_image_provider').empty();
            }
            if (config.exportUrl) {
                $('#export_cropped_image_service_panel').show();
            } else {
                $('#export_cropped_image_service_panel').hide();
            }
        }
        var lang = pluginHost.getLang();
        var text = (lang !== 'ja') ? 'Export Options' : 'エクスポート設定';
        var $config = $('<li><a id="leaflet-draw-actions-export_cropped_image_config" href="#">' + text + '</a></li>').on('click dblclick mousedown touchstart', function(e) {
            e.stopPropagation();
            if (document.getElementById('export_cropped_image_win') === null) {
                var tempConf;
                var title = (lang !== 'ja') ? 'Options for Cropped Image Export' : '切り取り画像エクスポートの設定';
                var message = (lang !== 'ja') ? 'Drop the endpoint setting of a service for cropped image export plugin.' : '切り取り画像をエクスポートするサービスのエンドポイント設定をこのウィンドウにドロップしてください。';
                var textReset = (lang !== 'ja') ? 'Restore Default' : '初期設定に戻す';
                var textHelp = (lang !== 'ja') ? 'Help' : 'ヘルプ';
                var textApply = (lang !== 'ja') ? 'Apply' : '適用';
                var textClose = (lang !== 'ja') ? 'Close' : '閉じる';
                var exportCroppedImageModal =
                    '<div class="modal fade" tabindex="-1" id="export_cropped_image_win">' +
                    '  <div class="modal-dialog" id="export_cropped_image_dialog">' +
                    '    <div class="modal-content" id="export_cropped_image_content">' +
                    '      <div class="modal-body">' +
                    '        <h4 id="export_cropped_image_title" class="curation_list_title">' + title + '</h4>' +
                    '        <h5 id="export_cropped_image_message">' + message + '</h5>' +
                    '        <div id="export_cropped_image_service_panel" class="panel panel-default">' +
                    '          <div class="panel-heading"><span id="export_cropped_image_name"></span><button type="button" id="export_cropped_image_service_panel_close" class="close">&times;</button></div>' +
                    '          <div class="panel-body">' +
                    '            <div id="export_cropped_image_description"></div>' +
                    '            <div id="export_cropped_image_homepage"></div>' +
                    '            <div id="export_cropped_image_provider"></div>' +
                    '          </div>' +
                    '        </div>' +
                    '      </div>' +
                    '      <div class="modal-footer modal-footer-custom">' +
                    '        <button type="button" class="btn btn-default pull-left" id="export_cropped_image_reset">' + textReset + '</button>' +
                    '        <a class="btn btn-default" id="export_cropped_image_help">'+ textHelp + '</a>' +
                    '        <button type="button" class="btn btn-default" id="export_cropped_image_apply">'+ textApply + '</button>' +
                    '        <button type="button" class="btn btn-default" data-dismiss="modal" id="export_cropped_image_close">' + textClose + '</button>' +
                    '      </div>' +
                    '    </div>' +
                    '  </div>' +
                    '</div>';
                $('#curation_list_win').after(exportCroppedImageModal);
                var helpUrl = 'http://codh.rois.ac.jp/icp/service-repository/' + ((lang !== 'ja') ? 'index.html.en' : '');
                $('#export_cropped_image_help').attr({ href: helpUrl, target: '_blank' });
                var $droppable = $('#export_cropped_image_content');
                $droppable.on('dragover', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                });
                $droppable.on('dragenter', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    $(this).addClass('export_cropped_image_service_conf_dragging');
                });
                $droppable.on('drop', function(e) {
                    e.preventDefault();
                    $(this).removeClass('export_cropped_image_service_conf_dragging');
                    var url = e.originalEvent.dataTransfer.getData('URL');
                    if (!url) {
                        var text = e.originalEvent.dataTransfer.getData('text/plain');
                        var anchor = document.createElement('a');
                        anchor.href = text;
                        url = anchor.href;
                    }
                    if (url) {
                        $.getJSON(url, function(serviceConfig) {
                            if (serviceConfig.exportUrl) { //最低限
                                updateServiceInfo(serviceConfig);
                                tempConf = serviceConfig;
                                $('#export_cropped_image_reset').prop('disabled', false);
                            }
                        }).fail(function(jqxhr, textStatus, error) {
                            err = new Error(); logError(textStatus + ', ' + error, err.lineNumber); //jsonの取得に失敗
                        });
                    }
                });
                $(document).on('dragenter', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    $droppable.removeClass('export_cropped_image_service_conf_dragging');
                });
                $(document).on('dragover drop', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                });
                $('#export_cropped_image_win').on('show.bs.modal', function() {
                    $('#export_cropped_image_reset').prop('disabled', !runtimeConf);
                    $droppable.removeClass('export_cropped_image_service_conf_dragging');
                    tempConf = runtimeConf || conf;
                    updateServiceInfo(tempConf);
                });
                $('#export_cropped_image_apply').on('click', function() {
                    runtimeConf = tempConf; //reset時は void 0になる
                    setCroppedImageExportService(runtimeConf);
                    pluginHost.setCroppedImageExport(croppedImageExport);
                    $('#export_cropped_image_win').modal('hide');
                });
                $('#export_cropped_image_reset').on('click', function() {
                    tempConf = void 0;
                    $('#export_cropped_image_apply').trigger('click');
                });
                $('#export_cropped_image_service_panel_close').on('click', function() {
                    tempConf = {}; //void 0 ではない
                    $('#export_cropped_image_apply').trigger('click');
                });
            }
            iiifViewer.resetSubWindows(function() { $('#export_cropped_image_win').modal('show'); });
        });
        $('.leaflet-draw-actions').append($config);
    });

    //----------------------------------------------------------------------
    function croppedImageExport(cropUrl, opt) {
        function getParamName(param, conf) {
            return (conf.paramMap && $.type(conf.paramMap[param]) === 'string' && conf.paramMap[param]) || param;
        }
        function getParamValue(rawValue, enctype) {
            if (enctype === 'application/x-www-form-urlencoded') {
                return encodeURIComponent(rawValue);
            } else {
                return rawValue;
            }
        }
        function isTrustedUrl(url) {
            var anchor = document.createElement('a');
            anchor.href = url;
            var href = anchor.href;
            for (var i = 0; i < pluginConf.trustedUrlPrefixes.length; i++) {
                var trustedUrlPrefix = pluginConf.trustedUrlPrefixes[i];
                if (trustedUrlPrefix) {
                    if (href.indexOf(trustedUrlPrefix) === 0) {
                        return true;
                    }
                }
            }
            return false;
        }
        var tempConf = runtimeConf || conf;
        var exportUrl = tempConf.exportUrl;
        if (exportUrl) {
            var lang = pluginHost.getLang();
            var name = pluginHost.getPropertyValueI18n(tempConf.name, lang);
            var method = ($.type(tempConf.method) === 'string' && tempConf.method.toUpperCase()) || 'GET';
            var enctype = (method === 'POST' && $.type(tempConf.enctype) === 'string' && tempConf.enctype) || 'application/x-www-form-urlencoded';
            var openTab = $.type(tempConf.openTab) === 'boolean' ? tempConf.openTab : false; //trueのとき別タブで開く、falseのときPopup内にiframeで表示
            var height = ($.type(tempConf.height) === 'string' && tempConf.height) || '280px'; //整数＋単位で指定（ピクセル単位であれば'px'）
            var requireFirebaseIdToken = $.type(tempConf.requireFirebaseIdToken) === 'boolean' ? tempConf.requireFirebaseIdToken : false;
            var paramsDict = {};
            paramsDict[getParamName('image', tempConf)] = getParamValue(cropUrl, enctype);
            if (opt.manifest) {
                paramsDict[getParamName('manifest', tempConf)] = getParamValue(opt.manifest, enctype);
            }
            if (opt.canvas) {
                paramsDict[getParamName('canvas', tempConf)] = getParamValue(opt.canvas, enctype);
            }
            paramsDict[getParamName('lang', tempConf)] = lang;
            //Firebase認証
            if (method === 'POST') {
                var anchor = document.createElement('a');
                anchor.href = exportUrl;
                var href = anchor.href;
                if (/^https:\/\//.test(href) && isTrustedUrl(href) && requireFirebaseIdToken === true) {
                    paramsDict[getParamName('token', tempConf)] = getParamValue(idToken, enctype);
                }
            }

            var $form;
            var EXPORT_CROPPED_IMAGE_POPUP_FORM = 'export_cropped_image_popup_form';
            var EXPORT_CROPPED_IMAGE_POPUP_IFRAME = 'export_cropped_image_popup_iframe';
            if (method === 'POST') {
                var target = openTab ? '_blank' : EXPORT_CROPPED_IMAGE_POPUP_IFRAME;
                $form = $('<form>').attr({ action: exportUrl, method: method, target: target, id: EXPORT_CROPPED_IMAGE_POPUP_FORM, enctype: enctype });
                $.each(paramsDict, function(key, value) {
                    $form = $form.append($('<input>').attr({ type: 'hidden', name: key, value: value }));
                });
                $form = $form.append($('<button>').attr('type', 'submit').addClass('btn btn-link center-block').css('white-space', 'unset').text(name)).show();
            } else {
                var params_ = [];
                $.each(paramsDict, function(key, value) {
                    params_.push(key + '=' + value);
                });
                if (params_.length > 0) {
                    if (String(exportUrl).indexOf('?') > -1) {
                        exportUrl += '&';
                    } else {
                        exportUrl += '?';
                    }
                    exportUrl += params_.join('&');
                }
            }
            var $popupContents = $('<div>');
            var $contents;
            var $imageLink = $('<div>').css('word-break', 'break-all').append($('<a>').attr({ href: cropUrl, target: '_blank' }).text(cropUrl));
            var $hr = $('<hr>').css('margin-top', '6px').css('margin-bottom', '13px');
            if (method === 'POST') {
                if (openTab) {
                    $contents = $form;
                } else {
                    var map = pluginHost.getMap();
                    if (map) {
                        map.addOneTimeEventListener('popupopen', function() {
                            $('#' + EXPORT_CROPPED_IMAGE_POPUP_FORM).submit().hide();
                        });
                    }
                    $popupContents.append($form);
                    $contents = $('<iframe>').attr({ frameborder: 0, name: EXPORT_CROPPED_IMAGE_POPUP_IFRAME }).css('height', height);
                }
            } else {
                if (openTab) {
                    $contents = $('<a>').attr({ href: exportUrl, target: '_blank' }).addClass('btn btn-outline-primary center-block').css('white-space', 'normal').css('white-space', 'unset').text(name); //white-spaceの二重指定はie対策
                } else {
                    $contents = $('<iframe>').attr({ src: exportUrl, frameborder: 0 }).css('height', height);
                }
            }
            return $popupContents.append($contents).append($hr).append($imageLink).prop('outerHTML');
        } else {
            return '';
        }
    }
    pluginHost.setCroppedImageExport(croppedImageExport);

    //----------------------------------------------------------------------
    function getCroppedImageExportService() {
        var config;
        if (storage) {
            config = JSON.parse(storage.getItem('croppedImageExportService'));
        }
        return config;
    }
    function setCroppedImageExportService(config) {
        if (storage) {
            if (config) {
                storage.setItem('croppedImageExportService', JSON.stringify(config));
            } else {
                removeCroppedImageExportService();
            }
        }
    }
    function removeCroppedImageExportService() {
        if (storage) {
            storage.removeItem('croppedImageExportService');
        }
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
            if ($.type(config.name) === 'string' || $.type(config.name) === 'array') {
                conf_.name = config.name;
            }
            if ($.type(config.description) === 'string' || $.type(config.description) === 'array') {
                conf_.description = config.description;
            }
            if ($.type(config.homepage) === 'string' || $.type(config.homepage) === 'array') {
                conf_.homepage = config.homepage;
            }
            if ($.type(config.provider) === 'string' || $.type(config.provider) === 'array') {
                conf_.provider = config.provider;
            }
            helper(conf_, config, 'exportUrl', 'string');
            helper(conf_, config, 'method', 'string');
            helper(conf_, config, 'enctype', 'string');
            helper(conf_, config, 'paramMap', 'object');
            helper(conf_, config, 'openTab', 'boolean');
            helper(conf_, config, 'height', 'string');
            helper(conf_, config, 'requireFirebaseIdToken', 'boolean');
        }
        return conf_;
    }
    function pluginConfigure(config, defaultConfig) {
        var conf_ = defaultConfig;
        if ($.isPlainObject(config)) {
            var i;
            if ($.isArray(config.trustedUrlPrefixes)) {
                var trustedUrlPrefixes = [];
                for (i = 0; i < config.trustedUrlPrefixes.length; i++) {
                    var trustedUrlPrefix = config.trustedUrlPrefixes[i];
                    if (trustedUrlPrefix && $.type(trustedUrlPrefix) === 'string') {
                        var anchor = document.createElement('a');
                        anchor.href = trustedUrlPrefix;
                        var href = anchor.href;
                        if (href) {
                            href = href.replace(/:\/\/\/$/, '://'); //workaround for Firefox ESR 52 incompatibility
                            trustedUrlPrefixes.push(href);
                        }
                    }
                }
                conf_.trustedUrlPrefixes = trustedUrlPrefixes;
            }
        }
        return conf_;
    }

    function logError(message, lineNumber) {
        if (window.console) {
            var pluginName = 'Cropped image export plugin';
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