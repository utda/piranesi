/*
 * IIIF Curation Viewer - Curation metadata edit plugin
 * http://codh.rois.ac.jp/software/iiif-curation-viewer/
 *
 * Copyright 2017 Center for Open Data in the Humanities, Research Organization of Information and Systems
 * Released under the MIT license
 *
 * Core contributor: Jun HOMMA (@2SC1815J)
 */
var ICVEditCurationMetadata = function(config) {
    'use strict';
    var pluginHost = typeof iiifViewer !== 'undefined' ? iiifViewer : void 0;
    var err;

    //依存関係の確認
    if (!pluginHost) {
        err = new Error(); logError('Plugin host not found.', err.lineNumber);
        return;
    }
    if (!L.control.sidebar) {
        err = new Error(); logError('leaflet-sidebar not found.', err.lineNumber);
        return;
    }

    //オプション設定
    var conf = configure(config, {
        useJsonEditor: false,
        jsonEditorOptions: {}
    });
    if (conf.useJsonEditor && !window.JSONEditor) {
        conf.useJsonEditor = false; //fallback
    }

    var sidebar; //L.control.sidebar
    var sidebarKey; //modal制御に利用
    var isSidebarOpen = false;
    var editor; //JSON Editor

    var lng = iiifViewer.getLang();

    var localCuration = {};
    var localFavs = []; //現在表示している外部curationに基づくfav配列

    //キュレーションメタデータナビとキュレーションメタデータサイドバーの追加
    var editCurationMetadataNav =
        '<li>' +
        '  <ul class="pagination pagination-sm pagination-custom" id="edit_curation_metadata_nav">' +
        '    <li><a href="#" id="edit_curation_metadata"><span class="glyphicon glyphicon glyphicon-edit"></span></a></li>' +
        '  </ul>' +
        '</li>';
    var sideBarHtml =
        '<div id="curation_metadata_sidebar" class="sidebar-content">' +
        '  <h4 id="curation_metadata_title" class="curation_list_title">Curation Metadata (Canvas)</h4>' +
        '  <textarea id="curation_metadata_textarea" rows="8" class="form-control"></textarea>' +
        '  <div class="modal-footer">' +
        '    <div id="curation_metadata_export_container" class="btn-group pull-left">' +
        '      <button type="button" class="btn btn-default btn-icv-export" id="curation_metadata_export">Export</button>' +
        '      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" id="curation_metadata_export_dropdown" aria-expanded="false"><span class="caret"></span></button>' +
        '      <ul class="dropdown-menu" role="menu">' +
        '        <li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="btn btn-icv-export" id="curation_metadata_export_put">Update</a></li>' +
        '      </ul>' +
        '    </div>' +
        '    <button type="button" class="btn btn-default" id="curation_metadata_apply">Apply</button>' +
        '    <button type="button" class="btn btn-default" data-dismiss="modal" id="curation_metadata_close">Close</button>' +
        '  </div>' +
        '</div>';

    //キュレーションメタデータナビのボタン
    $('#curation_nav').parent().before(editCurationMetadataNav);
    $('#edit_curation_metadata').attr('title', (lng !== 'ja') ? 'Edit Curation Metadata' : 'キュレーションのメタデータ');
    $('#edit_curation_metadata').on('click', function() {
        toggleCurationMetadata();
    });

    function setupMetadataSidebar() {
        //キュレーションメタデータサイドバー
        $('#curation_list_win').after(sideBarHtml);
        $('#curation_metadata_textarea').on('keydown', function(e) {
            e.stopPropagation();
        });
        if (conf.useJsonEditor) {
            $('#curation_metadata_textarea').hide();
            $('#curation_metadata_textarea').after($('<div>').attr('id', 'editor_holder'));
            $('#editor_holder').on('keydown', function(e) {
                e.stopPropagation();
            });
            editor = new JSONEditor(document.getElementById('editor_holder'), conf.jsonEditorOptions);
            if (conf.jsonEditorOptions.theme === 'bootstrap3') {
                //adhoc：json-editor 0.7.28のCSSを修正（余計なインラインstyleをリセットし、CSSに任せる）
                editor.on('change', function() {
                    $('#editor_holder .well-sm').css('padding-bottom', '');
                });
            }
        }
        $('#curation_metadata_export').attr('title', (lng !== 'ja') ? 'Export Curation with Metadata' : 'キュレーションとメタデータのエクスポート（新規）');
        $('#curation_metadata_export').html('<span class="glyphicon glyphicon-export"></span> ' + ((lng !== 'ja') ? 'Export' : 'エクスポート'));
        $('#curation_metadata_export_put').attr('title', (lng !== 'ja') ? 'Export Curation with Metadata' : 'キュレーションとメタデータのエクスポート（更新）');
        $('#curation_metadata_export_put').html('<span class="glyphicon glyphicon-export"></span> ' + ((lng !== 'ja') ? 'Update' : '上書き更新'));
        $('#curation_metadata_export, #curation_metadata_export_put').on('click', function() {
            if (isLocalDataUptodate()) {
                //ApplyせずにExportボタンを押下した場合の救済
                var page = iiifViewer.getCurrentPage(); //0-based
                if (page < localFavs.length) {
                    localFavs[page].metadata = v2m();
                }
                //Export
                var curation = updateCurationWithFavs(localCuration, localFavs);
                if (curation) {
                    if ($(this).attr('id') === 'curation_metadata_export_put') {
                        iiifViewer.exportCurationJson(curation, {method: 'PUT', forceRedirect: true});
                    } else {
                        iiifViewer.exportCurationJson(curation, {method: 'POST'});
                    }
                }
            }
        });
        $('#curation_metadata_apply').attr('title', (lng !== 'ja') ? 'Apply Edits' : 'メタデータ編集を適用');
        $('#curation_metadata_apply').html('<span class="glyphicon glyphicon-ok"></span> ' + ((lng !== 'ja') ? 'Apply' : '適用'));
        $('#curation_metadata_apply').on('click', function() {
            if (isLocalDataUptodate()) {
                var page = iiifViewer.getCurrentPage(); //0-based
                if (page < localFavs.length) {
                    localFavs[page].metadata = v2m();
                    if (!editor) {
                        m2v(localFavs[page].metadata); //表示に反映
                    }
                }
            }
        });
        $('#curation_metadata_close').text((lng !== 'ja') ? 'Close' : '閉じる');
        $('#curation_metadata_close').on('click', function() {
            if (sidebar) {
                sidebar.hide();
            }
        });
    }

    setupMetadataSidebar();
    if (!sidebar) {
        //キュレーションメタデータサイドバーのLeafletへの追加（icv.refreshPageイベント受信前の動作用）
        var map = iiifViewer.getMap();
        if (map) {
            sidebar = L.control.sidebar('curation_metadata_sidebar', {
                position: 'left'
            });
            map.addControl(sidebar);
            sidebarKey = iiifViewer.registerSubWindow(function() { sidebar.hide(); }); //modal表示の排他制御
            sidebar.on('show', function () {
                isSidebarOpen = true;
            });
            sidebar.on('hide', function () {
                isSidebarOpen = false;
            });
        } else {
            $('#curation_metadata_sidebar').hide();
        }
        if (iiifViewer.getMode() === 'annotation') {
            $('#edit_curation_metadata_nav').hide();
            return;
        } else {
            $('#edit_curation_metadata_nav').show();
        }
    }

    //ページ移動した際（icv.refreshPageイベント受信時）にメタデータ表示を更新する
    //（Applyせずに移動すると、編集は破棄される）
    $(document).on('icv.refreshPage', function(event, map) {
        if (map) {
            //ページ移動によりmapが再初期化されるため、
            //改めてキュレーションメタデータサイドバーの初期化と追加処理が必要となる。
            setupMetadataSidebar();
            sidebar = L.control.sidebar('curation_metadata_sidebar', {
                position: 'left'
            });
            map.addControl(sidebar);
            iiifViewer.unregisterSubWindow(sidebarKey);
            sidebarKey = iiifViewer.registerSubWindow(function() { sidebar.hide(); });
            if (isSidebarOpen) {
                //ページ移動する前に表示状態だったときは、ページ移動後も表示する
                setTimeout(function () {
                    sidebar.show();
                }, 500);
            }
            sidebar.on('show', function () {
                isSidebarOpen = true;
            });
            sidebar.on('hide', function () {
                isSidebarOpen = false;
            });
        }

        if (isLocalDataUptodate()) {
            var page = iiifViewer.getCurrentPage(); //0-based
            if (page < localFavs.length) {
                $('#curation_metadata_title').text('Curation Metadata (Canvas ' + String(page + 1) + ')');
                m2v(localFavs[page].metadata); //表示に反映
            }
        }
    });

    function showCurationMetadataCore() {
        var errMsg;
        var curation = iiifViewer.getBrowsingCurationJson(); //現在表示している外部curationの内容を取得（編集による影響を受けない）
        if (curation && $.isPlainObject(curation) && curation['@id']) {
            var favs;
            if (JSON.stringify(curation) === JSON.stringify(localCuration)) {
                favs = localFavs;
            } else {
                //新しい編集対象
                localCuration = JSON.parse(JSON.stringify(curation));
                favs = iiifViewer.getBrowsingCurationFavs();
            }
            var totalPages = iiifViewer.getTotalPages();
            if (favs.length === totalPages) {
                localFavs = favs;
                var page = iiifViewer.getCurrentPage(); //0-based
                if (page < totalPages) {
                    $('#curation_metadata_title').text('Curation Metadata (Canvas ' + String(page + 1) + ')');
                    if (editor) {
                        $('#editor_holder').show();
                        $('#curation_metadata_textarea').hide();
                    } else {
                        $('#curation_metadata_textarea').prop('disabled', false);
                    }
                    m2v(favs[page].metadata); //表示に反映
                    $('#curation_metadata_apply').show();
                    if (iiifViewer.getCurationJsonExport()) { //エクスポート有効状態
                        $('#curation_metadata_export_container').show();
                        var curationUrl = iiifViewer.getBrowsingCurationUrl(); //現在表示している外部curationのURL
                        var exportUrl = iiifViewer.getCurationJsonExportUrl(); //curationのエクスポート先URL
                        if (curationUrl.indexOf(exportUrl) === 0) {
                            //上書き更新できる可能性があるので、上書き更新を選べるようにする
                            $('#curation_metadata_export_dropdown').show();
                        } else {
                            //明らかに上書き更新不可なので、上書き更新は選べないようにする
                            $('#curation_metadata_export_dropdown').hide();
                        }
                    } else {
                        $('#curation_metadata_export_container').hide();
                    }
                }
            } else {
                //curation.json内に処理できなかったエントリがあった場合は編集できない
                errMsg = (lng !== 'ja') ? 'This curation list is not supported with metadata edit plugin.' : 'メタデータ編集対応外のキュレーションリストです。';
            }
        } else {
            errMsg = (lng !== 'ja') ? 'A curation list is not loaded.' : 'キュレーションリストが読み込まれていません。';
        }
        if (errMsg) {
            if (editor) {
                $('#editor_holder').hide();
            }
            $('#curation_metadata_textarea').text(errMsg).prop('disabled', true).show();
            $('#curation_metadata_apply').hide();
            $('#curation_metadata_export_container').hide();
        }
        $('#curation_metadata_win').modal('show');
    }

    function m2v(metadatum) {
        if (editor) {
            editor.setValue(metadatum);
        } else {
            if (metadatum) {
                metadatum = JSON.stringify(metadatum, null, '\t');
            } else {
                metadatum = '';
            }
            $('#curation_metadata_textarea').val(metadatum);
        }
    }
    function v2m() {
        var metadatum;
        if (editor) {
            metadatum = editor.getValue();
        } else {
            metadatum = $('#curation_metadata_textarea').val();
        }
        return getObjectFromText(metadatum);
    }

    //curationのselectionsを差し替えて、Canvasのmetadata編集を反映させる
    function updateCurationWithFavs(curation, favData) {
        if (curation && favData) {
            //curation自体のlabelやmetadataは維持し、selectionsのみ差し替える
            var codhCuration = JSON.parse(JSON.stringify(curation));
            var newCuration = iiifViewer.getCurationJsonFromFavs(favData);
            codhCuration.selections = newCuration.selections;
            return codhCuration;
        }
        return null; //error
    }

    //現在表示している外部curationとローカルデータの同期が取れているか確認する
    function isLocalDataUptodate() {
        var curation = iiifViewer.getBrowsingCurationJson();
        if (curation && $.isPlainObject(curation) && curation['@id']) {
            if (JSON.stringify(curation) === JSON.stringify(localCuration)) {
                var totalPages = iiifViewer.getTotalPages();
                if (localFavs.length === totalPages) {
                    return true;
                }
            }
        }
        return false;
    }

    function getObjectFromText(text) {
        if (text === '') {
            return (void 0); //undefined
        } else {
            try {
                var obj = JSON.parse(text);
                return obj;
            } catch (e) {
                //やむを得ないので元のままで扱う
                return text;
            }
        }
    }

    //----------------------------------------------------------------------
    function showCurationMetadata() {
        if (isCurationMetadataHidden()) {
            toggleCurationMetadata();
        }
    }
    function toggleCurationMetadata() {
        if (isCurationMetadataHidden()) {
            iiifViewer.resetSubWindows(function() {
                if (sidebar) {
                    sidebar.show();
                    showCurationMetadataCore();
                }
            });
        } else {
            iiifViewer.resetSubWindows();
        }
    }
    function isCurationMetadataHidden() {
        return !(sidebar && sidebar.isVisible());
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
            helper(conf_, config, 'useJsonEditor', 'boolean');
            helper(conf_, config, 'jsonEditorOptions', 'object');
        }
        return conf_;
    }

    function logError(message, lineNumber) {
        if (window.console) {
            var pluginName = 'Curation metadata edit plugin';
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