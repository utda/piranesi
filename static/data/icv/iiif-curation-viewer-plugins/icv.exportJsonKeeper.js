/*
 * IIIF Curation Viewer - JSONkeeper export plugin
 * http://codh.rois.ac.jp/software/iiif-curation-viewer/
 *
 * Copyright 2017 Center for Open Data in the Humanities, Research Organization of Information and Systems
 * Released under the MIT license
 *
 * Core contributor: Jun HOMMA (@2SC1815J)
 */
var ICVExportJsonKeeper = function(config) {
    'use strict';
    var pluginHost = typeof iiifViewer !== 'undefined' ? iiifViewer : void 0;
    var err;

    //オプション設定
    var accessControlEnum = ['', 'firebase'];
    var defaultConfig = {
        accessControl: accessControlEnum[0], //string
        allowAnonymousPost: true, //boolean
        redirectUrl: location.protocol + '//' + location.host + location.pathname, //string
        unlisted: false //boolean
    };
    var conf = configure(config, defaultConfig);

    //依存関係の確認
    if (!pluginHost) {
        err = new Error(); logError('Plugin host not found.', err.lineNumber);
        return;
    }
    if (!pluginHost.getCurationJsonExportUrl()) {
        err = new Error(); logError('Invalid service.curationJsonExportUrl.', err.lineNumber);
        return;
    }
    if (conf.accessControl === 'firebase' && (typeof firebase === 'undefined' || !firebase)) {
        //ブラウザによるドメインごとのJavaScript実行許可／ブロック設定により、
        //ユーザによってはFirebase JavaScript SDKが読み込めていないことがありうる。
        var lang = pluginHost.getLang();
        var msg = (lang !== 'ja') ? 'Firebase not found.' : 'エラー： 動作に必要なJavaScript（Firebase）が読み込まれていないため、投稿できません。';
        err = new Error(); logError(msg, err.lineNumber);
        pluginHost.setCurationJsonExport(null);
        return;
    }

    //----------------------------------------------------------------------
    if (conf.accessControl === 'firebase') {
        updateCurationJsonExport(firebase.auth().currentUser);
        firebase.auth().onAuthStateChanged(function(user) {
            updateCurationJsonExport(user);
        });
    } else {
        updateCurationJsonExport(null);
    }

    function updateCurationJsonExport(user) {
        if (user || conf.allowAnonymousPost) {
            pluginHost.setCurationJsonExport(function(curation, options) {
                if (conf.accessControl === 'firebase') {
                    if (firebase) {
                        var currentUser = firebase.auth().currentUser;
                        if (currentUser) {
                            currentUser.getIdToken(true).then(function(idToken) {
                                _exportCurationJson(curation, idToken, options);
                            }).catch(function(error) {
                                err = new Error(); logError(error.message, err.lineNumber);
                            });
                            return;
                        }
                    }
                }
                if (conf.allowAnonymousPost) {
                    _exportCurationJson(curation, null, options);
                }
            });
        } else {
            pluginHost.setCurationJsonExport(null);
        }
    }

    function _exportCurationJson(curation, idToken, options) {
        var curationString = JSON.stringify(curation, null, '\t');
        var lang = pluginHost.getLang();
        var exportUrl = pluginHost.getCurationJsonExportUrl();
        var curationUrl = pluginHost.getBrowsingCurationUrl() || pluginHost.getEditingCurationUrl();
        var method = 'POST';
        var preferredMethod;
        var forceRedirect = false;
        if (options) {
            if (options.method && $.type(options.method) === 'string') {
                preferredMethod = options.method.toUpperCase();
                if (preferredMethod === 'PUT' || preferredMethod === 'DELETE') {
                    if (curationUrl.indexOf(exportUrl) === 0) {
                        method = preferredMethod;
                        exportUrl = curationUrl;
                    }
                }
            }
            if ('forceRedirect' in options) {
                forceRedirect = options.forceRedirect;
            }
        }
        var $modals = $('.modal-dialog:visible');
        if ($modals.length === 0) {
            $modals = $('.leaflet-sidebar:visible');
        }
        var $modal_content;
        if ($modals.length === 1) {
            $modals.find('.btn-icv-export').prop('disabled', true).toggleClass('disabled', true);
            $modals.spin();
            $modal_content = $modals.children('.modal-content');
            if ($modal_content.length === 0) {
                $modal_content = $modals.children('.sidebar-content');
            }
        }
        var settings = {
            method: method,
            url: exportUrl
        };
        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            settings.data = curationString;
            settings.contentType = 'application/ld+json';
            settings.dataType = 'json';
        }
        if (idToken !== null) {
            if (conf.accessControl === 'firebase') {
                settings.headers = { 'X-Firebase-ID-Token': idToken };
            } else {
                settings.headers = { 'X-Access-Token': idToken };
            }
            if (method === 'POST') {
                //X-Unlistedヘッダ指定は、access token付きのPOSTで有効
                settings.headers['X-Unlisted'] = conf.unlisted;
            }
        }
        $.ajax(settings).done(function(data, textStatus, jqxhr) {
            if (jqxhr) {
                var resLocation = jqxhr.getResponseHeader('Location');
                if (forceRedirect && !resLocation) {
                    resLocation = exportUrl;
                }
                if (resLocation) {
                    var redirectUrl = conf.redirectUrl + '?curation=' + resLocation + '&lang=' + lang;
                    if (method === 'POST') {
                        //上書きするつもりが、誤って新規エクスポートしてしまった場合のため、
                        //新規エクスポートのときのみ、メッセージを表示して注意を促す。
                        var duration = 1500;
                        showAlert($modal_content, 'success', (lang !== 'ja') ? 'Exported as New Curation' : '新規にエクスポートしました', duration);
                        setTimeout(function() {
                            window.open(redirectUrl, '_self');
                        }, duration);
                    } else {
                        window.open(redirectUrl, '_self');
                    }
                } else {
                    showAlert($modal_content, 'success', (lang !== 'ja') ? 'Updated' : '完了', 1000);
                }
                if (options.callback) {
                    options.callback(jqxhr, options);
                }
            }
        }).fail(function(jqxhr, textStatus, error) {
            err = new Error(); logError(textStatus + ', ' + error, err.lineNumber);
            showAlert($modal_content, 'danger', error || ((lang !== 'ja') ? 'Error' : 'エラー'), 3000);
            if (options.callbackFail) {
                options.callbackFail(jqxhr, textStatus, error, options);
            }
        }).always(function() {
            if ($modals.length === 1) {
                $modals.spin(false);
                $modals.find('.btn-icv-export').prop('disabled', false).toggleClass('disabled', false);
            }
        });
    }

    //フィードバックメッセージを表示
    function showAlert($appendTo, context, text, duration) {
        if ($appendTo && $appendTo.length === 1) {
            var alertId = 'export_json_keeper_alert'; //cssファイルにスタイル指定あり
            var modifierClass = 'alert-' + context;
            $('#' + alertId).remove();
            $('<div>').addClass('alert').addClass(modifierClass).attr('role', 'alert').attr('id', alertId).text(text).appendTo($appendTo);
            setTimeout(function() {
                $('#' + alertId).alert('close').remove();
            }, duration);
        }
    }

    if (conf.accessControl === 'firebase') {
        //アクセスコントロールを行う場合、未ログイン時にはエクスポートボタンのラベルを区別する
        $('#iiif-curation-viewer').on('show.bs.modal', '.modal', function() {
            //モーダルダイアログが表示される際にラベルを更新する
            var lang = pluginHost.getLang();
            $(this).each(function() {
                var $exportButton = $(this).find('.btn-icv-export');
                if ($exportButton.length) {
                    if (!$exportButton.attr('data-title-orig')) { //オリジナルのtitleを待避
                        $exportButton.attr('data-title-orig', $exportButton.attr('title'));
                    }
                    var opClass = 'btn-icv-export-not-logged-in';
                    if (firebase.auth().currentUser) {
                        $exportButton.attr('title', $exportButton.attr('data-title-orig'));
                        $exportButton.removeAttr('data-notloggedin');
                        $exportButton.removeClass(opClass);
                    } else {
                        $exportButton.attr('title', (lang !== 'ja') ? 'If you export without logging in, anyone can edit it and it may be deleted.' : '未ログイン（匿名）でエクスポートすると、誰でも編集可能な状態となり、削除されることがあります。');
                        $exportButton.attr('data-notloggedin', ((lang !== 'ja') ? ' (Anonymous)' : '（匿名）'));
                        $exportButton.addClass(opClass);
                    }
                }
            });
        });
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
            if ($.type(config.accessControl) === 'string') {
                if ($.inArray(config.accessControl, accessControlEnum) !== -1) {
                    conf_.accessControl = config.accessControl;
                }
            }
            helper(conf_, config, 'allowAnonymousPost', 'boolean');
            helper(conf_, config, 'redirectUrl', 'string');
            helper(conf_, config, 'unlisted', 'boolean');
        }
        return conf_;
    }

    function logError(message, lineNumber) {
        if (window.console) {
            var pluginName = 'JSONkeeper export plugin';
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