/*
 * IIIF Curation Viewer - Curation list export plugin
 * http://codh.rois.ac.jp/software/iiif-curation-viewer/
 *
 * Copyright 2018 Center for Open Data in the Humanities, Research Organization of Information and Systems
 * Released under the MIT license
 *
 * Core contributor: Jun HOMMA (@2SC1815J)
 */
var ICVExportCurationList = function(config) {
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
    });

    var lng = iiifViewer.getLang();

    //キュレーションリスト画面に、上書きエクスポート用のボタンを追加
    var extraButtons =
        '<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" id="curation_list_export_dropdown" aria-expanded="false">' +
        '  <span class="caret"></span>' +
        '</button>' +
        '<ul class="dropdown-menu" role="menu">' +
        '  <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="btn btn-icv-export" id="curation_list_export_put">Update</a></li>' +
        '</ul>';
    $('#curation_list_export').wrap('<div id="curation_list_export_container" class="btn-group"></div>');
    $('#curation_list_export_container').append(extraButtons);

    $('#curation_list_export_put').attr('title', (lng !== 'ja') ? 'Export Curation' : 'キュレーションのエクスポート（更新）');
    $('#curation_list_export_put').html('<span class="glyphicon glyphicon-export"></span> ' + ((lng !== 'ja') ? 'Update' : '上書き更新'));
    $('#curation_list_export_put').on('click', function() {
        //Export
        var curation = iiifViewer.getEditingCurationJson();
        if (curation) {
            iiifViewer.exportCurationJson(curation, {method: 'PUT', forceRedirect: true});
        }
    });
    $('#iiif-curation-viewer').on('show.bs.modal', '.modal', function() {
        var curationUrl = iiifViewer.getEditingCurationUrl();
        if (curationUrl && iiifViewer.getCurationJsonExport()) {
            $('#curation_list_export_dropdown').show();
        } else {
            $('#curation_list_export_dropdown').hide();
        }
    });

    //----------------------------------------------------------------------
    function configure(config, defaultConfig) {
        function helper(conf, input, paramName, paramType) {
            if ($.type(input[paramName]) === paramType) {
                conf[paramName] = input[paramName];
            }
        }
        var conf_ = defaultConfig;
        if ($.isPlainObject(config)) {
            //
        }
        return conf_;
    }

    function logError(message, lineNumber) {
        if (window.console) {
            var pluginName = 'Curation list export plugin';
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