/*
 * IIIF Curation Viewer v1.7
 * http://codh.rois.ac.jp/software/iiif-curation-viewer/
 *
 * Copyright 2016 Center for Open Data in the Humanities, Research Organization of Information and Systems
 * Released under the MIT license
 *
 * Core contributor: Jun HOMMA (@2SC1815J)
 *
 * Licenses of open source libraries, see acknowledgements.txt
 */
var IIIFCurationViewer = function(config) {
    'use strict';

    var APP_NAME = 'IIIF Curation Viewer';
    var VERSION  = '1.7.0+20191202';

    var map; //Leaflet

    var bookInfos = [];
    var pageInfos = [];
    var curationInfo = {};

    var isTimelineMode = false;
    var cursorInfo = {
        endpointUrl: null,  //cursor URL
        index: null,    //unix time
        first: null,    //unix time
        last:  null,    //unix time
        prev:  null,    //unix time
        next:  null,    //unix time
        step:  null,    //second
        status: 'fixed' //'fixed'/'updating'
    };

    var page = 0; //0-based（GET引数でのやり取りは1-basedに変換）
    var bookChangePages = []; //資料が切り替わるpage (0-based)
    var isFilteredContents = false; //複数資料のうち、いずれかにおいてページ絞り込みがなされていればtrue
    var pageStep = 1; //ページナビのボタンで移動するコマ数
    var fadeControlsTimerID;
    var annotationDisplayConf = {
        offsetX: 50,
        offsetY: 50,
        opacity: 100,
        size: 50
    };

    //リテラルはさほど多くないので、i18n用のフレームワークは用いず、直接記述する。
    var lng = String(window.navigator.language || window.navigator.userLanguage || 'ja').substr(0, 2) !== 'ja' ? 'en' : 'ja';

    var err;
    var isInTransition = false;

    var enableCurationEdit = true;
    var storage;
    try {
        storage = localStorage;
    } catch (e) {
        enableCurationEdit = false;
    }
    var storageSession;
    try {
        storageSession = sessionStorage;
    } catch (e) {
        //
    }

    var CONTEXT_CURATION = 'http://codh.rois.ac.jp/iiif/curation/1/context.json';
    var CONTEXT_TIMELINE = 'http://codh.rois.ac.jp/iiif/timeline/1/context.json';
    var CONTEXT_CURSOR   = 'http://codh.rois.ac.jp/iiif/cursor/1/context.json';

    var defaultConfig = {
        //タイトル
        //title: APP_NAME, //HTML側に直接記述しているケースを考慮し、デフォルト値は設けない
        //pagesパラメータによるidentifierの指定をmanifestのURLに解決するための設定
        //（このmanifestのURLは、trustedUrlPrefixesに追加しなくても表示が認められる）
        resolveIdentifierSetting: {
            //{scheme}://{server}{/prefix}/{identifier}/manifest
            // manifestUrlPrefix = {scheme}://{server}{/prefix}/
            // identifierPattern = {identifier}
            // manifestUrlSuffix = /manifest
            //e.g. http://example.org/iiif/book/0123456789/manifest.json
            // manifestUrlPrefix = 'http://example.org/iiif/book/'
            // identifierPattern = '[0-9]{9}'
            // manifestUrlSuffix = '/manifest.json'
            manifestUrlPrefix: '',
            identifierPattern: '', //正規表現で指定する
            manifestUrlSuffix: '', //e.g. manifest.json
            numberOfSlashesInIdentifier: 0 //identifierに含まれる'/'の数
        },
        //表示を認めるmanifest/timelineのURL設定
        trustedUrlPrefixes: [], //正規表現不可、前方一致 e.g. ['https://', 'http://']
        manifest: {
            steps: [] //ページナビ移動ボタンによる移動コマ数の設定 e.g. [1, 10]
        },
        timeline: {
            steps: [] //ページナビ移動ボタンによる移動コマ数の設定。設定値-1がCursorの返すコマ数以下となるようにすること e.g. [1, 6, 36, 144]
        },
        service: {
            croppedImageExportUrl: '', //関連： getCroppedImageExportHtml()
            curationJsonExportUrl: ''  //関連： exportCurationJson()
        },
        controls: {
            enableAutoHide: true //画像表示領域にマウスオーバーするとコントロールを表示、離れると非表示にする
        },
        doc: {
            //言語を分けない場合は、
            // aboutUrl: 'http://codh.rois.ac.jp/software/iiif-curation-viewer/'
            //のように記述しても良い
            aboutUrl: [
                {
                    '@language': 'en',
                    '@value': 'http://codh.rois.ac.jp/software/iiif-curation-viewer/'
                },
                {
                    '@language': 'ja',
                    '@value': 'http://codh.rois.ac.jp/software/iiif-curation-viewer/'
                }
            ]
        }
    };
    var conf = configure(config, defaultConfig);

    var params = getParams(location.search);
    if (params) {
        if ('lang' in params) { //表示言語指定
            if (params.lang !== 'ja') {
                lng = 'en'; //ja以外は全てenにfallback
            } else {
                lng = 'ja';
            }
        }
    }

    setupManifestDroppableArea(); //マニフェストのドラッグ＆ドロップ受け入れ準備
    setupUILang(); //UI表示言語切り替え

    if (params) {
        if ('pages' in params) { //BookIDによる表示対象指定
            var bookParams = parsePagesParam(params.pages);
            if (bookParams) {
                preprocessManifests(bookParams);
            } else {
                err = new Error(); showError(1, err.lineNumber); //pagesパラメータの値異常
            }
        } else if ('curation' in params) { //curation.jsonのURLによる表示対象指定
            if (params.curation) {
                processCurationUrl(params.curation);
            } else {
                err = new Error(); showError(1, err.lineNumber); //curationパラメータの値異常
            }
        } else if ('manifest' in params) { //manifest.jsonのURLによる表示対象指定
            if (params.manifest) {
                processManifestUrl(params.manifest, params.canvas); //params.canvasは最初に表示するキャンバスのURL（省略可）
            } else {
                err = new Error(); showError(1, err.lineNumber); //manifestパラメータの値異常
            }
        } else if ('timeline' in params) { //timeline.jsonのURLによる表示対象指定
            if (params.timeline) {
                isTimelineMode = true;
                if ('cursorIndex' in params) { //0も取りうる
                    var cursorIndex = getCursorIndexFromProp(params.cursorIndex);
                    if (cursorIndex !== null) {
                        cursorInfo.index = cursorIndex;
                    }
                }
                processTimelineUrl(params.timeline);
            } else {
                err = new Error(); showError(1, err.lineNumber); //timelineパラメータの値異常
            }
        } else {
            err = new Error(); showError(0, err.lineNumber); //表示対象指定パラメータ(pages, curation, timeline)なし
        }
    } else {
        err = new Error(); showError(0, err.lineNumber); //GET引数なし
    }
    function setupUILang() {
        //コンテンツを表示していない（setupNavigations()が呼ばれない）時点での表示言語切り替え等
        if ($('.nav_lang_ja').length && $('.nav_lang_en').length) {
            if (lng !== 'ja') {
                var $ja = $('<a>').attr('href', '?lang=ja').text('日本語');
                $('.nav_lang_ja').html($ja);
                $('.nav_lang_en').text('English');
            } else {
                var $en = $('<a>').attr('href', '?lang=en').text('English');
                $('.nav_lang_ja').text('日本語');
                $('.nav_lang_en').html($en);
            }
        }
        //タイトル
        if ('title' in conf) { //設定がある場合だけ、HTMLでの指定を上書き
            var title = getPropertyValueI18n(conf.title);
            $('#navbar_brand').html(title);
            document.title = $('#navbar_brand').text();
        }
        //ヘッダ
        var $navbar_brand_link = $('a#navbar_brand');
        if (!$navbar_brand_link.attr('data-href-orig')) { //オリジナルのhrefを待避
            $navbar_brand_link.attr('data-href-orig', $navbar_brand_link.attr('href'));
        }
        var hrefOrig = $navbar_brand_link.attr('data-href-orig');
        var hrefNew = hrefOrig + ((String(hrefOrig).indexOf('?') > -1) ? '&' : '?') + 'lang=' + lng;
        $navbar_brand_link.attr('href', hrefNew);
    }

    //----------------------------------------------------------------------
    function configure(config, defaultConfig) {
        var conf_ = defaultConfig;
        var i;
        if ($.isPlainObject(config)) {
            if ($.type(config.title) === 'string' || $.type(config.title) === 'array') {
                conf_.title = config.title;
            }
            if ($.isPlainObject(config.resolveIdentifierSetting)) {
                if ($.type(config.resolveIdentifierSetting.manifestUrlPrefix) === 'string') {
                    var manifestUrlPrefix = config.resolveIdentifierSetting.manifestUrlPrefix;
                    if (manifestUrlPrefix && manifestUrlPrefix.slice(-1) !== '/') { //記載漏れ救済
                        manifestUrlPrefix = manifestUrlPrefix + '/';
                    }
                    conf_.resolveIdentifierSetting.manifestUrlPrefix = manifestUrlPrefix;
                }
                if ($.type(config.resolveIdentifierSetting.identifierPattern) === 'string') {
                    conf_.resolveIdentifierSetting.identifierPattern = config.resolveIdentifierSetting.identifierPattern;
                }
                if ($.type(config.resolveIdentifierSetting.manifestUrlSuffix) === 'string') {
                    conf_.resolveIdentifierSetting.manifestUrlSuffix = config.resolveIdentifierSetting.manifestUrlSuffix;
                }
                if ($.type(config.resolveIdentifierSetting.numberOfSlashesInIdentifier) === 'number') {
                    conf_.resolveIdentifierSetting.numberOfSlashesInIdentifier = config.resolveIdentifierSetting.numberOfSlashesInIdentifier;
                }
            }
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
            if ($.isPlainObject(config.manifest)) {
                if ($.isArray(config.manifest.steps)) {
                    var pageSteps = [];
                    for (i = 0; i < config.manifest.steps.length; i++) {
                        var pageStep = config.manifest.steps[i];
                        if ($.type(pageStep) === 'number') {
                            pageSteps.push(pageStep);
                        }
                    }
                    conf_.manifest.steps = pageSteps;
                }
            }
            if ($.isPlainObject(config.timeline)) {
                if ($.isArray(config.timeline.steps)) {
                    var timelineSteps = [];
                    for (i = 0; i < config.timeline.steps.length; i++) {
                        var timelineStep = config.timeline.steps[i];
                        if ($.type(timelineStep) === 'number') {
                            timelineSteps.push(timelineStep);
                        }
                    }
                    conf_.timeline.steps = timelineSteps;
                }
            }
            if ($.isPlainObject(config.service)) {
                if ($.type(config.service.croppedImageExportUrl) === 'string') {
                    conf_.service.croppedImageExportUrl = config.service.croppedImageExportUrl;
                }
                if ($.type(config.service.curationJsonExportUrl) === 'string') {
                    conf_.service.curationJsonExportUrl = config.service.curationJsonExportUrl;
                }
            }
            if ($.isPlainObject(config.controls)) {
                if ($.type(config.controls.enableAutoHide) === 'boolean') {
                    conf_.controls.enableAutoHide = config.controls.enableAutoHide;
                }
            }
            if ($.isPlainObject(config.doc)) {
                if ($.type(config.doc.aboutUrl) === 'string' || $.type(config.doc.aboutUrl) === 'array') {
                    conf_.doc.aboutUrl = config.doc.aboutUrl;
                }
            }
        }
        conf_.service.croppedImageExport = conf_.service.croppedImageExportUrl;
        conf_.service.curationJsonExport = conf_.service.curationJsonExportUrl;
        return conf_;
    }

    function setupManifestDroppableArea() {
        // manifest drag and drop
        var $droppable = $('#image_canvas');
        $droppable.on('dragover', function(e) {
            e.stopPropagation();
            e.preventDefault();
        });
        $droppable.on('dragenter', function(e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).addClass('manifest_dragging');
        });
        $droppable.on('drop', function(e) {
            e.preventDefault();
            $(this).removeClass('manifest_dragging');
            var url = e.originalEvent.dataTransfer.getData('URL');
            if (!url) {
                var text = e.originalEvent.dataTransfer.getData('text/plain');
                var anchor = document.createElement('a');
                anchor.href = text;
                var href = anchor.href;
                if (href) {
                    if (/^https?:\/\//.test(href) && /manifest(\.json)?$/.test(href)) {
                        //URLだけからmanifestであることは判断できないので、
                        //manifest または manifest.json で終了している場合のみを対象とする。
                        url = href;
                    }
                }
            }
            if (url) {
                var manifestUrl;
                var canvasUrl;
                if (url.indexOf('?') > -1) {
                    var search = url.substring(url.indexOf('?'));
                    var params_ = getParams(search);
                    if (params_) {
                        manifestUrl = params_.manifest;
                        canvasUrl = params_.canvas;
                    }
                }
                page = 0;
                params = {};
                params.manifest = manifestUrl || url;
                bookInfos = [];
                pageInfos = [];
                curationInfo = {};
                updateHistory();
                processManifestUrl(params.manifest, canvasUrl);
            }
        });
        $(document).on('dragenter', function(e) {
            e.stopPropagation();
            e.preventDefault();
            $droppable.removeClass('manifest_dragging');
        });
        $(document).on('dragover drop', function(e) {
            e.stopPropagation();
            e.preventDefault();
        });
    }

    function getParams(search) {
        var query = search.substring(1);
        if (query !== '') {
            var params = query.split('&');
            var paramsObj = {};
            for (var i = 0; i < params.length; i++) {
                var elems = params[i].split('=');
                if (elems.length > 1) {
                    var key = decodeURIComponent(elems[0]);
                    var val = decodeURIComponent(elems[1]);
                    paramsObj[key] = val;
                }
            }
            return paramsObj;
        } else {
            return null;
        }
    }

    function parsePagesParam(param) {
        if (!param) { return null; }
        var result = [];
        var books = param.split(':');
        for (var i = 0; i < books.length; i++) {
            var elems = books[i].split('/');
            var pageDataIndex = conf.resolveIdentifierSetting.numberOfSlashesInIdentifier + 1;
            var identifier = elems[0];
            if (elems.length > pageDataIndex - 1) {
                identifier = elems.slice(0, pageDataIndex).join('/');
            }
            if (!isValidIdentifier(identifier)) {
                continue;
            }
            var hasInvalidParam = false;
            var isFiltered = false;
            var pageRanges = [];
            if (elems.length > pageDataIndex && elems[pageDataIndex].length > 0) {
                //ページ絞り込みあり
                var pages = elems[pageDataIndex].split(',');
                for (var j = 0; j < pages.length; j++) {
                    var match = pages[j].match(/^(-?[0-9]+)(?:-(-?[0-9]+))?$/); //負数も認める
                    if (match) {
                        var startPage = parseInt(match[1], 10);
                        var endPage = startPage;
                        if (match[2] !== undefined) {
                            endPage = parseInt(match[2], 10);
                        }
                        if (startPage === 0 || endPage === 0) { //0は不可
                            hasInvalidParam = true;
                            break;
                        }
                        var pageRange = {
                            from : startPage, //1-based
                            to   : endPage    //1-based
                        };
                        pageRanges.push(pageRange);
                    } else {
                        hasInvalidParam = true;
                        break;
                    }
                }
                //結果的に元資料と同じ順番で全ページ表示されることになったとしても、
                //ページ絞り込みありとして扱う。
                isFiltered = true;
            } else {
                //ページ絞り込みなし（全ページが対象）
                pageRanges.push({ from: 1, to: -1 }); //-1は最終ページを意味する
                isFiltered = false;
            }
            if (!hasInvalidParam) {
                var manifestUrl = getManifestUrlFromIdentifier(identifier);
                if (manifestUrl) {
                    var bookParam = {
                        manifestUrl : manifestUrl,
                        pageRanges  : pageRanges,
                        isFiltered  : isFiltered
                    };
                    result.push(bookParam);
                }
            }
        }
        return (result.length > 0) ? result : null;
    }

    //----------------------------------------------------------------------
    //---------- curation関係 ----------
    //curationパラメータで指定されたcurationの取得 → preprocessManifestsまたはpreprocessTimelinesで内容処理
    function processCurationUrl(curationUrl) {
        $('#book_title').text((lng !== 'ja') ? 'Loading...' : '読み込み中です...');
        $('#page_navigation').hide();
        $.getJSON(curationUrl, function(curation_) {
            if (isValidCurationFalseTrue(curation_)) {
                var isAnnotationViewMode = false;
                if (getMode() === 'annotation' || curation_.viewingHint === 'annotation') {
                    //アノテーションビューモード
                    setMode('annotation');
                    enableCurationEdit = false;
                    isAnnotationViewMode = true;
                }
                //selectionsプロパティ
                var bookParams = [];
                var timelineParams = [];
                for (var i = 0; i < curation_.selections.length; i++) {
                    var range = curation_.selections[i];
                    // http://iiif.io/api/presentation/2.1/#range
                    if ($.isPlainObject(range) && range['@type'] === 'sc:Range') {
                        if (range.within) { //withinプロパティ
                            var manifestUrl = '';
                            var timelineUrl = '';
                            var within = range.within;
                            if ($.type(within) === 'string') {
                                manifestUrl = within;
                            } else if ($.isPlainObject(within) && within['@id'] && within['@type'] && $.type(within['@id']) === 'string') {
                                if (within['@type'] === 'sc:Manifest') {
                                    manifestUrl = within['@id'];
                                } else if (within['@type'] === 'tl:Manifest' || within['@type'] === 'codh:Manifest') {
                                    timelineUrl = within['@id'];
                                }
                            }
                            if (manifestUrl && isTrustedManifestUrl(manifestUrl)) {
                                var canvasIds = [];
                                var annots = [];
                                var j;
                                if ($.isArray(range.canvases)) { //Rangeのcanvasesプロパティによる表示対象指定
                                    if (!isAnnotationViewMode) {
                                        //キュレーションビューモード
                                        canvasIds = range.canvases; //canvasの@idの配列
                                    } else {
                                        //アノテーションビューモード
                                        for (j = 0; j < range.canvases.length; j++) {
                                            var canvasIdBase_ = range.canvases[j].split('#')[0];
                                            if (canvasIdBase_ && $.inArray(canvasIdBase_, canvasIds) === -1) {
                                                canvasIds.push(canvasIdBase_);
                                            }
                                            //metadata設定は何もないはずなので、アノテーションに変換した情報を付加
                                            var tempAnnot_ = {
                                                '@id': 'http://example.com/',
                                                '@type': 'oa:Annotation',
                                                'motivation': 'sc:painting',
                                                'resource': {
                                                    '@type': 'cnt:ContentAsText',
                                                    'chars': '',
                                                    'format': 'text/plain',
                                                    'marker': {
                                                        'border-color': '#00BFFF'
                                                    }
                                                },
                                                'on': range.canvases[j]
                                            };
                                            annots.push(tempAnnot_);
                                        }
                                    }
                                } else if ($.isArray(range.members)) { //membersプロパティによる表示対象指定
                                    //membersプロパティ内では、sc:Canvasのみ対応。membersプロパティ内のsc:Rangeは未対応。
                                    for (j = 0; j < range.members.length; j++) {
                                        var member = range.members[j];
                                        if ($.isPlainObject(member) && member['@id'] && member['@type']) {
                                            if (member['@type'] === 'sc:Canvas') {
                                                if (!isAnnotationViewMode) {
                                                    //キュレーションビューモード
                                                    canvasIds.push(member['@id']);
                                                } else {
                                                    //アノテーションビューモード
                                                    //フラグメントの差異は集約する
                                                    var canvasIdBase = member['@id'].split('#')[0];
                                                    if (canvasIdBase && $.inArray(canvasIdBase, canvasIds) === -1) {
                                                        canvasIds.push(canvasIdBase);
                                                    }
                                                    var foundAnnotationInMetadata = false;
                                                    var metadataString = '';
                                                    if ('metadata' in member) {
                                                        if ($.isArray(member.metadata)) {
                                                            for (var m = 0; m < member.metadata.length; m++) {
                                                                var metadatum = member.metadata[m];
                                                                if (metadatum && String(metadatum.label).toLowerCase() === 'annotation' && $.isArray(metadatum.value)) {
                                                                    foundAnnotationInMetadata = true;
                                                                    for (var n = 0; n < metadatum.value.length; n++) {
                                                                        var annotation = metadatum.value[n];
                                                                        if ($.isPlainObject(annotation) && annotation['@id'] && annotation['@type'] === 'oa:Annotation' &&
                                                                            annotation.motivation === 'sc:painting' && $.isPlainObject(annotation.resource)) {
                                                                            annotation.on = annotation.on || member['@id']; //curationInfo.curation に反映される
                                                                            annots.push(annotation);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                        if (!foundAnnotationInMetadata) {
                                                            metadataString += getLabelValuePair(member.metadata);
                                                        }
                                                    }
                                                    if (!foundAnnotationInMetadata) {
                                                        //metadata内にアノテーション情報がない場合、アノテーションに変換した情報を付加
                                                        var tempAnnot = {
                                                            '@id': 'http://example.com/',
                                                            '@type': 'oa:Annotation',
                                                            'motivation': 'sc:painting',
                                                            'resource': {
                                                                '@type': 'cnt:ContentAsText',
                                                                'chars': metadataString ? unescapeLimitedHtmlTag($('<span>').text(metadataString).prop('outerHTML')) : '',
                                                                'format': 'text/html',
                                                                'marker': {
                                                                    'border-color': '#00BFFF'
                                                                }
                                                            },
                                                            'on': member['@id']
                                                        };
                                                        annots.push(tempAnnot);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                if (canvasIds.length > 0) {
                                    var bookParam = {
                                        manifestUrl : manifestUrl,
                                        canvasIds   : canvasIds,
                                        isFiltered  : true //結果的に元資料と同じ順番で全ページ表示されることになったとしても、ページ絞り込みありとして扱う。
                                    };
                                    if (isAnnotationViewMode) {
                                        //アノテーションビューモード
                                        bookParam.annotations = annots;
                                    }
                                    bookParams.push(bookParam);
                                }
                            } else if (timelineUrl && isTrustedTimelineUrl(timelineUrl)) {
                                var canvasIds_ = [];
                                var canvasIndices = [];
                                var annots_ = [];
                                if ($.isArray(range.members)) { //membersプロパティによる表示対象指定のみ有効
                                    //membersプロパティ内では、sc:Canvasのみ対応。membersプロパティ内のsc:Rangeは未対応。
                                    for (var k = 0; k < range.members.length; k++) {
                                        var member_ = range.members[k];
                                        if ($.isPlainObject(member_) && member_['@id'] && member_['@type']) {
                                            if (!isAnnotationViewMode) {
                                                //キューレションビューモード
                                                var cursorIndex = getCursorIndexFromCanvas(member_);
                                                if (cursorIndex !== null) {
                                                    canvasIds_.push(member_['@id']);
                                                    canvasIndices.push(cursorIndex);
                                                }
                                            } else {
                                                //アノテーションビューモード
                                                var cursorIndex_ = getCursorIndexFromCanvas(member_);
                                                if (cursorIndex_ !== null && $.inArray(cursorIndex_, canvasIndices) === -1) {
                                                    //フラグメントの差異は集約する
                                                    var canvasIdBase__ = member_['@id'].split('#')[0];
                                                    if (canvasIdBase__ && $.inArray(canvasIdBase__, canvasIds_) === -1) {
                                                        canvasIds_.push(canvasIdBase__);
                                                        canvasIndices.push(cursorIndex_);
                                                    }
                                                }
                                                var foundAnnotationInMetadata_ = false;
                                                var metadataString_ = '';
                                                if ('metadata' in member_) {
                                                    if ($.isArray(member_.metadata)) {
                                                        for (var m_ = 0; m_ < member_.metadata.length; m_++) {
                                                            var metadatum_ = member_.metadata[m_];
                                                            if (metadatum_ && String(metadatum_.label).toLowerCase() === 'annotation' && $.isArray(metadatum_.value)) {
                                                                foundAnnotationInMetadata_ = true;
                                                                for (var n_ = 0; n_ < metadatum_.value.length; n_++) {
                                                                    var annotation_ = metadatum_.value[n_];
                                                                    if ($.isPlainObject(annotation_) && annotation_['@id'] && annotation_['@type'] === 'oa:Annotation' &&
                                                                        annotation_.motivation === 'sc:painting' && $.isPlainObject(annotation_.resource)) {
                                                                        annotation_.on = annotation_.on || member_['@id'];
                                                                        annots_.push(annotation_);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                    if (!foundAnnotationInMetadata_) {
                                                        metadataString_ += getLabelValuePair(member_.metadata);
                                                    }
                                                }
                                                if (!foundAnnotationInMetadata_) {
                                                    //metadata内にアノテーション情報がない場合、アノテーションに変換した情報を付加
                                                    var tempAnnot__ = {
                                                        '@id': 'http://example.com/',
                                                        '@type': 'oa:Annotation',
                                                        'motivation': 'sc:painting',
                                                        'resource': {
                                                            '@type': 'cnt:ContentAsText',
                                                            'chars': metadataString_ ? unescapeLimitedHtmlTag($('<span>').text(metadataString_).prop('outerHTML')) : '',
                                                            'format': 'text/html',
                                                            'marker': {
                                                                'border-color': '#00BFFF'
                                                            }
                                                        },
                                                        'on': member_['@id']
                                                    };
                                                    annots_.push(tempAnnot__);
                                                }
                                            }
                                        }
                                    }
                                }
                                if (canvasIds_.length > 0) {
                                    var timelineParam = {
                                        manifestUrl   : timelineUrl,
                                        canvasIds     : canvasIds_,
                                        canvasIndices : canvasIndices,
                                        isFiltered    : true
                                    };
                                    if (isAnnotationViewMode) {
                                        //アノテーションビューモード
                                        timelineParam.annotations = annots_;
                                    }
                                    timelineParams.push(timelineParam);
                                }
                            }
                        }
                    }
                }
                //timelineと非timelineの混在指定は未対応
                if (bookParams.length > 0) {
                    curationInfo = {
                        curation: curation_,
                        curationUrl: curationUrl
                    };
                    preprocessManifests(bookParams);
                } else if (timelineParams.length > 0) {
                    curationInfo = {
                        curation: curation_,
                        curationUrl: curationUrl
                    };
                    preprocessTimelines(timelineParams);
                } else {
                    err = new Error(); showError(1, err.lineNumber); //selectionsプロパティ記載異常
                }
            } else {
                err = new Error(); showError(1, err.lineNumber); //json異常（invalidもしくは対応外の内容）
            }
        }).fail(function(jqxhr, textStatus, error) {
            err = new Error(); showError(1, err.lineNumber, textStatus + ', ' + error); //jsonの取得に失敗
        });
    }

    //---------- timeline関係 ----------
    //curation.json内で指定されたtimeline(s)の取得 → processTimelinesで内容処理
    function preprocessTimelines(timelineParams) {
        $('#book_title').text((lng !== 'ja') ? 'Loading...' : '読み込み中です...');
        $('#page_navigation').hide();
        var i;
        var timelineParamsAggregated = []; //timelineParamsをtimelineUrlによって集計したもの
        {
            var timelineUrls = [];
            var timelineCanvasIds = []; //配列の配列になる
            var timelineCanvasIndices = []; //配列の配列になる
            for (i = 0; i < timelineParams.length; i++) {
                var idx = $.inArray(timelineParams[i].manifestUrl, timelineUrls);
                if (idx === -1) {
                    timelineUrls.push(timelineParams[i].manifestUrl);
                    timelineCanvasIds.push(timelineParams[i].canvasIds);
                    timelineCanvasIndices.push(timelineParams[i].canvasIndices);
                } else {
                    $.merge(timelineCanvasIds[idx], timelineParams[i].canvasIds);
                    $.merge(timelineCanvasIndices[idx], timelineParams[i].canvasIndices);
                }
            }
            for (i = 0; i < timelineUrls.length; i++) {
                var timelineParam = {
                    manifestUrl   : timelineUrls[i],
                    canvasIds     : timelineCanvasIds[i],
                    canvasIndices : timelineCanvasIndices[i],
                    isFiltered    : true
                };
                timelineParamsAggregated.push(timelineParam);
            }
        }
        var deferreds = [];
        for (i = 0; i < timelineParamsAggregated.length; i++) {
            deferreds.push($.getJSON(timelineParamsAggregated[i].manifestUrl));
        }
        $.when.apply($, deferreds).done(function() {
            //全てのtimeline.json取得に成功してから
            var timelines = [];
            if (deferreds.length === 1 && arguments[1] === 'success') {
                timelines.push(arguments[0]);
            } else {
                for (i = 0; i < deferreds.length; i++) {
                    if (arguments[i][1] === 'success') {
                        timelines.push(arguments[i][0]);
                    }
                }
            }
            if (deferreds.length === timelines.length) {
                processTimelines(timelines, timelineParamsAggregated, timelineParams);
            } else {
                err = new Error(); showError(1, err.lineNumber);
            }
        }).fail(function(jqxhr, textStatus, error) {
            err = new Error(); showError(1, err.lineNumber, textStatus + ', ' + error); //timeline.jsonの取得に失敗
        });
    }

    //timeline(s)の内容に基づいてcursor(s)を取得 → processCursorsで内容処理
    function processTimelines(timelines, timelineParamsAggregated, timelineParams) {
        var i, j;
        var deferreds = [];
        var timelineParamsExt = [];
        for (i = 0; i < timelines.length; i++) {
            var timeline = timelines[i];
            if (isValidTimelineFalseTrue(timeline)) {
                var cursor = timeline.cursors[0];
                var cursorEndpointUrl = getCursorEndpointUrlFromCursor(cursor);
                if (!cursorEndpointUrl) {
                    continue;
                }

                var timelineUrl = timelineParamsAggregated[i].manifestUrl;
                var canvasIds = timelineParamsAggregated[i].canvasIds;
                var canvasIndices = timelineParamsAggregated[i].canvasIndices;

                //キュレーションにより、同一のコマ（fragment付きを含む）が複数挙げられている場合、
                //同一のcursorIndexに対してCursorを複数回取得するのは非効率なので、cursorIndexで束ねる。
                //あるcursorIndexで取得したCursorの中から、どのCanvasIdのものを探せば良いか分かるように、
                //cursorIndexとCanvasIdの対応関係をリストアップしておく
                var cursorIndexToCanvasIdsMap = [];
                for (j = 0; j < canvasIds.length; j++) {
                    var canvasId = canvasIds[j];
                    var cursorIndex = canvasIndices[j];
                    if (cursorIndexToCanvasIdsMap[cursorIndex]) {
                        if ($.inArray(cursorIndexToCanvasIdsMap[cursorIndex], canvasId) === -1) {
                            cursorIndexToCanvasIdsMap[cursorIndex].push(canvasId);
                        }
                    } else {
                        cursorIndexToCanvasIdsMap[cursorIndex] = [canvasId];
                    }
                }

                var cursorFirst = getCursorIndexFromProp(cursor.first);
                var cursorLast = getCursorIndexFromProp(cursor.last);
                var validCursorIndices = []; //配列
                var validCursorIndexCanvasIds = []; //配列の配列
                for (j = 0; j < canvasIndices.length; j++) {
                    var cursorIndex_ = canvasIndices[j];
                    var isInvalidCursorIndex = false;
                    if (cursorFirst !== null && cursorIndex_ < cursorFirst) {
                        isInvalidCursorIndex = true;
                    }
                    if (cursorLast !== null && cursorIndex_ > cursorLast) {
                        isInvalidCursorIndex = true;
                    }
                    if (!isInvalidCursorIndex) {
                        if ($.inArray(cursorIndex_, validCursorIndices) === -1) { //重複を除去
                            if (getCursorUrl(cursorEndpointUrl, cursorIndex_)) {
                                validCursorIndices.push(cursorIndex_);
                                validCursorIndexCanvasIds.push(cursorIndexToCanvasIdsMap[cursorIndex_]);
                            }
                        }
                    }
                }

                for (j = 0; j < validCursorIndices.length; j++) {
                    var cursorUrl = getCursorUrl(cursorEndpointUrl, validCursorIndices[j]);
                    if (cursorUrl) {
                        deferreds.push($.getJSON(cursorUrl));
                    }
                }

                var timelineParamExt = {
                    timeline      : timeline,
                    timelineUrl   : timelineUrl,
                    cursorIndexCanvasIds : validCursorIndexCanvasIds //配列の配列
                };
                timelineParamsExt.push(timelineParamExt);

            } else {
                //err = new Error(); showError(1, err.lineNumber); //json異常（invalidもしくは対応外の内容）
            }
        }
        $.when.apply($, deferreds).done(function() {
            //全てのcursor取得に成功してから
            var cursors = [];
            if (deferreds.length === 1 && arguments[1] === 'success') {
                cursors.push(arguments[0]);
            } else {
                for (i = 0; i < deferreds.length; i++) {
                    if (arguments[i][1] === 'success') {
                        cursors.push(arguments[i][0]);
                    }
                }
            }
            if (deferreds.length === cursors.length) {
                processCursors(cursors, timelineParamsExt, timelineParams);
            } else {
                err = new Error(); showError(1, err.lineNumber);
            }
        }).fail(function(jqxhr, textStatus, error) {
            err = new Error(); showError(1, err.lineNumber, textStatus + ', ' + error); //cursorの取得に失敗
        });
    }

    //timeline(s)とcursors(s)の内容をマージ → processManifestsで内容処理
    function processCursors(cursors, timelineParamsExt, timelineParams) {
        var argc = 0;
        var timelines = [];
        var timelineUrls = [];
        for (var i = 0; i < timelineParamsExt.length; i++) {
            var timeline = timelineParamsExt[i].timeline;
            var cursorIndexCanvasIds = timelineParamsExt[i].cursorIndexCanvasIds; //配列の配列
            var canvases = []; //Canvasオブジェクトの配列
            for (var j = 0; j < cursorIndexCanvasIds.length; j++) {
                var cursor = cursors[argc++];
                if (isValidCursorFalseTrue(cursor)) {
                    var canvasIds = cursorIndexCanvasIds[j]; //このCursorの中で探すべきCanvasIdの配列
                    for (var k = 0; k < canvasIds.length; k++) {
                        var canvasId = canvasIds[k].split('#')[0];
                        for (var m = 0; m < cursor.sequence.canvases.length; m++) {
                            var canvas = cursor.sequence.canvases[m];
                            if (canvas && canvas['@id'] === canvasId) {
                                canvases.push(canvas);
                                break;
                            }
                        }
                    }
                }
            }
            $.unique(canvases);
            if ($.isArray(timeline.sequences)) {
                timeline.sequences[0].canvases = canvases;
            } else {
                timeline.sequences = [
                    {
                        '@type': 'sc:Sequence',
                        'canvases': canvases
                    }
                ];
            }
            timelines.push(timeline);
            timelineUrls.push(timelineParamsExt[i].timelineUrl);
        }
        isTimelineMode = true;
        processManifests(timelines, timelineUrls, timelineParams);
    }

    //timelineパラメータで指定されたtimelineの取得 → processCursorUrlで内容処理
    function processTimelineUrl(timelineUrl) {
        $('#book_title').text((lng !== 'ja') ? 'Loading...' : '読み込み中です...');
        $('#page_navigation').hide();
        if (isTrustedTimelineUrl(timelineUrl)) { //外部のtimelineは扱わない
            $.getJSON(timelineUrl, function(timeline) {
                if (isValidTimelineFalseTrue(timeline)) {
                    var cursorUrl;
                    var cursor = timeline.cursors[0]; //sequencesと同様にcursorsも配列だが、先頭のみ対応
                    var cursorEndpointUrl = getCursorEndpointUrlFromCursor(cursor);
                    if (cursorEndpointUrl) {
                        var cursorIndex = cursorInfo.index;
                        var cursorFirst = getCursorIndexFromProp(cursor.first);
                        var cursorLast = getCursorIndexFromProp(cursor.last);
                        var cursorStep = getCursorIndexFromProp(cursor.step);
                        if (cursorIndex === null) {
                            var cursorDefalut = getCursorIndexFromProp(cursor.default);
                            if (cursorDefalut !== null) {
                                cursorIndex = cursorDefalut;
                            } else if (cursorFirst !== null) {
                                cursorIndex = cursorFirst;
                            } else if (cursorLast !== null) {
                                cursorIndex = cursorLast;
                            }
                        } else {
                            if (cursorFirst !== null && cursorIndex < cursorFirst) {
                                cursorIndex = cursorFirst;
                            } else if (cursorLast !== null && cursorIndex > cursorLast) {
                                cursorIndex = cursorLast;
                            }
                        }
                        cursorUrl = getCursorUrl(cursorEndpointUrl, cursorIndex);

                        cursorInfo.endpointUrl = cursorEndpointUrl;
                        cursorInfo.index = cursorIndex;
                        cursorInfo.first = cursorFirst;
                        cursorInfo.last = cursorLast;
                        if (cursorStep > 0) {
                            cursorInfo.step = cursorStep;
                        }
                        if (cursor.status) {
                            cursorInfo.status = cursor.status;
                        }
                    }
                    if (cursorUrl) {
                        processCursorUrl(cursorUrl, { timeline: timeline, timelineUrl: timelineUrl });
                    } else {
                        err = new Error(); showError(1, err.lineNumber); //プロパティ記載異常
                    }
                } else {
                    err = new Error(); showError(1, err.lineNumber); //json異常（invalidもしくは対応外の内容）
                }
            }).fail(function(jqxhr, textStatus, error) {
                err = new Error(); showError(1, err.lineNumber, textStatus + ', ' + error); //jsonの取得に失敗
            });
        } else {
            err = new Error(); showError(1, err.lineNumber);
        }
    }

    //cursorの取得 → processManifestsで内容処理
    function processCursorUrl(cursorUrl, options) {
        if ($.isPlainObject(options)) {
            if (options.timeline) {
                processCursorUrl.timeline = options.timeline;
            }
            if (options.timelineUrl) {
                processCursorUrl.timelineUrl = options.timelineUrl;
            }
        }
        $.getJSON(cursorUrl, function(cursor) {
            if (isValidCursorFalseTrue(cursor)) {
                var timelineUrl;
                if (cursor.within && $.type(cursor.within) === 'string') {
                    timelineUrl = cursor.within;
                } else {
                    timelineUrl = processCursorUrl.timelineUrl || cursorUrl;
                }
                var bookParam = {
                    manifestUrl : timelineUrl,
                    pageRanges  : [{ from: 1, to: -1 }],
                    isFiltered  : false
                };
                if (processCursorUrl.timeline) {
                    if ($.isArray(processCursorUrl.timeline.sequences)) {
                        processCursorUrl.timeline.sequences[0] = cursor.sequence;
                    } else {
                        processCursorUrl.timeline.sequences = [cursor.sequence];
                    }
                }

                cursorInfo.endpointUrl = getCursorEndpointUrlFromCursor(cursor);
                cursorInfo.index = getCursorIndexFromCursorUrl(cursorUrl);
                cursorInfo.prev = getCursorIndexFromProp(cursor.prev);
                cursorInfo.next = getCursorIndexFromProp(cursor.next);

                var optPage;
                if ($.isPlainObject(options) && options.refCanvasId && options.direction) {
                    //移動前のCursorと移動後のCursorに範囲重複がないか確認する。
                    //refCanvasId：基準となるCanvasのid
                    //direction：基準となるCanvasからの移動方向（'next'または'prev'）
                    for (var i = 0; i < cursor.sequence.canvases.length; i++) {
                        if (cursor.sequence.canvases[i]['@id'] === options.refCanvasId) {
                            var page_ = i; //基準となるCanvasの位置
                            if (options.direction === 'next') {
                                page_ = page + pageStep;
                            } else if (options.direction === 'prev') {
                                page_ = page - pageStep;
                            } else {
                                break;
                            }
                            if (page_ >= 0 || page_ < cursor.sequence.canvases.length) {
                                optPage = page_;
                            }
                            break;
                        }
                    }
                }
                if (optPage === undefined) {
                    //Cursorの初読み込み時、または移動前後のCursorに範囲重複がないとき
                    if ($.isPlainObject(options) && options.outRange !== undefined) {
                        optPage = options.outRange;
                    }
                }
                if ($.isPlainObject(options) && options.resetInfos === true) {
                    bookInfos = [];
                    pageInfos = [];
                }
                processManifests([processCursorUrl.timeline], [timelineUrl], [bookParam], optPage);
            } else {
                err = new Error(); showError(1, err.lineNumber); //json異常（invalidもしくは対応外の内容）
            }
        }).fail(function(jqxhr, textStatus, error) {
            err = new Error(); showError(1, err.lineNumber, textStatus + ', ' + error); //jsonの取得に失敗
        });
    }

    //---------- manifest関係 ----------
    //manifestパラメータまたはドラッグ＆ドロップされたmanifestの取得 → processManifestsで内容処理
    //canvasUrl（省略可）：最初に表示するキャンバスのURL（省略時はGET引数のpageパラメータが利用される）
    function processManifestUrl(manifestUrl, canvasUrl) {
        $('#book_title').text((lng !== 'ja') ? 'Loading...' : '読み込み中です...');
        $('#page_navigation').hide();
        if (isTrustedManifestUrl(manifestUrl)) {
            $.getJSON(manifestUrl, function(manifest) {
                if (isValidManifestFalseTrue(manifest)) {
                    var bookParam = {
                        manifestUrl : manifestUrl,
                        canvasUrl   : canvasUrl,
                        pageRanges  : [{ from: 1, to: -1 }],
                        isFiltered  : false
                    };
                    processManifests([manifest], [manifestUrl], [bookParam]);
                } else {
                    err = new Error(); showError(1, err.lineNumber); //manifest異常（invalidもしくは対応外の内容）
                }
            }).fail(function(jqxhr, textStatus, error) {
                err = new Error(); showError(1, err.lineNumber, textStatus + ', ' + error); //manifest.jsonの取得に失敗
            });
        } else {
            err = new Error(); showError(1, err.lineNumber);
        }
    }

    //pagesパラメータまたはcuration.json内で指定されたmanifest(s)の取得 → processManifestsで内容処理
    function preprocessManifests(bookParams) {
        $('#book_title').text((lng !== 'ja') ? 'Loading...' : '読み込み中です...');
        $('#page_navigation').hide();
        var i;
        var manifestUrls = [];
        for (i = 0; i < bookParams.length; i++) {
            if ($.inArray(bookParams[i].manifestUrl, manifestUrls) === -1) {
                manifestUrls.push(bookParams[i].manifestUrl);
            }
        }
        var deferreds = [];
        for (i = 0; i < manifestUrls.length; i++) {
            deferreds.push($.getJSON(manifestUrls[i]));
        }
        $.when.apply($, deferreds).done(function() {
            //全てのmanifest.json取得に成功してから
            var manifests = [];
            if (deferreds.length === 1 && arguments[1] === 'success') {
                manifests.push(arguments[0]);
            } else {
                for (i = 0; i < deferreds.length; i++) {
                    if (arguments[i][1] === 'success') {
                        manifests.push(arguments[i][0]);
                    }
                }
            }
            if (deferreds.length === manifests.length) {
                processManifests(manifests, manifestUrls, bookParams);
            } else {
                err = new Error(); showError(1, err.lineNumber);
            }
        }).fail(function(jqxhr, textStatus, error) {
            err = new Error(); showError(1, err.lineNumber, textStatus + ', ' + error); //manifest.jsonの取得に失敗
        });
    }

    //manifest(s)の内容処理
    function processManifests(manifests, manifestUrls, bookParams, optPage) {
        function getCanvasSummary(canvas) {
            var imageApiVersion = '0.0';
            var imageComplianceLevel = -1;
            var imageInfoUrl;
            if (canvas.images[0].resource.service) {
                //The service must have the @context, @id and profile keys
                //https://iiif.io/api/annex/services/#image-information

                //Image API Version
                imageApiVersion = '1.0';
                var context = canvas.images[0].resource.service['@context'];
                var contextStrings = {
                    'http://iiif.io/api/image/2/context.json': '2.0',
                    'http://library.stanford.edu/iiif/image-api/1.1/context.json': '1.1'
                };
                if ($.type(context) === 'string') {
                    imageApiVersion = contextStrings[context] || imageApiVersion;
                } else if ($.isArray(context)) {
                    $.each(context, function(_, context_) {
                        if ($.type(context_) === 'string') {
                            imageApiVersion = contextStrings[context_] || imageApiVersion;
                        }
                    });
                }

                //service base URI
                imageInfoUrl = canvas.images[0].resource.service['@id'] + '/info.json';

                //Image API Compliance Level
                var profile = canvas.images[0].resource.service.profile;
                if ($.type(profile) === 'string') {
                    var match;
                    //IIIFの仕様では、Compliance Levelの記述は次のように指定することとなっている。
                    //Image API 2.x：http://iiif.io/api/image/2/level0.json
                    //Image API 1.1：http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0
                    //Image API 1.0：http://library.stanford.edu/iiif/image-api/compliance.html#level0
                    if (profile.indexOf('http://iiif.io/api/image/2/') === 0) {
                        match = profile.match(/level([0-2])\.json$/);
                        if (match) {
                            imageComplianceLevel = parseInt(match[1], 10);
                        }
                    } else if (profile.indexOf('http://library.stanford.edu/iiif/image-api/') === 0) {
                        //例えば Harvard Art Museumsの manifestでは、仕様に反して
                        //http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level1
                        //と記載している。こうしたサイトにも対応するため、判定基準を甘くする。
                        match = profile.match(/#level([0-2])$/);
                        if (match) {
                            imageComplianceLevel = parseInt(match[1], 10);
                        }
                    }
                }
            }

            //サムネイル
            var thumbnail;
            if ($.type(canvas.thumbnail) === 'string') {
                thumbnail = canvas.thumbnail;
            } else if ($.isPlainObject(canvas.thumbnail) && canvas.thumbnail['@id']) {
                thumbnail = canvas.thumbnail['@id'];
            }

            //Canvasオブジェクトの抜粋
            var canvasSummary = {
                id: canvas['@id'],
                label: canvas.label,
                imageInfoUrl: imageInfoUrl,
                cursorIndex: getCursorIndexFromCanvas(canvas),
                imageApiVersion: imageApiVersion,
                imageComplianceLevel: imageComplianceLevel, //IIIF Image API非対応リソースの場合は-1
                imageResourceId: canvas.images[0].resource['@id'], //Compliance Levelの低いサイトで画像全体を取得するために利用
                thumbnail: thumbnail,
                height: (typeof canvas.height === 'number') ? canvas.height : void 0,
                width: (typeof canvas.width === 'number') ? canvas.width : void 0
            };
            return canvasSummary;
        }
        var i, j, k;
        for (i = 0; i < manifests.length; i++) {
            var manifest = manifests[i];
            if (isValidManifestFalseTrue(manifest) || isValidTimelineFalseTrue(manifest)) {
                //処理途中の仮表示
                var text = $('#book_title').text() + ' ' + getPropertyValueI18n(manifest.label);
                document.title = text;
                $('#book_title').text(text);

                try {
                    var canvasesSummary = [];
                    for (j = 0; j < manifest.sequences[0].canvases.length; j++) {
                        var summary = getCanvasSummary(manifest.sequences[0].canvases[j]);
                        if (summary) {
                            canvasesSummary.push(summary);
                        }
                    }
                    var bookInfo = {
                        manifestUrl     : manifestUrls[i],
                        manifest        : manifest,
                        canvases        : canvasesSummary,
                        totalPagesNum   : canvasesSummary.length
                    };
                    bookInfos.push(bookInfo);
                } catch (e) {
                    //
                }
            }
        }
        manifestUrls = [];
        for (i = 0; i < bookInfos.length; i++) {
            manifestUrls.push(bookInfos[i].manifestUrl);
        }
        isFilteredContents = false;
        for (i = 0; i < bookParams.length; i++) {
            var bookParam = bookParams[i];
            var bookIndex = $.inArray(bookParam.manifestUrl, manifestUrls);
            if (bookIndex > -1) {
                if (bookInfos[bookIndex].totalPagesNum > 0) {
                    var pageInfo = {};
                    var pageInfosLocal = [];
                    if (bookParam.pageRanges) {
                        //pagesパラメータで表示範囲が指定されている場合
                        for (j = 0; j < bookParam.pageRanges.length; j++) {
                            var pageRange = bookParam.pageRanges[j];
                            var startPage = pageRange.from; //1-based（ただし負数も許容）
                            var endPage = pageRange.to; //1-based（ただし負数も許容）
                            var totalPagesNum = bookInfos[bookIndex].totalPagesNum;
                            //負数は最後のページを基準とする位置（e.g. -1は最終ページ）
                            if (startPage < 0) {
                                startPage = startPage + totalPagesNum + 1;
                            }
                            if (startPage < 1 || startPage > totalPagesNum) {
                                startPage = 1;
                            }
                            if (endPage < 0) {
                                endPage = endPage + totalPagesNum + 1;
                            }
                            if (endPage < 1 || endPage > totalPagesNum) {
                                endPage = totalPagesNum;
                            }
                            if (startPage <= endPage) {
                                //正順
                                for (k = startPage; k <= endPage; k++) {
                                    pageInfo = {
                                        bookIndex : bookIndex,
                                        pageLocal : k //1-based
                                    };
                                    pageInfosLocal.push(pageInfo);
                                }
                            } else {
                                //逆順
                                for (k = startPage; k >= endPage; k--) {
                                    pageInfo = {
                                        bookIndex : bookIndex,
                                        pageLocal : k //1-based
                                    };
                                    pageInfosLocal.push(pageInfo);
                                }
                            }
                        }
                    } else if (bookParam.canvasIds) {
                        //curation.json内の"selections"で表示範囲が指定されている場合
                        for (j = 0; j < bookParam.canvasIds.length; j++) {
                            var canvasIdElems = bookParam.canvasIds[j].split('#');
                            var idx = $.inArray(canvasIdElems[0], getCanvasIds(bookIndex));
                            var fragment = void 0; //undefined
                            if (canvasIdElems.length > 1) {
                                fragment = canvasIdElems[1];
                            }
                            if (idx > -1) {
                                pageInfo = {
                                    bookIndex : bookIndex,
                                    pageLocal : idx + 1, //1-based（元資料でのページ番号）
                                    fragment  : fragment
                                };
                                pageInfosLocal.push(pageInfo);
                            }
                        }
                    }
                    if (bookParam.annotations) {
                        for (j = 0; j < bookParam.annotations.length; j++) {
                            var annotation = bookParam.annotations[j];
                            var canvasId;
                            if ($.isPlainObject(annotation.on) && $.type(annotation.on['@id']) === 'string') {
                                canvasId = annotation.on['@id'];
                            } else if ($.type(annotation.on) === 'string') {
                                canvasId = annotation.on;
                            }
                            var canvasIdElems_ = canvasId.split('#');
                            var idx_ = $.inArray(canvasIdElems_[0], getCanvasIds(bookIndex));
                            var fragment_ = void 0; //undefined
                            if (canvasIdElems_.length > 1) {
                                fragment_ = canvasIdElems_[1];
                            }
                            if (idx_ > -1) {
                                if (bookInfos[bookIndex].canvases[idx_].annotations === void 0) {
                                    bookInfos[bookIndex].canvases[idx_].annotations = [];
                                }
                                var annot = {
                                    fragment  : fragment_,
                                    resource  : annotation.resource
                                };
                                bookInfos[bookIndex].canvases[idx_].annotations.push(annot);
                            }
                        }
                    }
                    if (pageInfosLocal.length > 0) {
                        pageInfos = pageInfos.concat(pageInfosLocal);
                        isFilteredContents = isFilteredContents || bookParam.isFiltered;
                    }
                }
            }
        }
        if (pageInfos.length === 0) {
            err = new Error(); showError(1, err.lineNumber); //データ異常
            return;
        }
        //資料ナビのために、資料が切り替わる場所(page)を求めておく
        bookChangePages = [];
        var bookIndexPrev = -1;
        for (i = 0; i < pageInfos.length; i++) {
            var bookIndex_ = pageInfos[i].bookIndex;
            if (bookIndex_ !== bookIndexPrev) {
                bookChangePages.push(i); //0-based
            }
            bookIndexPrev = bookIndex_;
        }
        //curationパラメータで指定された外部キュレーションを表示するときは、編集用にsessionStorageへ格納する
        if (getBrowsingCurationUrl()) {
            var externalFavData = getBrowsingCurationFavs();
            setFavs(externalFavData, true); //キュレーション対象のcanvasとURLが格納される
            if (storageSession) {
                //上書きエクスポート時にも、キュレーションのlabel等（selections以外）を維持するため、元の値を格納しておく
                var browsingCurationJson = JSON.parse(JSON.stringify(getBrowsingCurationJson()));
                browsingCurationJson.selections = []; //キュレーションリスト画面の内容で差し替えるので保存不要
                try {
                    storageSession.setItem('curationJson', JSON.stringify(browsingCurationJson));
                } catch (e) {
                    enableCurationEdit = false;
                    err = new Error(); showError(2, err.lineNumber, e);
                }
            }
        }

        //左右矢印キーのイベントは、Leaflet側では処理しない
        L.Map.Keyboard.prototype.keyCodes.left = [];
        L.Map.Keyboard.prototype.keyCodes.right = [];

        //最初に表示するページ
        page = 0; //ページ指定がないときは、表示対象指定範囲の先頭ページを表示する。
        if ((optPage || optPage === 0) && /^(-?[0-9]+)$/.test(String(optPage))) {
            page = parseInt(String(optPage), 10);
            if (page < 0) {
                page = pageInfos.length + page;
            }
        } else {
            var match = location.search.match(/pos=([0-9]+?)(?:&|$)/);
            if (match) {
                page = parseInt(match[1], 10) - 1; //1-based to 0-based
            }
        }
        if (page < 0 || page > pageInfos.length - 1) {
            page = 0;
        }
        if (bookParams.length === 1 && bookParams[0].canvasUrl) {
            //単一のmanifestが指定された場合に限り、canvasUrlによって、最初に表示するページを
            //指定できるものとする。（Curationでは、同一キャンバスが複数回含まれることを
            //許容しており、canvasUrlだけでは、何ページ目を選択するべきか定まらないため。）
            var canvasUrl_ = bookParams[0].canvasUrl.replace(/^https:/, 'http:');
            for (i = 0; i < pageInfos.length; i++) {
                if (String(getCanvasId(i)).replace(/^https:/, 'http:') === canvasUrl_) {
                    page = i;
                    break;
                }
            }
        }

        //ナビゲーションUI表示
        $('#page_navigation').show();
        //移動量設定ナビの非表示
        var steps = isTimelineMode ? conf.timeline.steps : conf.manifest.steps;
        if ($.isArray(steps) && steps.length > 0 && !isFilteredContents) {
            $('#step_nav').show();
            $('#increase_step').attr('title', (lng !== 'ja') ? 'Increase Step' : 'コマ移動量を増やす');
            $('#decrease_step').attr('title', (lng !== 'ja') ? 'Decrease Step' : 'コマ移動量を減らす');
        } else {
            $('#step_nav').hide();
        }
        //日付入力の非表示
        if (isTimelineMode && !isFilteredContents && $.fn.datepicker) {
            $('#cursor_date').datepicker({
                autoclose: true,
                language: lng
            }).on('changeDate', function() {
                var cursorDate = $(this).datepicker('getDate');  //localized date object
                var unixTime = Math.round(cursorDate.getTime() / 1000); //universal time
                var cursorUrl = getCursorUrl(cursorInfo.endpointUrl, unixTime);
                if (cursorUrl && cursorInfo.index !== unixTime) {
                    cursorInfo.index = unixTime;
                    processCursorUrl(cursorUrl, { outRange: 0, resetInfos: true }); //pos指定をリセット
                }
            }).attr('title', (lng !== 'ja') ? 'Calender' : '日付指定');
            if (cursorInfo.first !== null) {
                var startDate = new Date(cursorInfo.first * 1000);
                $('#cursor_date').datepicker('setStartDate', startDate);
            }
            if (cursorInfo.last !== null) {
                var endDate = new Date(cursorInfo.last * 1000);
                $('#cursor_date').datepicker('setEndDate', endDate);
            }
        } else {
            $('#cursor_date').hide();
        }
        //最新画像に移動の非表示
        if (isTimelineMode && !isFilteredContents && cursorInfo.status === 'updating') {
            $('#timeline_latest').attr('title', (lng !== 'ja') ? 'Move to the latest' : '最新画像に移動');
        } else {
            $('#timeline_latest').hide();
        }
        //元資料の並び順で閲覧するリンクの非表示
        if (!isFilteredContents) {
            $('#page_orig_nav').hide();
        }
        //資料ナビの非表示
        if (bookChangePages.length === 1) {
            $('#books_nav').hide();
        }
        //ヘルプ
        $('#help_nav').attr('title', (lng !== 'ja') ? 'Help' : 'ヘルプ');
        $('#help_title').text(APP_NAME + ' v' + VERSION);
        $('#help_contents').html(getHelp());
        var aboutUrl = getPropertyValuesI18n(conf.doc.aboutUrl)[0];
        if (aboutUrl) {
            $('#help_more').attr('href', aboutUrl).text((lng !== 'ja') ? 'About this viewer' : 'このビューワについて');
        } else {
            $('#help_more').hide();
        }
        $('#help_close').text((lng !== 'ja') ? 'Close' : '閉じる');
        //キュレーションリスト作成ナビ
        if (enableCurationEdit) {
            $('#show_curation_list').attr('title', (lng !== 'ja') ? 'Show your curating list' : 'キュレーションリストを表示');
        } else {
            $('#curation_nav').hide();
        }
        //キュレーションリスト画面
        $('#curation_list_title').text((lng !== 'ja') ? 'Curating list' : 'キュレーションリスト');
        $('#curation_list_clear').html('<span class="glyphicon glyphicon-remove"></span> ' + ((lng !== 'ja') ? 'Clear All' : '全てクリア'))
            .attr('title', (lng !== 'ja') ? 'Clear this list' : 'キュレーションリストをクリア');
        $('#curation_list_export').html('<span class="glyphicon glyphicon-export"></span> ' + ((lng !== 'ja') ? 'Export' : 'エクスポート'))
            .attr('title', (lng !== 'ja') ? 'Export this list' : 'キュレーションリストをエクスポート');
        $('#curation_list_json').attr('title', (lng !== 'ja') ? 'Download this list as a JSON file' : 'JSONファイルとしてダウンロード');
        $('#curation_list_close').text((lng !== 'ja') ? 'Close' : '閉じる');
        //キュレーションリスト作成関係イベント登録
        setupCurationListEvents();
        //モーダル
        $('.modal').on('show.bs.modal hide.bs.modal', function() {
            isInTransition = true;
        });
        $('.modal').on('shown.bs.modal hidden.bs.modal', function() {
            isInTransition = false;
        });

        refreshPage(); //ページ画像を表示

        //キーボードショートカット
        $(document.body).keydown(function(event) {
            if (map === undefined) { return; }
            if (event.ctrlKey) { return; }
            if (event.keyCode === 37 || event.keyCode === 8 || event.keyCode === 188) { //left, backspace, ',' or '<'
                if (isThumbnailsHidden()) {
                    //ピックアップ内の次のコマに移動
                    onPrevPage();
                }
                //サムネイル一覧を表示中はサムネイル一覧内の移動にあてる
            } else if (event.keyCode === 39 || event.keyCode === 32 || event.keyCode === 190) { //right, space, '.' or '>'
                if (isThumbnailsHidden()) {
                    //ピックアップ内の前のコマに移動
                    onNextPage();
                }
                //サムネイル一覧を表示中はサムネイル一覧内の移動にあてる
            } else if (event.keyCode === 70) { //f(ullscreen)
                //フルスクリーン表示トグル
                toggleFullscreen();
            } else if (event.keyCode === 84) { //t(humbnail)
                //サムネイル一覧トグル
                if (!isInTransition) {
                    toggleThumbnails();
                }
            } else if (event.keyCode === 67) { //c(uration list)
                //キュレーションリスト表示トグル
                if (!isInTransition && enableCurationEdit) {
                    toggleCurationList();
                }
            } else if (event.keyCode === 76) { //l(ike)
                //キュレーションリスト登録切り替え
                if (isCurationListHidden() && enableCurationEdit) {
                    toggleFav();
                }
            } else if (event.keyCode === 107) { //+ (Numpad)
                map.zoomIn();
            } else if (event.keyCode === 109) { //- (Numpad)
                map.zoomOut();
            }
        });

        //サムネイル一覧
        var tnList = '';
        for (i = 0; i < pageInfos.length; i++) {
            j = i + 1;
            var tnUrl = getThumbnailUrl(i);
            var bookIndexTn = pageInfos[i].bookIndex;
            var imageTitle = getPropertyValueI18n(bookInfos[bookIndexTn].manifest.label) + '/' + pageInfos[i].pageLocal; //manifest.labelはuncleanの可能性あり
            // the preload image embedded below has taken form 'jPages' released under the MIT license, Copyright (c) 2011 by Luís Almeida.
            var preloadImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH4AAAB+CAIAAABtQTLfAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALiSURBVHhe7d27cuowGEVh3v8F3bmjc0VFR2zLFr98CR7GYmXCosokkvbh80YS1bk0viCBC5RrbCM9VgLppccEsGBbLz0mgAXbeukxASzY1kuPCWDBtl56TAALtvXSYwJYsK2XHhPAgm299JgAFmzrpccEsGBbLz0mgAXbeukxASzY1kuPCWDBtl56TAALtvXSYwJYsK2XHhPAgm299JgAFmzrpccEsGBbLz0mgAXbeukxASzY1kuPCWDBtl56TAALtvXSYwJYsK2XHhPAgm299JgAFmzrpccEsGBbLz0mgAXbeukxASz4M61vu/vj3rUnv8vr7fG4XftF6yx/8r92tdy/oK+NVGd96eu4HlgVpx82i+k1bh7TK/y6/2vYrIZdZnzdu2614aSd57q5ZJg4DIhhB5wqDGHpR+AJIf6cd/HhHYc/DL+fH0OiLPf69MDmEa8nVgA9viRKXwg3zfPYbIsTOZ+i5finbB4QH188fvcmHneqMJKmj/eexUUl7xBpe2lXF5lh/Lr1YcV5weUNKE+sAHp8yb9Jn9TjxiH98WdajNy5eMetux+ft4X+h/hpyMN2N6j5a8MiZ2enega9+XbOmYa2Pp6ge6fpdNVJj2L8NEzH8t4xu7HhpIkb5/M5hm+u8jn6+QqZ74bpKN2+XIZ9vheLbT9wucxndPEh2Jq4+9GMM2t9V/4M/Zu9qDVtsaHVinmx7nfQF4fK4gYKwTdf83+VFN+O+W+yw/P+jtZjzf4tWHrssUgvPSaABdt66TEBLNjWS48JYMG2XnpMAAu29dJjAliwrZceE8CCbb30mAAWbOulxwSwYFsvPSaABdt66TEBLNjWS48JYMG2XnpMAAu29dJjAliwrZceE8CCbb30mAAWbOulxwSwYFsvPSaABdt66TEBLNjWS48JYMG2XnpMAAu29dJjAliwrZceE8CCbb30mAAWbOulxwSwYFsvPSaABdt66TEBLNjWY/Q/NwKdVKPqVCYAAAAASUVORK5CYII=';
            var img = null;
            var $image = $('<img>').attr({ src: preloadImageData, alt: imageTitle, title: imageTitle, 'data-original': tnUrl });
            if (getCanvasImageInfoUrl(i)) {
                img = $image.prop('outerHTML');
            } else {
                //IIIF Image API非対応リソース
                img = getPsuedoIIIFThumbnail($image, i).prop('outerHTML');
            }
            var anchor = '<a href="javascript:iiifViewer.gotoPage(' + j + ');" class="thumbnail">' + img + '</a>'; //gotoPage()は1-based
            var label;
            if (isTimelineMode) {
                var canvasLabel = $('<span>').text(getPropertyValueI18n(getCanvasLabel(i))).text();
                label = '<span class="thumbnail_label">' + canvasLabel + '</span>';
            } else {
                label = '<span class="thumbnail_label">' + j + '</span>'; //1-based
            }
            tnList += '<li><div style="text-align: center;">' + anchor + label + '</div></li>';
        }
        $('#thumbnails_container').html(tnList);
        $('#thumbnails_close').text((lng !== 'ja') ? 'Close' : '閉じる');
        $('#thumbnails_nav').html('');

        //負荷軽減のため遅延表示
        $('ul li img').lazyload({
            event  : 'turnPage',
            effect : 'show'
        });

        $('#thumbnails_win').on('shown.bs.modal', function(/*event*/) {
            //可視状態になってからjPagesの設定を行わないと正しく動作しないため
            var THUMBNAILS_NUM_PER_PAGE = 20;
            var thumbnailsPage = Math.floor(page / THUMBNAILS_NUM_PER_PAGE) + 1;
            if ($('#thumbnails_nav').html() === '') {
                $('#thumbnails_nav').jPages({
                    containerID : 'thumbnails_container',
                    previous    : '«',
                    next        : '»',
                    animation   : '',
                    fallback    : 1,
                    delay       : 0,
                    perPage     : THUMBNAILS_NUM_PER_PAGE,
                    startPage   : thumbnailsPage,
                    keyBrowse   : true,
                    callback    : function(pages, items) {
                        items.showing.find('img').trigger('turnPage');
                        items.oncoming.find('img').trigger('turnPage');
                        $('#thumbnails_container li a').eq(page).focus();
                    }
                });
            } else {
                $('#thumbnails_nav').jPages(thumbnailsPage);
                $('#thumbnails_container li a').eq(page).focus();
            }
        });

        //GET引数によるその他のオプション動作
        if ('tn' in params) { //thumbnails
            if (params.tn === '1') {
                showThumbnails();
            }
        } else if ('full' in params) { //fullscreen
            //フルスクリーン状態でサムネイル一覧は表示できないため、else ifとする。
            if (params.full === '1') {
                toggleFullscreen();
            }
        }
    }

    //----------------------------------------------------------------------
    function refreshPage() {
        setupNavigations();

        var zoom;
        var center;
        var fitBounds;
        var isFullscreenMode = false;
        var toolbarNextPrev;
        var TILE_SIZE_PREFERRED = 1024;
        var TILE_SIZE_DEFAULT = 256;
        var MASK_LAYER_NAME = 'fragment';
        var ANNOTATION_LAYER_NAME = 'annotations';
        var isFirstTime;
        var width = getCanvasWidth(page);
        var tileSize = (width >= TILE_SIZE_PREFERRED) ? TILE_SIZE_PREFERRED : TILE_SIZE_DEFAULT;
        if (width < tileSize && width > 0) {
            tileSize = width;
        }
        if (map === undefined) {
            center = [0, 0];
            zoom = 0;
            fitBounds = false; //true;
            isFirstTime = true;
        } else {
            center = map.getCenter();
            zoom = map.getZoom();
            fitBounds = false;
            isFullscreenMode = isFullscreen();
            map.eachLayer(function(layer) {
                if (layer.options && layer.options.name === MASK_LAYER_NAME) {
                    center = [0, 0];
                    zoom = 0;
                    fitBounds = true;
                }
            });
            if (tileSize > TILE_SIZE_DEFAULT) {
                map.spin(false);
            }
            map.remove();
        }
        //Chromeでは、ズームボタンを押下したときにmap全体が見えるようにスクロールする挙動へのworkaround
        //→ ズームインボタンに bootstrapの a:focusが適用されてしまう副作用があるためコメントアウト
        // L.Control.include({
        //     _refocusOnMap: L.Util.falseFn //https://github.com/Leaflet/Leaflet/issues/4125
        // });
        var fullscreenOptions = {
            pseudoFullscreen: true,
            title: {
                'false': (lng !== 'ja') ? 'View Fullscreen' : 'フルページ表示',
                'true' : (lng !== 'ja') ? 'Exit Fullscreen' : 'フルページ解除'
            }
        };
        var mapOptions = {
            crs: L.CRS.Simple,
            fullscreenControl: fullscreenOptions
        };
        map = L.map('image_canvas', mapOptions);
        var attribution = '';
        var bookIndex = pageInfos[page].bookIndex;
        if (bookInfos[bookIndex].manifest.attribution) {
            attribution = $('<span>').text(getPropertyValueI18n(bookInfos[bookIndex].manifest.attribution)).prop('outerHTML');
            attribution = unescapeLimitedHtmlTag(attribution);
        }
        var iiif;
        if (getCanvasImageInfoUrl(page)) {
            iiif = L.tileLayer.iiif(getCanvasImageInfoUrl(page), {
                tileSize: getCanvasImageComplianceLevel(page) ? tileSize : void 0,
                fitBounds: fitBounds,
                attribution: attribution
            });
            iiif.hasImageAPIservice = true;
        } else {
            iiif = L.imageOverlayCustom(getCanvasImageResourceId(page), getCanvasWidth(page), getCanvasHeight(page), {
                fitBounds: fitBounds,
                attribution: attribution
            });
            iiif.hasImageAPIservice = false;
        }
        iiif.id = 'iiif';
        map.addLayer(iiif);
        map.setView(center, zoom);
        if (map.attributionControl) {
            map.attributionControl.setPrefix('<a href="http://codh.rois.ac.jp/software/iiif-curation-viewer/">ICViewer</a>');
        }
        if (tileSize > TILE_SIZE_DEFAULT) {
            var DELAY_TIME_TO_SHOW_SPIN = 200; //ms
            var isTileLoadDone = false;
            setTimeout(function() {
                if (isTileLoadDone === false) {
                    map.spin(true);
                }
            }, DELAY_TIME_TO_SHOW_SPIN); //読み込み済みページへの移動でも一瞬spinが表示されるのは見苦しいので遅延実行する
            iiif.on('load', function() {
                isTileLoadDone = true;
                map.spin(false);
            });
            iiif.on('tileerror', function() {
                isTileLoadDone = true;
                map.spin(false);
            });
            iiif.on('tileload', function() {
                isTileLoadDone = true;
                map.spin(false);
            });
        }
        iiif.on('load', function() {
            function getBoundsFromFragment(fragment) {
                var bounds;
                if (fragment) {
                    //https://www.w3.org/TR/media-frags/#naming-space
                    var match = fragment.match(/xywh=(?:pixel:)?([0-9]+),([0-9]+),([0-9]+),([0-9]+)/); //「percent:」は未対応
                    if (match) {
                        var x = parseInt(match[1], 10);
                        var y = parseInt(match[2], 10);
                        var w = parseInt(match[3], 10);
                        var h = parseInt(match[4], 10);

                        var minPoint = L.point(x, y);
                        var maxPoint = L.point(x + w, y + h);
                        var minLatLng = map.unproject(minPoint, iiif.maxNativeZoom);
                        var maxLatLng = map.unproject(maxPoint, iiif.maxNativeZoom);
                        bounds = L.latLngBounds(minLatLng, maxLatLng);
                    }
                }
                return bounds;
            }
            function getBoundsFull() {
                var minCanvasLatLng = L.latLng(0, 0);
                var maxCanvasPoint = L.point(iiif.x, iiif.y);
                var maxCanvasLatLng = map.unproject(maxCanvasPoint, iiif.maxNativeZoom);
                return L.latLngBounds(minCanvasLatLng, maxCanvasLatLng);
            }
            if (iiif.x && iiif.y) {
                var bounds;
                if (getBrowsingCurationUrl()) {
                    //キュレーション表示時
                    bounds = getBoundsFromFragment(pageInfos[page].fragment);
                    if (bounds) {
                        var boundsFull = getBoundsFull();
                        var polyCanvas = [boundsFull.getNorthWest(), boundsFull.getNorthEast(),
                            boundsFull.getSouthEast(), boundsFull.getSouthWest(), boundsFull.getNorthWest()];
                        var polyHole = [bounds.getNorthWest(), bounds.getNorthEast(),
                            bounds.getSouthEast(), bounds.getSouthWest(), bounds.getNorthWest()];
                        var polyOption = {
                            color: '#ddd',
                            weight: 1,
                            fill: true,
                            fillOpacity: 0.9,
                            name: MASK_LAYER_NAME
                        };
                        L.polygon([polyCanvas, polyHole], polyOption).addTo(map);
                    } else {
                        if (isFirstTime) {
                            isFirstTime = false;
                            if (getMode() === 'annotation') {
                                //アノテーションビューモード
                                bounds = getBoundsFromFragment('xywh=' + params.zoom); //ズームのみ（bounding boxなし）
                            }
                            if (!bounds) {
                                bounds = getBoundsFull(); //最初にコマを表示したときに限り、部分領域指定がなければ全体表示
                            }
                        }
                    }
                } else {
                    //manifest/timeline表示時
                    if (isFirstTime) {
                        //最初にコマを表示したときに限り、
                        //GETパラメータによる初期ズーム領域を反映させる
                        isFirstTime = false;
                        bounds = getBoundsFromFragment('xywh=' + params.xywh); //bounding box＋ズーム
                        if (!bounds) {
                            bounds = getBoundsFromFragment('xywh=' + params.zoom); //ズームのみ（bounding boxなし）
                            if (!bounds) { //どちらも未指定の場合は全体表示
                                //ユーザ自身によるズームやパンを維持するため、初回以外では適用してはならない
                                bounds = getBoundsFull();
                            }
                        } else {
                            //指定領域にbounding box
                            var polyHole_ = [bounds.getNorthWest(), bounds.getNorthEast(),
                                bounds.getSouthEast(), bounds.getSouthWest(), bounds.getNorthWest()];
                            var polyOption_ = {
                                color: '#00BFFF',
                                weight: 2,
                                fillOpacity: 0,
                            };
                            L.rectangle(polyHole_, polyOption_).addTo(map);
                        }
                    }
                    //curation中でfragmentが指定されている場合は、初回か否かによらずズームする
                    bounds = bounds || getBoundsFromFragment(pageInfos[page].fragment);
                }
                if (bounds) {
                    map.fitBounds(bounds);
                }

                if (pageInfos.length > 1) {
                    var $imageCanvasOverlayLeft = $('#image_canvas_overlay_left');
                    var $imageCanvasOverlayRight = $('#image_canvas_overlay_right');
                    //左右タップでページ移動
                    var bookIndex = pageInfos[page].bookIndex;
                    var viewingDirection = bookInfos[bookIndex].manifest.viewingDirection || (isTimelineMode ? 'left-to-right' : 'right-to-left'); //ビューワのデフォルトは右開きとする
                    $imageCanvasOverlayLeft.off('.prevnext');
                    $imageCanvasOverlayRight.off('.prevnext');
                    if (viewingDirection === 'right-to-left') {
                        $imageCanvasOverlayLeft.on('click.prevnext', function() { onNextPage(); });
                        $imageCanvasOverlayRight.on('click.prevnext', function() { onPrevPage(); });
                        $imageCanvasOverlayLeft.attr('href', 'javascript:void("next");');
                        $imageCanvasOverlayRight.attr('href', 'javascript:void("prev");');
                    } else {
                        $imageCanvasOverlayLeft.on('click.prevnext', function() { onPrevPage(); });
                        $imageCanvasOverlayRight.on('click.prevnext', function() { onNextPage(); });
                        $imageCanvasOverlayLeft.attr('href', 'javascript:void("prev");');
                        $imageCanvasOverlayRight.attr('href', 'javascript:void("next");');
                    }
                    if (lng !== 'ja') {
                        $imageCanvasOverlayLeft.html('<span aria-hidden="true" class="glyphicon glyphicon-chevron-left image_canvas_overlay_button_left"></span>');
                        $imageCanvasOverlayRight.html('<span aria-hidden="true" class="glyphicon glyphicon-chevron-right image_canvas_overlay_button_right"></span>');
                    } else {
                        if (viewingDirection === 'right-to-left') {
                            $imageCanvasOverlayLeft.html('<span aria-hidden="true" class="image_canvas_overlay_button_left">次</span>');
                            $imageCanvasOverlayRight.html('<span aria-hidden="true" class="image_canvas_overlay_button_right">前</span>');
                        } else {
                            $imageCanvasOverlayLeft.html('<span aria-hidden="true" class="image_canvas_overlay_button_left">前</span>');
                            $imageCanvasOverlayRight.html('<span aria-hidden="true" class="image_canvas_overlay_button_right">次</span>');
                        }
                    }

                    if ($imageCanvasOverlayLeft.is(':hidden')) {
                        $imageCanvasOverlayLeft.css({ opacity: 0.6 }).show();
                    }
                    if (!$imageCanvasOverlayLeft.is(':hover') || L.Browser.touch) {
                        $imageCanvasOverlayLeft.stop(true, false).fadeTo('normal', 0.01);
                    }
                    $imageCanvasOverlayLeft.on({
                        'mouseenter.prevnext touchstart.prevnext': function() {
                            $(this).stop(true, false).fadeTo('fast', 0.6);
                        },
                        'mouseleave.prevnext touchend.prevnext': function() {
                            $(this).stop(true, false).fadeTo('fast', 0.01);
                        }
                    });
                    if ($imageCanvasOverlayRight.is(':hidden')) {
                        $imageCanvasOverlayRight.css({ opacity: 0.6 }).show();
                    }
                    if (!$imageCanvasOverlayRight.is(':hover') || L.Browser.touch) {
                        $imageCanvasOverlayRight.stop(true, false).fadeTo('normal', 0.01);
                    }
                    $imageCanvasOverlayRight.on({
                        'mouseenter.prevnext touchstart.prevnext': function() {
                            $(this).stop(true, false).fadeTo('fast', 0.6);
                        },
                        'mouseleave.prevnext touchend.prevnext': function() {
                            $(this).stop(true, false).fadeTo('fast', 0.01);
                        }
                    });
                }

                //アノテーション表示
                var annotations = getCanvasAnnotations(page);
                if (annotations) {
                    var markers = [];
                    var getPointFromFragment = function(fragment) {
                        var point = null;
                        if (fragment) {
                            //https://www.w3.org/TR/media-frags/#naming-space
                            var match = fragment.match(/xy=(?:pixel:)?([0-9]+),([0-9]+)/);
                            if (match) {
                                var x = parseInt(match[1], 10);
                                var y = parseInt(match[2], 10);
                                point = L.point(x, y);
                            }
                        }
                        return point;
                    };
                    for (var i = 0; i < annotations.length; i++) {
                        var annotation = annotations[i];
                        var annotBounds = getBoundsFromFragment(annotation.fragment);
                        if (annotBounds) {
                            if ($.isPlainObject(annotation.resource) && $.isPlainObject(annotation.resource.marker)) {
                                var resource = annotation.resource;
                                var marker = resource.marker;
                                var resourceChars;
                                var markerUrl;
                                var markerAnchorPoint;
                                var markerHtml;
                                var markerId = i + 1;
                                var markerType = 0; //0: border, 1: char, 2: icon
                                if (resource.format === 'text/html') {
                                    resourceChars = getPropertyValueI18n(resource.chars);
                                } else { // text/plainなど
                                    if (resource.chars) {
                                        var resourceChars_ = getPropertyValueI18n(resource.chars);
                                        if (resourceChars_) {
                                            resourceChars = $('<span>').text(resourceChars_).prop('outerHTML');
                                        }
                                    }
                                }
                                if (marker['@id'] && marker['@type'] === 'dctypes:Image') {
                                    //画像マーカー
                                    var markerUrl_ = getPropertyValueI18n(marker['@id']);
                                    if (markerUrl_) {
                                        var markerIdElems = markerUrl_.split('#');
                                        markerUrl = markerIdElems[0];
                                        if (markerIdElems.length > 1) {
                                            markerAnchorPoint = getPointFromFragment(markerIdElems[1]);
                                        }
                                    }
                                }
                                if (markerUrl) {
                                    //画像マーカー
                                    markerType = 2;
                                    markerHtml = $('<img>').attr({ 'data-marker-id': markerId, src: markerUrl }).prop('outerHTML');
                                } else if ('text' in marker) {
                                    //文字マーカー
                                    markerType = 1;
                                    var $markerText = $('<span>');
                                    if (marker.color) {
                                        $markerText.css('color', marker.color);
                                    }
                                    markerHtml = $markerText.text(getPropertyValueI18n(marker.text)).prop('outerHTML');
                                } else {
                                    //枠マーカー
                                    markerType = 0;
                                }

                                if (markerType) {
                                    //文字マーカー、画像マーカー
                                    var divIconOptions = {
                                        html: markerHtml,
                                        className: 'icv-annotation-div-icon'
                                    };
                                    if (markerAnchorPoint) {
                                        divIconOptions.iconAnchor = markerAnchorPoint;
                                    }
                                    var center = annotBounds.getCenter();
                                    var myIcon = L.divIcon(divIconOptions);
                                    var markerOptions = {
                                        icon: myIcon,
                                        clickable: (markerUrl || resourceChars) ? true : false,
                                        name: ANNOTATION_LAYER_NAME,
                                        origCenterLat: center.lat,
                                        origCenterLng: center.lng,
                                        anchorPoint: markerAnchorPoint,
                                        markerId: markerId
                                    };
                                    var marker_;
                                    if (markerUrl || resourceChars) {
                                        marker_ = L.marker(center, markerOptions).bindPopup(resourceChars);
                                    } else {
                                        marker_ = L.marker(center, markerOptions);
                                    }
                                    markers.push(marker_);
                                } else {
                                    //枠マーカー
                                    var bounds_ = [annotBounds.getNorthWest(), annotBounds.getNorthEast(),
                                        annotBounds.getSouthEast(), annotBounds.getSouthWest(), annotBounds.getNorthWest()];
                                    var weight;
                                    if ('border-width' in marker) {
                                        weight = parseInt(marker['border-width'], 10);
                                    }
                                    if (isNaN(weight)) {
                                        weight = 2; //未指定の場合や指定エラーの場合のデフォルト値（値0の指定は有効とする）
                                    }
                                    var polyOption__ = {
                                        color: marker['border-color'] || '#00BFFF',
                                        weight: weight,
                                        fillOpacity: 0,
                                        clickable: resourceChars ? true : false
                                    };
                                    var marker__;
                                    if (resourceChars) {
                                        marker__ = L.rectangle(bounds_, polyOption__).bindPopup(resourceChars);
                                    } else {
                                        marker__ = L.rectangle(bounds_, polyOption__);
                                    }
                                    markers.push(marker__);
                                }
                            }
                        }
                    }
                    if (markers.length > 0) {
                        L.layerGroup(markers).addTo(map);

                        //マーカー表示調整パネル
                        var OFFSET_FACTOR = 1;
                        var sliderOffsetXFunc = function(value) {
                            annotationDisplayConf.offsetX = value;
                            map.eachLayer(function(layer) {
                                if (layer.options && layer.options.name === ANNOTATION_LAYER_NAME) {
                                    var latLng = layer.getLatLng();
                                    layer.setLatLng([latLng.lat, layer.options.origCenterLng + (value - 50) * OFFSET_FACTOR]);
                                }
                            });
                        };
                        var sliderOffsetYFunc = function(value) {
                            annotationDisplayConf.offsetY = value;
                            map.eachLayer(function(layer) {
                                if (layer.options && layer.options.name === ANNOTATION_LAYER_NAME) {
                                    var latLng = layer.getLatLng();
                                    layer.setLatLng([layer.options.origCenterLat - (value - 50) * OFFSET_FACTOR, latLng.lng]);
                                }
                            });
                        };
                        var sliderOpacityFunc = function(value) {
                            annotationDisplayConf.opacity = value;
                            $('.icv-annotation-div-icon').css({ opacity: value / 100 });
                            $('.leaflet-overlay-pane').css({ opacity: value / 100 });
                        };
                        var sliderSizeFunc = function(value) {
                            annotationDisplayConf.size = value;
                            $('.icv-annotation-div-icon > span').parent().css({
                                'display': 'flex',
                                'align-items': 'center',
                                'justify-content': 'center',
                                'font-size': (value / 50) + 'em'
                            });
                            map.eachLayer(function(layer) {
                                if (layer.options && layer.options.name === ANNOTATION_LAYER_NAME) {
                                    if (layer.options.markerId && layer.options.anchorPoint) {
                                        $('.icv-annotation-div-icon > img[data-marker-id="' + layer.options.markerId + '"]').css({
                                            'transform-origin': layer.options.anchorPoint.x + 'px ' + layer.options.anchorPoint.y + 'px'
                                        });
                                    }
                                }
                            });
                            $('.icv-annotation-div-icon > img').css({
                                'transform': 'scale(' + value / 50 + ')'
                            });
                        };
                        var sliderOffsetX = {
                            callback: sliderOffsetXFunc,
                            id: 'sliderOffsetX',
                            name: (lng !== 'ja') ? 'Horizontal Offset' : '横方向移動量',
                            initialValue: annotationDisplayConf.offsetX,
                            title: (lng !== 'ja') ? 'Left <--> Right' : '左←→右'
                        };
                        var sliderOffsetY = {
                            callback: sliderOffsetYFunc,
                            id: 'sliderOffsetY',
                            name: (lng !== 'ja') ? 'Vertical Offset' : '縦方向移動量',
                            initialValue: annotationDisplayConf.offsetY,
                            title: (lng !== 'ja') ? 'Up <--> Down' : '上←→下'
                        };
                        var sliderOpacity = {
                            callback: sliderOpacityFunc,
                            id: 'sliderOpacity',
                            name: (lng !== 'ja') ? 'Opacity' : '不透明度',
                            initialValue: annotationDisplayConf.opacity,
                            title: (lng !== 'ja') ? '' : '透明←→不透明'
                        };
                        var sliderSize = {
                            callback: sliderSizeFunc,
                            id: 'sliderSize',
                            name: (lng !== 'ja') ? 'Size' : 'サイズ',
                            initialValue: annotationDisplayConf.size,
                            title: (lng !== 'ja') ? 'Small <--> Large' : '小←→大'
                        };
                        var curation = getBrowsingCurationJson();
                        var legendUrl;
                        var legendLabel = (lng !== 'ja') ? 'Legend' : '凡例';
                        if (curation && 'related' in curation) {
                            var relatedArray = [];
                            if ($.isArray(curation.related)) {
                                relatedArray = curation.related;
                            } else if ($.isPlainObject(curation.related)) {
                                relatedArray = [curation.related];
                            }
                            for (var j = 0; j < relatedArray.length; j++) {
                                var related = relatedArray[j];
                                if ($.isPlainObject(related)) {
                                    if (related['@id'] && related['@type'] === 'cr:MarkerLegend') {
                                        legendUrl = getPropertyValueI18n(related['@id']);
                                        if (related.label) {
                                            legendLabel = getPropertyValueI18n(related.label);
                                        }
                                    }
                                }
                            }
                        }
                        var slidersOption = { position: 'bottomleft' };
                        if (legendUrl) {
                            slidersOption.footer = $('<a>').attr({ href: legendUrl, target: '_blank' }).text(legendLabel).prop('outerHTML');
                        }
                        L.control.sliders([sliderOffsetX, sliderOffsetY, sliderOpacity, sliderSize], slidersOption).addTo(map);
                        sliderOffsetXFunc(annotationDisplayConf.offsetX);
                        sliderOffsetYFunc(annotationDisplayConf.offsetY);
                        sliderOpacityFunc(annotationDisplayConf.opacity);
                        sliderSizeFunc(annotationDisplayConf.size);
                    }
                }
            }
            iiif.off('load');
        });
        map.on('fullscreenchange', function() {
            //フルスクリーン表示のときに限り、Leaflet内にコマ移動ボタンを表示
            if (isFullscreen()) {
                if (pageInfos.length > 1) {
                    var customActionNext = L.ToolbarAction.extend({
                        options: {
                            toolbarIcon: {
                                html: (lng !== 'ja') ? '»' : '次',
                                tooltip: (lng !== 'ja') ? 'Next' : '次のコマへ移動'
                            }
                        },
                        addHooks: function() {
                            onNextPage();
                        }
                    });
                    var customActionPrev = L.ToolbarAction.extend({
                        options: {
                            toolbarIcon: {
                                html: (lng !== 'ja') ? '«' : '前',
                                tooltip: (lng !== 'ja') ? 'Previous' : '前のコマへ移動'
                            }
                        },
                        addHooks: function() {
                            onPrevPage();
                        }
                    });
                    if (L.ToolbarOrig) {
                        L.Toolbar = L.ToolbarOrig;
                    }
                    try {
                        toolbarNextPrev = new L.Toolbar.Control({
                            position: 'topleft',
                            actions: [customActionNext, customActionPrev]
                        });
                        toolbarNextPrev.addTo(map);
                    } catch (e) {
                        toolbarNextPrev = null;
                    }
                    if (L.ToolbarDraw) {
                        L.Toolbar = L.ToolbarDraw;
                    }
                }
            } else {
                if (toolbarNextPrev) {
                    if (L.ToolbarOrig) {
                        L.Toolbar = L.ToolbarOrig;
                    }
                    map.removeLayer(toolbarNextPrev);
                    if (L.ToolbarDraw) {
                        L.Toolbar = L.ToolbarDraw;
                    }
                }
            }
        });
        if (bookInfos[bookIndex].manifest.logo) {
            var logoUrls = getUriRepresentations(bookInfos[bookIndex].manifest.logo);
            if ($.isArray(logoUrls) && logoUrls.length > 0) {
                var logoUrl = logoUrls[0];
                var credit = L.controlCredits({
                    image: logoUrl,
                    link: 'javascript:iiifViewer.showInfo();',
                    text: 'More info...',
                    width: 24,
                    height: 32
                });
                credit.addTo(map);
                $('.leaflet-credits-control a').removeAttr('target');
            }
        }
        function getCroppedRegeion(layer) {
            if (iiif.x && iiif.y) {
                var bounds = layer.getBounds();
                var minLatLng = bounds.getNorthWest();
                var maxLatLng = bounds.getSouthEast();
                var maxCanvasPoint = L.point(iiif.x, iiif.y);
                var maxCanvasLatLng = map.unproject(maxCanvasPoint, iiif.maxNativeZoom); //LatLng
                if (maxCanvasLatLng.lng > 0 && maxCanvasLatLng.lat < 0) {
                    var region = {};
                    region.x = Math.round(iiif.x * minLatLng.lng / maxCanvasLatLng.lng);
                    region.y = Math.round(iiif.y * minLatLng.lat / maxCanvasLatLng.lat);
                    region.width = Math.round(iiif.x * (maxLatLng.lng - minLatLng.lng) / maxCanvasLatLng.lng);
                    region.height = Math.round(iiif.y * (maxLatLng.lat - minLatLng.lat) / maxCanvasLatLng.lat);
                    if (region.x < 0) { region.x = 0; }
                    if (region.y < 0) { region.y = 0; }
                    if (region.width <= 0) { region.width = 1; }
                    if (region.height <= 0) { region.height = 1; }
                    return [region.x, region.y, region.width, region.height].join(',');
                }
            }
            return null;
        }
        function getCroppedImageUrl(region) {
            if (region && iiif._baseUrl) {
                var cropUrl = L.Util.template(iiif._baseUrl, {
                    region: region,
                    size: 'full',
                    rotation: 0,
                    quality: iiif.options.quality,
                    format: iiif.options.tileFormat
                });
                return cropUrl;
            }
            return null;
        }
        function getCroppedImageExportHtml(cropUrl, opt) {
            var croppedImageExport = getCroppedImageExport(); //function or url
            if (croppedImageExport) {
                if ($.isFunction(croppedImageExport)) {
                    return croppedImageExport(cropUrl, opt);
                } else {
                    var params_ = [];
                    params_.push('image=' + encodeURIComponent(cropUrl));
                    params_.push('lang=' + lng);
                    if (params_.length > 0) {
                        croppedImageExport += '?' + params_.join('&');
                    }
                    var label = (lng !== 'ja') ? 'Clipping' : 'クリッピング';
                    return $('<a>').attr({ href: croppedImageExport, target: '_blank' }).addClass('btn btn-outline-primary').text(label).prop('outerHTML');
                }
            }
            return '';
        }
        function getCroppedImagePopupContents(cropUrl, opt) {
            var popupContents;
            if (conf.service.croppedImageExportUrl || conf.service.croppedImageExport) {
                popupContents = getCroppedImageExportHtml(cropUrl, opt);
            }
            if (!popupContents) {
                popupContents = $('<div>').css('word-break', 'break-all').append($('<a>').attr({ href: cropUrl, target: '_blank' }).text(cropUrl)).prop('outerHTML');
            }
            return popupContents;
        }
        function setPageInfoCropFragment(region) {
            if (region === undefined) {
                if (pageInfos[page].cropFragment !== undefined) {
                    delete pageInfos[page].cropFragment;
                    setupNavigations();
                }
            } else {
                pageInfos[page].cropFragment = 'xywh=' + region;
                setupNavigations();
            }
        }
        setPageInfoCropFragment();
        var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);
        if (lng === 'ja') {
            L.drawLocal.draw.toolbar.actions.text = 'キャンセル';
            L.drawLocal.draw.toolbar.actions.title = '選択モードをキャンセル';
            L.drawLocal.draw.toolbar.buttons.rectangle = '矩形領域を選択';
            L.drawLocal.draw.handlers.rectangle.tooltip.start = 'クリックしてドラッグで領域選択を開始';
            L.drawLocal.draw.handlers.simpleshape.tooltip.end = 'マウスを放して領域選択を完了';

            L.drawLocal.edit.toolbar.actions.save.text = '適用';
            L.drawLocal.edit.toolbar.actions.save.title = '編集や削除を適用';
            L.drawLocal.edit.toolbar.actions.cancel.text = 'キャンセル';
            L.drawLocal.edit.toolbar.actions.cancel.title = '編集や削除をキャンセル';

            L.drawLocal.edit.toolbar.buttons.edit = '領域選択を編集';
            L.drawLocal.edit.toolbar.buttons.editDisabled = '編集する領域選択はありません';
            L.drawLocal.edit.toolbar.buttons.remove = '領域選択を削除';
            L.drawLocal.edit.toolbar.buttons.removeDisabled = '削除する領域選択はありません';

            L.drawLocal.edit.handlers.edit.tooltip.text = 'ハンドルをドラッグして領域選択を編集</span><br>' +
                '<span class="leaflet-draw-tooltip-subtext">編集を取り消すには「キャンセル」をクリック</span>' +
                '<span class="leaflet-draw-tooltip-subsubtext">';
            L.drawLocal.edit.handlers.edit.tooltip.subtext = '';
            L.drawLocal.edit.handlers.remove.tooltip.text = '削除する領域選択をクリック</span><br>' +
                '<span class="leaflet-draw-tooltip-subtext">削除を確定するには「適用」をクリック';
        } else {
            L.drawLocal.edit.toolbar.actions.save.text = 'Apply';
            L.drawLocal.edit.toolbar.actions.save.title = 'Apply changes';
        }
        if (!L.Control.DrawUndraggable) {
            L.Control.DrawUndraggable = L.Control.Draw.extend({
                initialize: function(options) {
                    L.Util.setOptions(this, options);
                    L.Control.Draw.prototype.initialize.call(this, options);
                },
                onAdd: function(map) {
                    var container = L.Control.Draw.prototype.onAdd.call(this, map);
                    $(container).find('a').attr('draggable', 'false');
                    return container;
                }
            });
        }
        var drawControlDrawOnly = new L.Control.DrawUndraggable({
            draw: {
                polyline: false,
                polygon: false,
                circle: false,
                marker: false
            },
            edit: false,
            position: 'topright'
        });
        var drawControlEditOnly = new L.Control.DrawUndraggable({
            draw: false,
            edit: {
                featureGroup: drawnItems
            },
            position: 'topright'
        });
        map.addControl(drawControlDrawOnly);
        map.on(L.Draw.Event.DRAWSTART, function(e) {
            handleEvent(L.Draw.Event.DRAWSTART, e);
        });
        map.on(L.Draw.Event.CREATED, function(e) {
            if (iiif.x && iiif.y) {
                handleEvent(L.Draw.Event.CREATED, e);
                var layer = e.layer;
                var region = getCroppedRegeion(layer);
                var cropUrl = getCroppedImageUrl(region);
                if (cropUrl !== null || (iiif.hasImageAPIservice == false && region)) {
                    setPageInfoCropFragment(region);
                }
                layer.addEventListener('click', function(e) {
                    var region = getCroppedRegeion(layer);
                    var cropUrl = getCroppedImageUrl(region);
                    var popupContents;
                    if (cropUrl !== null) {
                        var opt = {
                            manifest: getManifestUrl(page),
                            canvas: getCanvasId(page)
                        };
                        popupContents = getCroppedImagePopupContents(cropUrl, opt);
                    } else {
                        popupContents = $('<div>').text((lng !== 'ja') ? 'IIIF Image API is not available' : 'IIIF Image APIが利用できません').prop('outerHTML');
                    }
                    layer.unbindPopup();
                    layer.bindPopup(popupContents);
                    layer.openPopup(e.latlng);
                });
                if (iiif.hasImageAPIservice) {
                    layer.bindLabel((lng !== 'ja') ? 'Click to view info' : '選択領域クリックで画像URL表示',
                        {
                            className: 'leaflet-label-custom'
                        });
                }
                drawnItems.addLayer(layer);
                if (drawControlDrawOnly._map) {
                    map.removeControl(drawControlDrawOnly);
                }
                map.addControl(drawControlEditOnly);

                //削除対象の選択 → 適用 の手順を踏まず、ごみ箱アイコンのクリックで即時削除する
                $('.leaflet-draw-edit-remove').on('click', function() {
                    drawnItems.eachLayer(function(layer) {
                        drawnItems.removeLayer(layer);
                    });
                    map.fire(L.Draw.Event.DELETED);
                });
            }
        });
        map.on(L.Draw.Event.EDITED, function(e) {
            if (iiif.x && iiif.y) {
                handleEvent(L.Draw.Event.EDITED, e);
                var layers = e.layers;
                layers.eachLayer(function(layer) {
                    layer.closePopup();
                    var region = getCroppedRegeion(layer);
                    var cropUrl = getCroppedImageUrl(region);
                    if (cropUrl !== null) {
                        setPageInfoCropFragment(region);
                    }
                });
            }
        });
        map.on(L.Draw.Event.EDITSTART, function(e) {
            handleEvent(L.Draw.Event.EDITSTART, e);
            drawnItems.eachLayer(function(layer) {
                layer.closePopup();
            });
        });
        map.on(L.Draw.Event.EDITRESIZE, function(e) {
            if (iiif.x && iiif.y) {
                handleEvent(L.Draw.Event.EDITRESIZE, e);
                var layer = e.layer;
                var region = getCroppedRegeion(layer);
                if (region) {
                    var elems = region.split(',');
                    var w = parseInt(elems[2], 10);
                    var h = parseInt(elems[3], 10);
                    var cropInfo = w + ' x ' + h + ((lng !== 'ja') ? ' pixels' : ' ピクセル');
                    if (h > 0) {
                        var ratio = (w / h).toFixed(3);
                        if (lng !== 'ja') {
                            cropInfo += ' (' + ratio + ')';
                        } else {
                            cropInfo += ' （縦横比 ' + ratio + '）';
                        }
                    }
                    if (lng === 'ja') {
                        $('.leaflet-draw-tooltip-subsubtext').html('<br>' + cropInfo);
                    } else {
                        $('.leaflet-draw-tooltip-subtext').html(cropInfo);
                    }
                }
            }
        });
        map.on(L.Draw.Event.DELETESTART, function(e) {
            handleEvent(L.Draw.Event.DELETESTART, e);
            drawnItems.eachLayer(function(layer) {
                layer.closePopup();
            });
        });
        map.on(L.Draw.Event.DELETED, function(e) {
            handleEvent(L.Draw.Event.DELETED, e);
            var count = 0;
            drawnItems.eachLayer(function() {
                count++;
            });
            if (count === 0) {
                if (drawControlEditOnly._map) {
                    map.removeControl(drawControlEditOnly);
                }
                map.addControl(drawControlDrawOnly);
                setPageInfoCropFragment();
            }
        });

        if (conf.controls.enableAutoHide) {
            var fadeControls = '.leaflet-control-zoom, .leaflet-control-fullscreen, .leaflet-control-toolbar, .leaflet-draw, .leaflet-control-layers';
            $('#image_canvas').off('.fadeControls');
            $('#image_canvas').on({
                'mouseenter.fadeControls touchstart.fadeControls': function() {
                    clearTimeout(fadeControlsTimerID);
                    $(fadeControls, '#image_canvas').stop(true, false).fadeTo('fast', 1);
                },
                'mouseleave.fadeControls': function() {
                    clearTimeout(fadeControlsTimerID);
                    $(fadeControls, '#image_canvas').stop(true, false).fadeTo('fast', 0.01);
                },
                'touchend.fadeControls': function() {
                    clearTimeout(fadeControlsTimerID);
                    fadeControlsTimerID = setTimeout(function() {
                        $(fadeControls, '#image_canvas').stop(true, false).fadeTo(3000, 0.01);
                    }, 1000);
                }
            });
            clearTimeout(fadeControlsTimerID);
            fadeControlsTimerID = setTimeout(function() {
                if (!$('#image_canvas').is(':hover') || L.Browser.touch) {
                    $(fadeControls, '#image_canvas').stop(true, false).fadeTo(3000, 0.01);
                }
            }, 1000);
        }

        if (isFullscreenMode !== isFullscreen()) {
            toggleFullscreen();
        }
        updateHistory();

        $(document).trigger('icv.refreshPage', [map]); //イベント送出
    }

    function setupNavigations() {
        var i, j, k;
        var bookIndex = pageInfos[page].bookIndex;
        var pageLocal = pageInfos[page].pageLocal; //1-based
        var curation = curationInfo.curation || {};

        //資料名
        var manifestLabel = getPropertyValueI18n(bookInfos[bookIndex].manifest.label);
        if (isTimelineMode) {
            var canvasLabel = getPropertyValueI18n(getCanvasLabel(page));
            document.title = manifestLabel + ' / ' + canvasLabel;
        } else {
            document.title = manifestLabel + ' / ' + pageLocal;
        }
        var $relatedLink = null;
        if (bookInfos[bookIndex].manifest.related) {
            var relatedLinkUrl = getHtmlLinkUrl(bookInfos[bookIndex].manifest.related);
            if (relatedLinkUrl) {
                $relatedLink = $('<a>').attr('href', relatedLinkUrl).text(manifestLabel);
            }
        }
        var $curationRelatedLink = null;
        if (curation.related && curation.label) {
            var curationRelatedLinkUrl = getHtmlLinkUrl(curation.related);
            if (curationRelatedLinkUrl) {
                $curationRelatedLink = $('<a>').attr('href', curationRelatedLinkUrl).text('（' + getPropertyValueI18n(curation.label) + '）');
            }
        }
        if ($relatedLink) {
            $('#book_title').html($relatedLink);
        } else {
            $('#book_title').text(manifestLabel);
        }
        if ($curationRelatedLink) {
            var $curationRelatedLinkSmall = $('<small>').html($curationRelatedLink);
            $('#book_title').append($curationRelatedLinkSmall);
        } else if (curation.label || 'label' in params) {
            var curationLabel = curation.label ? getPropertyValueI18n(curation.label) : params.label;
            var $curationLabelSmall = $('<small>').text('（' + curationLabel + '）');
            $('#book_title').append($curationLabelSmall);
        }

        //ページナビ
        var pageSelect = '';
        if (isFilteredContents) {
            //複数資料のうち、いずれかにおいてページ絞り込みがなされていれば、ピックアップありとする。
            pageSelect = (lng !== 'ja') ? 'Selected ' : 'ピックアップ ';
        }
        pageSelect += '<select class="nav_select" onChange="iiifViewer.gotoPage(this);">';
        if (isTimelineMode) {
            for (i = 0; i < pageInfos.length; i++) {
                var label = $('<span>').text(getPropertyValueI18n(getCanvasLabel(i))).text();
                j = i + 1;
                if (i !== page) {
                    pageSelect += '<option value="' + j + '">' + label + '</option>';
                } else {
                    pageSelect += '<option value="' + j + '" selected>' + label + '</option>';
                }
            }
        } else {
            for (i = 0; i < pageInfos.length; i++) {
                j = i + 1;
                if (i !== page) {
                    pageSelect += '<option value="' + j + '">' + j + '</option>';
                } else {
                    pageSelect += '<option value="' + j + '" selected>' + j + ' / ' + pageInfos.length + '</option>';
                }
            }
        }
        pageSelect += '</select>';
        $('#page').html(pageSelect);

        var pageStepLabel;
        var steps = isTimelineMode ? conf.timeline.steps : conf.manifest.steps;
        if ($.isArray(steps) && steps.length > 0 && !isFilteredContents) {
            var idx = $.inArray(pageStep, steps);
            $('#increase_step').toggleClass('disabled', idx === steps.length - 1);
            $('#decrease_step').toggleClass('disabled', idx === 0);
            if (isTimelineMode && cursorInfo.step) {
                pageStepLabel = getTimeExpression(pageStep * cursorInfo.step);
            } else {
                pageStepLabel = getPageStepExpression(pageStep);
            }
            if (!setupNavigations.pageStepLabelWidth) {
                var labelHtml = '';
                for (i = 0; i < steps.length; i++) {
                    var step = steps[i];
                    var pageStepLabel_;
                    if (isTimelineMode && cursorInfo.step) {
                        pageStepLabel_ = getTimeExpression(step * cursorInfo.step);
                    } else {
                        pageStepLabel_ = getPageStepExpression(step);
                    }
                    labelHtml += getPrevPageStepLabel(pageStepLabel_) + '<br>' + getNextPageStepLabel(pageStepLabel_) + '<br>';
                }
                var $anchor = $('<a>').html(labelHtml);
                var $list = $('<li>').append($anchor);
                $('#page_nav').append($list);
                var pageStepLabelWidth_ = $anchor.outerWidth();
                $list.remove();
                if (pageStepLabelWidth_ > 0) {
                    pageStepLabelWidth_ += 1;
                    $('#page_nav li a').eq(0).css({ width: pageStepLabelWidth_, 'text-align': 'center' });
                    $('#page_nav li a').eq(1).css({ width: pageStepLabelWidth_, 'text-align': 'center' });
                    setupNavigations.pageStepLabelWidth = pageStepLabelWidth_;
                }
            }
        }
        if (pageStepLabel === undefined) {
            if (pageStep !== 1) {
                pageStepLabel = String(pageStep);
            } else {
                pageStepLabel = '';
            }
        }
        var prevPageStepLabel = getPrevPageStepLabel(pageStepLabel);
        var nextPageStepLabel = getNextPageStepLabel(pageStepLabel);
        $('#page_nav li a span').eq(0).text(prevPageStepLabel);
        $('#page_nav li a span').eq(1).text(nextPageStepLabel);

        //サムネイル一覧
        if (isFilteredContents) {
            $('#show_thumbnails').text((lng !== 'ja') ? 'Selected Thumbnails' : 'ピックアップ サムネイル一覧');
        } else {
            $('#show_thumbnails').text((lng !== 'ja') ? 'Thumbnails' : 'サムネイル一覧');
        }

        //資料ナビ
        var bookSelect = ((lng !== 'ja') ? 'Books ' : '資料 ') + '<select class="nav_select" onChange="iiifViewer.gotoPage(this);">';
        for (i = 0; i < bookChangePages.length; i++) {
            j = i + 1;
            k = bookChangePages[i] + 1; //0-based to 1-based
            if (pageInfos[bookChangePages[i]].bookIndex !== pageInfos[page].bookIndex) {
                bookSelect += '<option value="' + k + '">' + j + '</option>';
            } else {
                if (bookChangePages[i] <= page && ((i < bookChangePages.length - 1 && page < bookChangePages[i + 1]) || i === bookChangePages.length - 1)) {
                    bookSelect += '<option value="' + k + '" selected>' + j + ' / ' + bookChangePages.length + '</option>';
                } else {
                    bookSelect += '<option value="' + k + '">' + j + '</option>';
                }
            }
        }
        bookSelect += '</select>';
        $('#books').html(bookSelect);

        //元資料の並び順で閲覧するリンク
        if ((isFilteredContents || bookChangePages.length > 1) && bookInfos[bookIndex].manifestUrl) {
            //ページ絞り込みあり、または複数資料を表示している場合
            //（後者のケースでは、個々の資料の総ページ数を表示する働きも兼ねる）
            var identifier = getIdentifierFromManifestUrl(bookInfos[bookIndex].manifestUrl);
            var params_ = [];
            if (identifier) {
                params_.push('pages=' + identifier);
                params_.push('pos=' + pageLocal); //1-based
            } else if (bookInfos[bookIndex].manifestUrl) {
                if (isTimelineMode) {
                    params_.push('timeline=' + bookInfos[bookIndex].manifestUrl);
                    if (getCanvasCursorIndex(page) !== null) {
                        params_.push('cursorIndex=' + getCanvasCursorIndex(page));
                    }
                } else {
                    params_.push('manifest=' + bookInfos[bookIndex].manifestUrl);
                    params_.push('pos=' + pageLocal); //1-based
                    if (getBrowsingCurationUrl()) {
                        var fragment = pageInfos[page].fragment;
                        if (fragment) {
                            var match = fragment.match(/xywh=(?:pixel:)?([0-9]+,[0-9]+,[0-9]+,[0-9]+)/); //「percent:」は未対応
                            if (match) {
                                params_.push('xywh=' + match[1]);
                            }
                        }
                    }
                }
            }
            params_.push('lang=' + lng);
            $('#page_orig_nav').show();
            $('#page_orig').attr({ href: '?' + params_.join('&'), title: (lng !== 'ja') ? 'View in original order' : '元資料の並び順で閲覧' });
        } else {
            $('#page_orig_nav').hide();
        }
        var pageOrigText = pageLocal + ' / ' + bookInfos[bookIndex].totalPagesNum;
        $('#page_orig').text(pageOrigText);

        //画像ダウンロードURL
        $('#image_download').attr({ href: getImageDownloadUrl(page), title: (lng !== 'ja') ? 'Download this image' : 'この画像をダウンロード' });

        //情報表示
        $('#info_nav').attr('title', (lng !== 'ja') ? 'More information' : 'この資料の情報を表示');
        var infoBody = '<div>';
        // Rights and Licensing Properties
        if (bookInfos[bookIndex].manifest.attribution) {
            var attribution = $('<span>').text(getPropertyValueI18n(bookInfos[bookIndex].manifest.attribution)).prop('outerHTML');
            infoBody += '<div class="info_elem">Attribution:<br>' + unescapeLimitedHtmlTag(attribution) + '</div>';
        }
        if (bookInfos[bookIndex].manifest.license) {
            var license = $('<span>').text(bookInfos[bookIndex].manifest.license).prop('outerHTML');
            infoBody += '<div class="info_elem">License:<br>' + license + '</div>';
        }
        if (bookInfos[bookIndex].manifest.logo) {
            var logoUrls = getUriRepresentations(bookInfos[bookIndex].manifest.logo);
            if ($.isArray(logoUrls) && logoUrls.length > 0) {
                infoBody += '<div class="info_elem">Logo:<br>';
                for (i = 0; i < logoUrls.length; i++) {
                    var logo = $('<img>').attr('src', logoUrls[i]).attr('alt', 'logo').addClass('info_logo').prop('outerHTML');
                    infoBody += logo;
                }
                infoBody += '</div>';
            }
        }
        // Manifest URL
        if (bookInfos[bookIndex].manifestUrl) {
            var manifestUrl = $('<span>').text(bookInfos[bookIndex].manifestUrl).prop('outerHTML');
            infoBody += '<div class="info_elem">IIIF Manifest URI:<br>' + manifestUrl + '</div>';
        }
        infoBody += '</div>';
        $('#info_list').html(infoBody);

        //ビューモード切替
        if (getBrowsingCurationUrl() && curation.viewingHint !== 'annotation') {
            var newUrl = getPageLink();
            if (newUrl.indexOf('?') > -1) {
                var search = newUrl.substring(newUrl.indexOf('?'));
                var params__ = getParams(search);
                if (params__) {
                    if (params__.mode === 'annotation') {
                        delete params__.mode;
                        $('#toggle_viewmode_icon').removeClass().addClass('glyphicon glyphicon-scissors');
                        $('#toggle_viewmode').attr('title', (lng !== 'ja') ? 'View in Curation Mode' : 'キュレーションビューモードで閲覧');
                    } else {
                        params__.mode = 'annotation';
                        $('#toggle_viewmode_icon').removeClass().addClass('glyphicon glyphicon-comment');
                        $('#toggle_viewmode').attr('title', (lng !== 'ja') ? 'View in Annotation Mode' : 'アノテーションビューモードで閲覧');
                    }
                    //アノテーションビューでのコマ番号と、キュレーションビューでのコマ番号は一致しない
                    delete params__.pos;
                }
                newUrl = L.Util.getParamString(params__);
            }
            $('#toggle_viewmode').attr('href', newUrl);
            $('#viewmode_nav').show();
        } else {
            $('#viewmode_nav').hide();
        }

        //キュレーションリスト登録の状態
        if (getFavState()) {
            $('#fav_star').removeClass('glyphicon-star-empty').addClass('glyphicon-star');
            $('#fav_star_link').attr('title', (lng !== 'ja') ? 'Remove this page from the list' : 'このコマをリストから削除');
        } else {
            $('#fav_star').removeClass('glyphicon-star').addClass('glyphicon-star-empty');
            $('#fav_star_link').attr('title', (lng !== 'ja') ? 'Add this page into the list' : 'このコマをリストに登録');
        }

        //表示言語切り替え
        if ($('.nav_lang_ja').length && $('.nav_lang_en').length) {
            if (lng !== 'ja') {
                var $ja = $('<a>').attr('href', getPageLink('ja')).text('日本語');
                $('.nav_lang_ja').html($ja);
                $('.nav_lang_en').text('English');
            } else {
                var $en = $('<a>').attr('href', getPageLink('en')).text('English');
                $('.nav_lang_ja').text('日本語');
                $('.nav_lang_en').html($en);
            }
        }
    }
    function getPrevPageStepLabel(pageSteplabel) {
        var prevPageStepLabel;
        if (isTimelineMode && !isFilteredContents) {
            prevPageStepLabel = (lng !== 'ja') ? '-' + pageSteplabel : '«' + pageSteplabel + '前';
        } else {
            prevPageStepLabel = (lng !== 'ja') ? '«' + pageSteplabel : '«' + pageSteplabel + '前';
        }
        return prevPageStepLabel;
    }
    function getNextPageStepLabel(pageSteplabel) {
        var nextPageStepLabel;
        if (isTimelineMode && !isFilteredContents) {
            nextPageStepLabel = (lng !== 'ja') ? '+' + pageSteplabel : pageSteplabel + '後»';
        } else {
            nextPageStepLabel = (lng !== 'ja') ? pageSteplabel + '»' : pageSteplabel + '次»';
        }
        return nextPageStepLabel;
    }
    function getTimeExpression(seconde) {
        var result;
        if (seconde < 60) {
            result = String(seconde) + ((lng !== 'ja') ? 's' : '秒');
        } else if (seconde < 3600) {
            result = String(seconde / 60) + ((lng !== 'ja') ? 'min' : '分');
        } else if (seconde < 86400) {
            result = String(seconde / 3600) + ((lng !== 'ja') ? 'h' : '時間');
        } else {
            result = String(seconde / 86400) + ((lng !== 'ja') ? 'd' : '日');
        }
        return result;
    }
    function getPageStepExpression(step) {
        if (step === 1) {
            return '';
        } else {
            return String(step) + ((lng !== 'ja') ? 'p' : 'コマ');
        }
    }

    function onNextPage() {
        var nextPage = page + pageStep;
        var outRange = 0;
        if (nextPage > pageInfos.length - 1) {
            outRange = nextPage - pageInfos.length;
            nextPage = 0;
        }
        if (isTimelineMode && !isFilteredContents && nextPage === 0) {
            var canvasId = getCanvasId(page);
            var cursorNextUrl;
            if (cursorInfo.next !== null) {
                cursorNextUrl = getCursorUrl(cursorInfo.endpointUrl, cursorInfo.next);
                if (cursorNextUrl) {
                    processCursorUrl(cursorNextUrl, { refCanvasId: canvasId, direction: 'next', outRange: outRange, resetInfos: true });
                }
            } else if (cursorInfo.status === 'updating') {
                //nextプロパティが未設定の場合、timeline.jsonが更新されて、より新しいCanvasが利用可能になっていないか確認する。
                var bookIndex = pageInfos[page].bookIndex;
                var timelineUrl = bookInfos[bookIndex].manifestUrl;
                cursorNextUrl = getCursorUrl(cursorInfo.endpointUrl, cursorInfo.index);
                if (timelineUrl && cursorNextUrl) {
                    $.getJSON(timelineUrl, function(timeline) {
                        if (isValidTimelineFalseTrue(timeline)) {
                            var cursor = timeline.cursors[0];
                            cursorInfo.first = getCursorIndexFromProp(cursor.first);
                            cursorInfo.last = getCursorIndexFromProp(cursor.last);
                            processCursorUrl(cursorNextUrl, { refCanvasId: canvasId, direction: 'next', outRange: outRange, resetInfos: true });
                        }
                    }).fail(function(jqxhr, textStatus, error) {
                        err = new Error(); showError(1, err.lineNumber, textStatus + ', ' + error); //jsonの取得に失敗
                    });
                }
            }
            return;
        }
        page = nextPage;
        refreshPage();
    }
    function onPrevPage() {
        var prevPage = page - pageStep;
        var outRange = -1;
        if (prevPage < 0) {
            outRange = prevPage;
            prevPage = pageInfos.length - 1;
            if (prevPage < 0) {
                prevPage = 0;
            }
        }
        if (isTimelineMode && !isFilteredContents && prevPage === pageInfos.length - 1) {
            if (cursorInfo.prev !== null) {
                var canvasId = getCanvasId(page);
                var cursorPrevUrl = getCursorUrl(cursorInfo.endpointUrl, cursorInfo.prev);
                if (cursorPrevUrl) {
                    processCursorUrl(cursorPrevUrl, { refCanvasId: canvasId, direction: 'prev', outRange: outRange, resetInfos: true });
                }
            }
            return;
        }
        page = prevPage;
        refreshPage();
    }

    function onNextBook() {
        var idx = $.inArray(page, bookChangePages);
        if (idx >= 0) {
            idx++;
            if (idx > bookChangePages.length - 1) {
                idx = 0;
            }
        } else {
            for (var i = 0; i < bookChangePages.length; i++) {
                if (bookChangePages[i] > page) {
                    idx = i;
                    break;
                }
            }
            if (idx < 0) {
                idx = 0;
            }
        }
        page = bookChangePages[idx];
        refreshPage();
    }
    function onPrevBook() {
        var idx = $.inArray(page, bookChangePages);
        if (idx >= 0) {
            idx--;
            if (idx < 0) {
                idx = bookChangePages.length - 1;
            }
        } else {
            for (var i = 0; i < bookChangePages.length; i++) {
                if (bookChangePages[i] > page) {
                    idx = i - 1;
                    break;
                }
            }
            if (idx < 0) {
                idx = bookChangePages.length - 1;
            }
        }
        if (idx < 0) {
            idx = 0;
        }
        page = bookChangePages[idx];
        refreshPage();
    }

    function gotoPage(obj) { //obj: number (1-based) or HTMLSelectElement
        hideThumbnails();
        if (String(obj).match(/^[0-9]+$/)) {
            var num = parseInt(obj, 10) - 1; //1-based to 0-based
            if (num < 0) {
                num = 0;
            } else if (num > pageInfos.length - 1) {
                num = 0;
            }
            page = num;
            refreshPage();
        } else if (Object.prototype.toString.call(obj) === '[object HTMLSelectElement]') {
            gotoPage($(obj).val());
        }
    }

    function gotoLatest() {
        if (isTimelineMode && !isFilteredContents && cursorInfo.status === 'updating') {
            //Timelineを再取得し、そのlastへ移動する
            var bookIndex = pageInfos[page].bookIndex;
            var timelineUrl = bookInfos[bookIndex].manifestUrl;
            if (timelineUrl) {
                $.getJSON(timelineUrl, function(timeline) {
                    if (isValidTimelineFalseTrue(timeline)) {
                        var cursor = timeline.cursors[0];
                        cursorInfo.first = getCursorIndexFromProp(cursor.first);
                        cursorInfo.last = getCursorIndexFromProp(cursor.last);
                        var cursorUrl = getCursorUrl(cursorInfo.endpointUrl, cursorInfo.last);
                        if (cursorUrl) {
                            cursorInfo.index = cursorInfo.last;
                            processCursorUrl(cursorUrl, { outRange: -1, resetInfos: true }); //posは最後のコマへ
                        } else {
                            err = new Error(); showError(0, err.lineNumber); //プロパティ記載異常
                        }
                    }
                }).fail(function(jqxhr, textStatus, error) {
                    err = new Error(); showError(0, err.lineNumber, textStatus + ', ' + error); //jsonの取得に失敗
                });
            }
        }
    }

    function decreaseStep() {
        var steps = isTimelineMode ? conf.timeline.steps : conf.manifest.steps;
        if (!$.isArray(steps) || steps.length === 0) { return; }
        var idx = $.inArray(pageStep, steps);
        if (idx > 0) {
            pageStep = steps[idx - 1];
            setupNavigations();
        }
    }
    function increaseStep() {
        var steps = isTimelineMode ? conf.timeline.steps : conf.manifest.steps;
        if (!$.isArray(steps) || steps.length === 0) { return; }
        var idx = $.inArray(pageStep, steps);
        if (idx > -1 && idx < steps.length - 1) {
            pageStep = steps[idx + 1];
            setupNavigations();
        }
    }

    function updateHistory() {
        if (history.replaceState && history.state !== undefined) {
            var newUrl = getPageLink();
            history.replaceState(null, document.title, newUrl);
        }
    }
    function getPageLink(lang) {
        var localLang = lang || lng;
        var newUrl = location.protocol + '//' + location.host + location.pathname;
        var params_ = [];
        //表示対象指定
        if ('pages' in params) {
            params_.push('pages=' + params.pages);
        } else if ('curation' in params) {
            params_.push('curation=' + params.curation);
            if (params.mode) {
                params_.push('mode=' + params.mode);
            }
        } else if ('manifest' in params) {
            params_.push('manifest=' + params.manifest);
        } else if ('timeline' in params) {
            params_.push('timeline=' + params.timeline);
            if (cursorInfo.index !== null) {
                params_.push('cursorIndex=' + cursorInfo.index);
            }
        }
        //表示ページ指定
        if (page > 0) {
            params_.push('pos=' + String(page + 1));  //0-based to 1-based
        }
        //表示言語指定
        params_.push('lang=' + localLang);
        //キュレーションラベル指定
        if ('label' in params && !('curation' in params)) {
            params_.push('label=' + encodeURIComponent(params.label));
        }
        if (params_.length > 0) {
            newUrl += '?' + params_.join('&');
        }
        return newUrl;
    }

    //エラー表示
    function showError(errtype, lineNumber, message) {
        $('#page_navigation').hide();
        if (errtype === 1) {
            $('#book_title').html('<div class="alert alert-warning">' + ((lng !== 'ja') ? 'Unable to download data' : 'データ取得に失敗しました') + '</div>');
        }
        if (errtype && window.console) {
            var msg = APP_NAME + ' Error';
            var details = [];
            if (lineNumber) {  //行番号を取得できるのはFirefoxのみ
                details.push('line: ' + lineNumber);
            }
            if (message) {
                details.push(message);
            }
            if (details.length > 0) {
                msg += ' (' + details.join(', ') + ')';
            }
            console.log(msg); // eslint-disable-line no-console
        }
    }

    //----------------------------------------------------------------------
    //modal表示関係
    var extraSubWindows = {};
    function resetSubWindows(optCallback) {
        //modal表示を解除した後で実行する処理を optCallback で指定する
        var needNotWait = false;
        if (isFullscreen()) {
            exitFullscreen();
            needNotWait = true;
        } else {
            $.each(extraSubWindows, function(key, callback) {
                if ($.isFunction(callback)) {
                    callback();
                }
            });
            var $dropdowns = $('.dropdown-menu:visible');
            if ($dropdowns.length) {
                $dropdowns.each(function() {
                    $(this).dropdown('toggle');
                });
            }
            var $modals = $('.modal:visible');
            if ($modals.length) {
                $modals.each(function() {
                    $(this).modal('hide');
                    $(this).one('hidden.bs.modal', function() {
                        var $modalVisible = $('.modal:visible');
                        if (optCallback && $.isFunction(optCallback) && $modalVisible.length === 0) {
                            optCallback();
                        }
                    });
                });
            } else {
                needNotWait = true;
            }
        }
        if (optCallback && $.isFunction(optCallback) && needNotWait) {
            optCallback();
        }
    }
    function registerSubWindow(callback) {
        if (callback && $.isFunction(callback)) {
            var key = new Date().getTime().toString(16) + Math.floor(Math.random() * 0x1000).toString(16);
            extraSubWindows[key] = callback;
            return key;
        }
        return;
    }
    function unregisterSubWindow(key) {
        if (key) {
            delete extraSubWindows[key];
        }
    }
    //フルスクリーン表示
    function viewFullscreen() {
        if (!isFullscreen()) {
            toggleFullscreen();
        }
    }
    function exitFullscreen() {
        if (isFullscreen()) {
            toggleFullscreen();
        }
    }
    function toggleFullscreen() {
        if (map !== undefined) {
            if (!isFullscreen()) {
                resetSubWindows(); //高速に切り替えたいのでcallbackは使わない
            }
            map.toggleFullscreen({ pseudoFullscreen: true });
        }
    }
    function isFullscreen() {
        return map !== undefined && map.isFullscreen();
    }
    //サムネイル一覧表示
    function showThumbnails() {
        if (isThumbnailsHidden()) {
            toggleThumbnails();
        }
    }
    function hideThumbnails() {
        if (!isThumbnailsHidden()) {
            toggleThumbnails();
        }
    }
    function toggleThumbnails() {
        if (isThumbnailsHidden()) {
            resetSubWindows(function() { $('#thumbnails_win').modal('toggle'); });
        } else {
            resetSubWindows();
        }
    }
    function isThumbnailsHidden() {
        return $('#thumbnails_win').is(':hidden');
    }
    //情報表示
    function showInfo() {
        if (isInfoHidden()) {
            toggleInfo();
        }
    }
    function hideInfo() {
        if (!isInfoHidden()) {
            toggleInfo();
        }
    }
    function toggleInfo() {
        if (isInfoHidden()) {
            resetSubWindows(function() { $('#info_dropdown').dropdown('toggle'); });
        } else {
            resetSubWindows();
        }
    }
    function isInfoHidden() {
        return $('#info_list').is(':hidden');
    }
    //ヘルプ表示
    function showHelp() {
        if (isHelpHidden()) {
            toggleHelp();
        }
    }
    function hideHelp() {
        if (!isHelpHidden()) {
            toggleHelp();
        }
    }
    function toggleHelp() {
        if (isHelpHidden()) {
            resetSubWindows(function() { $('#help_win').modal('toggle'); });
        } else {
            resetSubWindows();
        }
    }
    function isHelpHidden() {
        return $('#help_win').is(':hidden');
    }
    function getHelp() {
        var html;
        if (lng !== 'ja') {
            html = '<table class="table">' +
                   '<thead><tr><th>Keyboard</th><th>Function</th></tr></thead>' +
                   '<tbody>' +
                   '<tr><td>Right arrow, Space, Comma</td><td>Go to next frame/pager</td></tr>' +
                   '<tr><td>Left arrow, Back space, Period</td><td>Go to previous frame/pager</td></tr>' +
                   '<tr><td>f</td><td>Toggle fullscreen</td></tr>' +
                   '<tr><td>t</td><td>Show/hide thumbnails</td></tr>';
            if (enableCurationEdit) {
                html +=
                   '<tr><td>c</td><td>Show/hide your curating list</td></tr>' +
                   '<tr><td>l (small letter L)</td><td>Add to or remove from your curating list</td></tr>';
            }
            html +='<tr><td>+ (Numpad)</td><td>Zoom in</td></tr>' +
                   '<tr><td>- (Numpad)</td><td>Zoom out</td></tr>' +
                   '</tbody>' +
                   '</table>';
        } else {
            html = '<table class="table">' +
                   '<thead><tr><th>キーボード操作</th><th>動作</th></tr></thead>' +
                   '<tbody>' +
                   '<tr><td>右矢印、Space、コンマ</td><td>閲覧対象（ピックアップ）内で次のコマへ移動<br>サムネイル一覧を表示中は、サムネイル一覧の次ページ移動</td></tr>' +
                   '<tr><td>左矢印、Back space、ピリオド</td><td>閲覧対象（ピックアップ）内で前のコマへ移動<br>サムネイル一覧を表示中は、サムネイル一覧の前ページ移動</td></tr>' +
                   '<tr><td>f</td><td>フルページ表示切り替え<br>フルページ表示時は、画面の左右端クリックで前後のコマへ移動</td></tr>' +
                   '<tr><td>t</td><td>サムネイル一覧表示／非表示切り替え</td></tr>';
            if (enableCurationEdit) {
                html +=
                   '<tr><td>c</td><td>キュレーションリスト表示／非表示切り替え</td></tr>' +
                   '<tr><td>l（小文字エル）</td><td>キュレーションリスト登録／解除切り替え</td></tr>';
            }
            html +='<tr><td>+ (Numpad)</td><td>ズームイン</td></tr>' +
                   '<tr><td>- (Numpad)</td><td>ズームアウト</td></tr>' +
                   '</tbody>' +
                   '</table>';
        }
        return html;
    }
    //キュレーションリスト表示
    function showCurationList() {
        if (isCurationListHidden()) {
            toggleCurationList();
        }
    }
    function hideCurationList() {
        if (!isCurationListHidden()) {
            toggleCurationList();
        }
    }
    function toggleCurationList() {
        if (isCurationListHidden()) {
            resetSubWindows(function() { showCurationListCore(); });
        } else {
            resetSubWindows();
        }
    }
    function isCurationListHidden() {
        return $('#curation_list_win').is(':hidden');
    }

    //----------------------------------------------------------------------
    //キュレーションリスト登録関係
    //・curationパラメータで外部キュレーションが指定され、その内容を表示するとき、
    //  sessionStorageへ外部キュレーション内容を格納する。
    //・sessionStorageにキュレーション内容が格納されていれば sessionStorageの内容を、
    //  格納されていなければ localStorageの内容を、キュレーションリスト画面の編集対象とする。
    function getFavs() {
        var favs;
        //sessionStorageにキュレーションデータがあれば、そちらを優先し、
        //なければ localStorageのキュレーションデータを返す。
        if (storageSession) {
            try {
                favs = JSON.parse(storageSession.getItem('favs'));
            } catch (e) {
                try {
                    favs = JSON.parse(LZString.decompressFromUTF16(storageSession.getItem('favs')));
                } catch (e) {
                    //console.log(e);
                }
            }
        }
        if (!favs) {
            if (storage) {
                favs = JSON.parse(storage.getItem('favs'));
            }
        }
        return favs || [];
    }
    function setFavs(favs, optForceUseSessionStorage) { //optForceSessionStorage: 省略可能
        if (storageSession) {
            var hasCurationData;
            if (storageSession.getItem('favsCompressed') === 'true') {
                try {
                    hasCurationData = JSON.parse(LZString.decompressFromUTF16(storageSession.getItem('favs')));
                } catch (e) {
                    //console.log(e);
                }
            } else {
                try {
                    hasCurationData = JSON.parse(storageSession.getItem('favs'));
                } catch (e) {
                    //console.log(e);
                }
            }
            if (optForceUseSessionStorage || hasCurationData) {
                //明示的に sessionStorage利用を指定された場合、または sessionStorageに
                //キュレーションデータがある場合
                if (optForceUseSessionStorage) {
                    try {
                        storageSession.setItem('curationUrl', getBrowsingCurationUrl());
                    } catch (e) {
                        enableCurationEdit = false;
                        err = new Error(); showError(2, err.lineNumber, e);
                    }
                }
                try {
                    storageSession.setItem('favs', JSON.stringify(favs));
                    storageSession.setItem('favsCompressed', 'false');
                } catch (e) {
                    try {
                        storageSession.setItem('favs', LZString.compressToUTF16(JSON.stringify(favs)));
                        storageSession.setItem('favsCompressed', 'true');
                    } catch (e) {
                        enableCurationEdit = false;
                        err = new Error(); showError(2, err.lineNumber, e);
                    }
                }
                return;
            }
        }
        if (storage) {
            try {
                storage.setItem('favs', JSON.stringify(favs));
            } catch (e) {
                err = new Error(); showError(2, err.lineNumber, e);
            }
        }
    }
    function removeFavs() {
        if (storageSession) {
            if (storageSession.getItem('favsCompressed') === 'true') {
                try {
                    if (JSON.parse(LZString.decompressFromUTF16(storageSession.getItem('favs')))) {
                        storageSession.removeItem('favs');
                        storageSession.removeItem('favsCompressed');
                        return;
                    }
                } catch (e) {
                    //console.log(e);
                }
            } else {
                try {
                    if (JSON.parse(storageSession.getItem('favs'))) {
                        storageSession.removeItem('favs');
                        storageSession.removeItem('favsCompressed');
                        return;
                    }
                } catch (e) {
                    //console.log(e);
                }
            }
        }
        if (storage) {
            storage.removeItem('favs');
        }
    }
    function getFavState() {
        return getFavIndex() > -1;
    }
    function getFavIndex() {
        if (storage) {
            var fav = makeFav(page);
            var favData = getFavs();
            for (var i = 0; i < favData.length; i++) {
                if (favData[i] && fav &&
                    favData[i].manifestUrl === fav.manifestUrl &&
                    favData[i].canvasId === fav.canvasId &&
                    favData[i].fragment === fav.fragment) {
                    if (favData[i].indexInBrowsingCuration) {
                        if (favData[i].indexInBrowsingCuration === String(page + 1)) {
                            return i;
                        }
                    } else {
                        return i;
                    }
                }
            }
        }
        return -1;
    }
    function toggleFav() {
        if (storage) {
            var favData = getFavs();
            var idx = getFavIndex();
            if (idx > -1) {
                //削除
                favData.splice(idx, 1);
            } else {
                //追加
                var options;
                if (getBrowsingCurationUrl()) {
                    var metadata = getCanvasMetadataFromCuration(getBrowsingCurationJson());
                    if (metadata.length === pageInfos.length) {
                        var metadatum = metadata[page];
                        options = {
                            indexInBrowsingCuration: String(page + 1), //1-based
                            metadata: metadatum.metadata,
                            description: metadatum.description,
                            durationHint: metadatum.durationHint,
                        };
                    }
                }
                var fav = makeFav(page, options);
                favData.push(fav);
            }
            setFavs(favData);
            setupNavigations();
        }
    }
    function makeFav(page_, options) {
        var bookIndex = pageInfos[page_].bookIndex;
        var pageLocal = pageInfos[page_].pageLocal;
        var fragment  = pageInfos[page_].cropFragment || pageInfos[page_].fragment;
        var manifestUrl   = bookInfos[bookIndex].manifestUrl;
        var manifestLabel = bookInfos[bookIndex].manifest.label;
        var canvasInfoUrl = getCanvasImageInfoUrl(page_);
        var canvasId      = getCanvasId(page_);
        var canvasIndex   = getCanvasCursorIndex(page_);
        var canvasLabel   = getCanvasLabel(page_);
        var canvasThumbnail = getThumbnailUrl(page_, getRegeionFromFragment(fragment), 100, 90);
        var fav = {
            manifestUrl   : manifestUrl,
            manifestLabel : manifestLabel,
            canvas        : canvasInfoUrl, //info.jsonのURL
            canvasId      : canvasId,
            canvasIndex   : canvasIndex, //cursorIndex
            canvasLabel   : canvasLabel,
            canvasThumbnail : canvasThumbnail, //サムネイルのURL
            pageLocal     : pageLocal,
            fragment      : fragment
        };
        if (options) {
            if (options.indexInBrowsingCuration) { //1-based
                fav.indexInBrowsingCuration = options.indexInBrowsingCuration;
            }
            if (options.metadata) {
                fav.metadata = options.metadata;
            }
            if (options.description) {
                fav.description = options.description;
            }
            if (options.durationHint) {
                fav.durationHint = options.durationHint;
            }
        }
        return fav;
    }
    function getEditingCurationUrl() {
        var curationUrl;
        if (storageSession) {
            curationUrl = storageSession.getItem('curationUrl');
        }
        return curationUrl || '';
    }
    //キュレーションリスト画面関係
    function showCurationListCore() {
        if (storage) {
            var favData = getFavs();
            var contents = '';
            var MAX_FAVS_IN_CURATION_LIST_WINDOW = 1000; //安全装置。あまり多いとブラウザが固まったようになってしまう。
            for (var i = 0; i < favData.length && i < MAX_FAVS_IN_CURATION_LIST_WINDOW; i++) {
                if (favData[i]) {
                    var fav = favData[i];
                    var region = getRegeionFromFragment(fav.fragment);
                    var miniThumbnailUrl = fav.canvasThumbnail || fav.canvas.replace('/info.json', '/' + region + '/!100,90/0/default.jpg');
                    miniThumbnailUrl = miniThumbnailUrl.replace(/[(), '"]/g, '\\$&'); //https://www.w3.org/TR/CSS1/#url
                    var $removeButton = $('<button>').attr('type', 'button').addClass('close curation_list_li_close').html('&#0215');
                    var label = getPropertyValueI18n(fav.manifestLabel) + '/' + fav.pageLocal;
                    var $label = $('<div>').addClass('curation_list_li_content_label').text(label);
                    var $div = $('<div>').addClass('curation_list_li_content');
                    var $image = null;
                    if (!fav.canvas) {
                        //IIIF Image API非対応リソース
                        $image = getPsuedoIIIFThumbnailInCurationList($('<img>').attr({ src: miniThumbnailUrl, alt: label, title: label }), fav.fragment);
                    }
                    if ($image) {
                        $div = $div.append($image);
                    } else {
                        $div = $div.css('background-image', 'url("' + miniThumbnailUrl + '")').attr('title', label);
                    }
                    var $li = $('<li>').addClass('ui-state-default curation_list_li').attr({ 'data-manifestUrl': fav.manifestUrl, 'data-canvasId': fav.canvasId });
                    if (fav.fragment) {
                        $li.attr('data-fragment', fav.fragment);
                    }
                    if (fav.indexInBrowsingCuration) {
                        $li.attr('data-indexInBrowsingCuration', fav.indexInBrowsingCuration);
                    }
                    contents += $li.append($div.append($removeButton).append($label)).prop('outerHTML');
                }
            }
            $('#curation_list_ul').html(contents);
            $('#curation_list_ul').sortable();
            $('.curation_list_li_close').on('click', function() {
                var $li = $(this).closest('li');
                if ($li.length > 0) {
                    $li.fadeOut('fast', function() {
                        $(this).remove();
                        updateCurationListData();
                        updateCurationListUrl();
                        updateCurationListButtons();
                        setupNavigations();
                    });
                }
            });
            updateCurationListUrl();
            updateCurationListButtons();
            $('#curation_list_win').modal('show');
        }
    }
    function setupCurationListEvents() {
        $('#curation_list_ul').on('sortupdate', function(/*event, ui*/) {
            updateCurationListData();
            updateCurationListUrl();
        });
        $('#curation_list_clear').on('click', function() {
            if (storage) {
                removeFavs();
            }
            $('#curation_list_win').modal('hide');
            setupNavigations();
        });
        $('#curation_list_json').on('click', function() {
            if (storage) {
                var curation = getCurationListJson();
                var blob = new Blob([JSON.stringify(curation, null, '\t')], { type: 'text/plain' });
                var filename = 'curation.json';
                if (window.navigator.msSaveBlob) {
                    window.navigator.msSaveBlob(blob, filename);
                } else if (window.URL.createObjectURL || window.webkitURL.createObjectURL) {
                    var url;
                    if (window.URL.createObjectURL) {
                        url = window.URL.createObjectURL(blob);
                    } else {
                        url = window.webkitURL.createObjectURL(blob);
                    }
                    var anchorElem = document.createElement('a');
                    anchorElem.href = url;
                    anchorElem.download = filename;
                    //anchorElem.tatget = '_blank';
                    document.body.appendChild(anchorElem);
                    anchorElem.click();
                    document.body.removeChild(anchorElem);
                }
            }
        });
        $('#curation_list_export').on('click', function() {
            if (storage && getCurationJsonExport()) {
                var curationJson = getCurationListJson();
                exportCurationJson(curationJson, { method: 'POST' });
            }
        });
    }
    function updateCurationListButtons() {
        if (storage) {
            var favData = getFavs();
            if (favData.length > 0) {
                $('#curation_list_clear').show();
                $('#curation_list_json').show();
                if (getCurationJsonExport()) {
                    $('#curation_list_export').show();
                } else {
                    $('#curation_list_export').hide();
                }
            } else {
                $('#curation_list_clear').hide();
                $('#curation_list_json').hide();
                $('#curation_list_export').hide();
            }
        }
    }
    function updateCurationListData() {
        if (storage) {
            var favData = getFavs();
            var newFavData = [];
            $('#curation_list_ul li').map(function() {
                var $this = $(this);
                var manifestUrl = $this.attr('data-manifestUrl');
                var canvasId = $this.attr('data-canvasId');
                var fragment = $this.attr('data-fragment');
                var indexInBrowsingCuration = $this.attr('data-indexInBrowsingCuration');
                for (var i = 0; i < favData.length; i++) {
                    if (favData[i] &&
                        favData[i].manifestUrl === manifestUrl &&
                        favData[i].canvasId === canvasId &&
                        favData[i].fragment === fragment &&
                        favData[i].indexInBrowsingCuration === indexInBrowsingCuration) {
                        newFavData.push(favData[i]);
                        break;
                    }
                }
            });
            setFavs(newFavData);
        }
    }
    function updateCurationListUrl() {
        var newUrl = getCurationListUrl();
        var $newUrlElem;
        if (newUrl) {
            $newUrlElem = $('<a>').attr({ href: newUrl, target: '_blank' }).text(newUrl);
        } else {
            $newUrlElem = $('<div>').html((lng !== 'ja') ? 'No page was added into the list' : '☆ボタンで表示中のコマをリスト登録すると、サムネイルが表示されます。<br>サムネイルはドラッグ＆ドロップで並び替えができます。');
        }
        $('#curation_list_url').html($newUrlElem);
    }
    function getCurationListUrl() {
        var pages = '';
        var isInvalidUrl = false;
        if (storage) {
            var favData = getFavs();
            var bookId;
            var bookIdPrev;
            var pageLocal;
            var pageLocalPrev;
            for (var i = 0; i < favData.length; i++) {
                if (favData[i]) {
                    var fav = favData[i];
                    bookId = getIdentifierFromManifestUrl(fav.manifestUrl);
                    if (bookId === '' || fav.fragment) {
                        isInvalidUrl = true;
                        break;
                    }
                    pageLocal = fav.pageLocal;
                    if (bookId !== bookIdPrev) {
                        if (pages.length > 0) {
                            pages += ':';
                        }
                        pages += bookId + '/' + pageLocal;
                        bookIdPrev = bookId;
                    } else {
                        if (parseInt(pageLocal, 10) === parseInt(pageLocalPrev, 10) + 1) {
                            var reg = new RegExp('([/,-])' + pageLocalPrev + '$');
                            var match = pages.match(reg);
                            if (match) {
                                if (match[1] === '-') {
                                    pages = pages.replace(new RegExp('-' + pageLocalPrev + '$'), '-' + pageLocal);
                                } else {
                                    pages += '-' + pageLocal;
                                }
                            }
                        } else {
                            pages += ',' + pageLocal;
                        }
                    }
                    pageLocalPrev = pageLocal;
                }
            }
        }
        if (isInvalidUrl) {
            return ' '; //URLでは表現できない
        }
        if (pages) {
            var newUrl = location.protocol + '//' + location.host + location.pathname;
            var params_ = [];
            //表示対象指定
            params_.push('pages=' + pages);
            //表示言語指定
            params_.push('lang=' + lng);
            if (params_.length > 0) {
                newUrl += '?' + params_.join('&');
            }
            return newUrl;
        } else {
            return '';
        }
    }
    function getCurationListSelections(favData) {
        var selections = [];
        var manifestUrl = '';
        var manifestUrlPrev = '';
        var scRange;
        for (var i = 0; i < favData.length; i++) {
            if (favData[i]) {
                var fav = favData[i];
                manifestUrl = fav.manifestUrl;
                var assumedBaseUrl = manifestUrl.replace(/\/manifest(\.json)?$/i, ''); //よくあるパターンのみ対応
                var manifestLabel = fav.manifestLabel;
                var canvasId = fav.canvasId;
                if (fav.fragment) {
                    canvasId += '#' + fav.fragment;
                }
                var canvasIndex = getCursorIndexFromProp(fav.canvasIndex);
                var canvas = {
                    '@id': canvasId,
                    '@type': (canvasIndex !== null) ? 'cs:Canvas' : 'sc:Canvas', //codh:Canvas
                    'label': fav.canvasLabel
                };
                if (canvasIndex !== null) { //timeline
                    canvas.cursorIndex = canvasIndex;
                }
                if (fav.metadata !== undefined) {
                    canvas.metadata = fav.metadata;
                }
                if (fav.description !== undefined) {
                    canvas.description = fav.description;
                } else {
                    canvas.description = ''; //未設定の場合、後日、JSONエディタで修正しやすいように''で項目を生成しておく
                }
                if (fav.durationHint !== undefined) {
                    canvas.durationHint = fav.durationHint;
                }
                if (manifestUrl !== manifestUrlPrev) {
                    scRange = {
                        '@id': assumedBaseUrl + '/range/r' + String(i + 1),
                        '@type': 'sc:Range',
                        'label': 'Manual curation by ' + APP_NAME,
                        'members': [canvas],
                        'within': {
                            '@id': manifestUrl,
                            '@type': (canvasIndex !== null) ? 'tl:Manifest' : 'sc:Manifest', //codh:Manifest
                            'label': manifestLabel
                        }
                    };
                    selections.push(scRange);
                    manifestUrlPrev = manifestUrl;
                } else {
                    if (selections.length > 0) {
                        scRange = selections[selections.length - 1];
                        if (scRange && $.isArray(scRange.members)) {
                            scRange.members.push(canvas);
                        }
                    }
                }
            }
        }
        return selections;
    }
    function getCurationJsonFromFavs(favData) {
        var id = 'http://example.org/iiif/curation/curation.json';
        var label = 'Curating list';
        var selections = getCurationListSelections(favData);
        var codhCuration = {
            '@context': [
                'http://iiif.io/api/presentation/2/context.json',
                CONTEXT_CURATION
            ],
            '@type': 'cr:Curation', //codh:Curation
            '@id': id,
            label: label,
            selections: selections
        };
        return codhCuration;
    }
    function getCurationListJson() {
        var curationJson;
        if (storageSession) {
            //storageSessionに'curationJson'がない場合 curationJsonは nullになる
            curationJson = JSON.parse(storageSession.getItem('curationJson'));
        }
        if (isValidCurationFalseTrue(curationJson)) {
            //外部キュレーションを編集中の場合、新規エクスポート、上書きエクスポート、JSONファイル保存の
            //いずれのケースでも、外部キュレーションのselections部分のみを差し替えた内容にする。
            //（外部キュレーションに設定されていた label等は引き継がれる。）
            curationJson.selections = getCurationListSelections(getFavs());
        } else {
            //外部キュレーションを編集中ではない場合、デフォルトの設定内容をもったCuration JSONを生成
            curationJson = getCurationJsonFromFavs(getFavs());
        }
        return curationJson;
    }
    function exportCurationJson(curationJson, options) {
        var jsonExport = getCurationJsonExport(); //function or url
        if (jsonExport) {
            if ($.isFunction(jsonExport)) {
                jsonExport(curationJson, options);
            } else {
                var curationString = JSON.stringify(curationJson, null, '\t');
                $('<form>').attr({ action: jsonExport, method: 'post', target: '_blank' })
                    .append($('<input>').attr({ type: 'hidden', name: 'curation', value: encodeURIComponent(curationString) }))
                    .append($('<input>').attr({ type: 'hidden', name: 'lang', value: lng }))
                    .appendTo(document.body)
                    .submit()
                    .remove();
            }
        }
    }

    //curationでCanvasに付与されている付加情報（metadata, description, durationHint）の配列を返す
    function getCanvasMetadataFromCuration(curation) {
        var metadataList = [];
        var i, j;
        if ($.isPlainObject(curation)) {
            for (i = 0; i < curation.selections.length; i++) {
                var range = curation.selections[i];
                // http://iiif.io/api/presentation/2.1/#range
                if ($.isPlainObject(range) && range['@type'] === 'sc:Range') {
                    if (range.within) { //withinプロパティ
                        var manifestUrl = '';
                        var timelineUrl = '';
                        var within = range.within;
                        if ($.type(within) === 'string') {
                            manifestUrl = within;
                        } else if ($.isPlainObject(within) && within['@id'] && within['@type'] && $.type(within['@id']) === 'string') {
                            if (within['@type'] === 'sc:Manifest') {
                                manifestUrl = within['@id'];
                            } else if (within['@type'] === 'tl:Manifest' || within['@type'] === 'codh:Manifest') {
                                timelineUrl = within['@id'];
                            }
                        }
                        if (manifestUrl) {
                            if ($.isArray(range.canvases)) { //Rangeのcanvasesプロパティによる表示対象指定
                                for (j = 0; j < range.canvases.length; j++) {
                                    metadataList.push({}); //各要素は undefined
                                }
                            } else if ($.isArray(range.members)) { //membersプロパティによる表示対象指定
                                //membersプロパティ内では、sc:Canvasのみ対応。membersプロパティ内のsc:Rangeは未対応。
                                for (j = 0; j < range.members.length; j++) {
                                    var member = range.members[j];
                                    if ($.isPlainObject(member)) {
                                        metadataList.push({
                                            metadata: member.metadata,
                                            description: member.description,
                                            durationHint: member.durationHint
                                        });
                                    }
                                }
                            }
                        } else if (timelineUrl) {
                            if ($.isArray(range.members)) { //membersプロパティによる表示対象指定のみ有効
                                //membersプロパティ内では、sc:Canvasのみ対応。membersプロパティ内のsc:Rangeは未対応。
                                for (j = 0; j < range.members.length; j++) {
                                    var member_ = range.members[j];
                                    if ($.isPlainObject(member_)) {
                                        metadataList.push({
                                            metadata: member_.metadata,
                                            description: member_.description,
                                            durationHint: member_.durationHint
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return metadataList;
    }
    //外部キュレーションを表示しているとき、外部キュレーションに基づくfav配列を返す
    function getBrowsingCurationFavs() {
        var favData = [];
        if (getBrowsingCurationUrl()) {
            var metadata = getCanvasMetadataFromCuration(getBrowsingCurationJson());
            for (var i = 0; i < pageInfos.length; i++) {
                var options;
                if (metadata.length === pageInfos.length) {
                    var metadatum = metadata[i];
                    options = {
                        indexInBrowsingCuration: String(i + 1), //1-based
                        metadata: metadatum.metadata,
                        description: metadatum.description,
                        durationHint: metadatum.durationHint
                    };
                }
                favData.push(makeFav(i, options));
            }
        }
        return favData;
    }

    //----------------------------------------------------------------------
    //IIIF Presentation API関係
    function escapeRegExp(string) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions$revision/331165
        // Created: Nov 26, 2012, 2:45:01 AM
        // Creator: rodneyrehm
        // https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses
        // Code samples added on or after August 20, 2010 are in the public domain.
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }
    function unescapeLimitedHtmlTag(htmlEscapedString) {
        // http://iiif.io/api/presentation/2.1/#html-markup-in-property-values
        // In order to avoid HTML or script injection attacks, clients must remove:
        //  - All attributes other than href on the a tag, src and alt on the img tag.
        // Clients should allow only a, b, br, i, img, p, and span tags.
        // Clients may choose to remove any and all tags
        // ここでは、aタグとbタグ、brタグ、iタグ、pタグ、spanタグのみ許可する
        function allowHtmlTag(string, tag) {
            var reg1 = new RegExp('&lt;' + tag + '(?:\\s.*?)?&gt;', 'gi');
            var reg2 = new RegExp('&lt;/' + tag + '\\s*&gt;', 'gi');
            return string.replace(reg1, '<' + tag + '>').replace(reg2, '</' + tag + '>');
        }
        function allowHtmlTagVoidElement(string, tag) {
            var reg = new RegExp('&lt;' + tag + '(?:\\s.*?)?/?&gt;', 'gi');
            return string.replace(reg, '<' + tag + '>');
        }
        var reg = new RegExp(/(&lt;a\s.+?&gt;)(.+?)(&lt;\/a\s*&gt;)/gi); //aタグ
        var result = htmlEscapedString.replace(reg,
            function(match, p1, p2, p3 /*, offset, string*/) {
                var result = match;
                if (p1 && p2 && p3) {
                    var hrefUrl = $('<span>').append(p1.replace(/^&lt;/i, '<').replace(/&gt;$/i, '>') + p2 + '</a>').children('a').attr('href');
                    if (hrefUrl) {
                        var anchor = document.createElement('a');
                        anchor.href = hrefUrl;
                        var href = anchor.href;
                        if (/^https?:\/\//.test(href)) {
                            result = $('<a>').attr('href', hrefUrl).html(p2).prop('outerHTML');
                        }
                    }
                }
                return result;
            }
        );
        result = allowHtmlTag(result, 'b');
        result = allowHtmlTag(result, 'i');
        result = allowHtmlTag(result, 'p');
        result = allowHtmlTag(result, 'span');
        result = allowHtmlTagVoidElement(result, 'br');
        return result;
    }
    function getHtmlLinkUrl(prop) {
        // format属性値が'text/html'であるものについて、@id属性値を返す
        var result = '';
        if ($.isPlainObject(prop)) {
            if (prop['@id'] && prop.format === 'text/html') {
                return prop['@id'];
            }
        } else if ($.isArray(prop)) {
            for (var i = 0; i < prop.length; i++) {
                result = getHtmlLinkUrl(prop[i]);
                if (result) {
                    return result;
                }
            }
        }
        return result;
    }
    function getKeyValuesShallow(obj, key, option) {
        // plain string または key属性値 の配列を返す（浅い探索のみ）
        var opt = option || {};
        var result;
        if ($.isArray(obj)) {
            return $.map(obj, function(element) {
                if ($.isPlainObject(element)) {
                    return element[key];
                } else if ($.type(element) === 'string') {
                    return element;
                } else if (opt.allowNumber === true && $.type(element) === 'number') {
                    return String(element);
                } else if (opt.allowBoolean === true && $.type(element) === 'boolean') {
                    return String(element);
                } else if (opt.allowNull === true && $.type(element) === 'null') {
                    return String(element);
                } else {
                    return null; //elementがArrayの場合は無視
                }
            });
        }
        if ($.isPlainObject(obj)) {
            result = obj[key] || '';
        } else {
            result = obj;
        }
        if ($.type(result) === 'string') {
            return [result];
        } else if (opt.allowNumber === true && $.type(result) === 'number') {
            return [String(result)];
        } else if (opt.allowBoolean === true && $.type(result) === 'boolean') {
            return [String(result)];
        } else if (opt.allowNull === true && $.type(result) === 'null') {
            return [String(result)];
        } else {
            return []; //入れ子を降りていって探すことはしない
        }
    }
    function getUriRepresentations(prop) {
        // plain string または @id属性値 の配列を返す（format属性による限定はしない）
        // http://iiif.io/api/presentation/2.1/#uri-representation
        // http://iiif.io/api/presentation/2.1/#repeated-properties
        return getKeyValuesShallow(prop, '@id');
    }
    function getPropertyValuesI18n(prop, lang, option) {
        // @languageを考慮した属性値の配列を返す
        // http://iiif.io/api/presentation/2.1/#language-of-property-values
        // This pattern may be used in label, description, attribution and 
        // the label and value fields of the metadata construction.
        var opt = option || {};
        function getElementsI18n(arr, lang) {
            if ($.isArray(arr)) {
                return arr.filter(function(element) {
                    return $.isPlainObject(element) && '@value' in element && (element['@language'] === lang || !lang);
                });
            } else {
                return [];
            }
        }
        var result = prop;
        var key = '@value';
        if ($.isArray(prop)) {
            result = getElementsI18n(prop, lang);
            if (result.length > 0) {
                //言語設定に一致するものがある → 一致したものを表示
            } else {
                var propNum = prop.filter(function(element) {
                    return ($.isPlainObject(element) && key in element) || $.type(element) === 'string';
                }).length;
                var langPropNum = getElementsI18n(prop).length;
                if (langPropNum === 0) {
                    //一つも'@language'が設定されていない → 全て表示
                    result = prop;
                } else if (langPropNum === propNum) {
                    //全ての要素に'@language'が設定されているが、言語設定に一致するものはない
                    //→ 表示すべき言語を決めて、それに一致したものを表示
                    result = getElementsI18n(prop, 'en'); //fallback
                    if (result.length === 0) {
                        result = getElementsI18n(prop);
                        if (result.length > 0) {
                            result = getElementsI18n(prop, result[0]['@language']);
                        }
                    }
                } else {
                    //一部の要素に'@language'が設定されているが、言語設定に一致するものはない
                    //→ '@language'が設定されていないものを全て表示
                    result = prop.filter(function(element) {
                        if ($.isPlainObject(element)) {
                            return !element['@language'];
                        } else if ($.type(element) === 'string') {
                            return element;
                        } else {
                            return false; //elementがArrayの場合は無視
                        }
                    });
                }
            }
        }
        return getKeyValuesShallow(result, key, opt);
    }
    function getPropertyValueI18n(prop, lang, option) {
        // @languageを考慮した属性値のコンマ区切り文字列を返す
        if (!lang) {
            lang = lng;
        }
        return getPropertyValuesI18n(prop, lang, option).join(', ');
    }
    function getRegeionFromFragment(fragment) {
        var region = 'full';
        if (fragment) {
            //https://www.w3.org/TR/media-frags/#naming-space
            var match = fragment.match(/xywh=(?:pixel:)?([0-9]+),([0-9]+),([0-9]+),([0-9]+)/); //「percent:」は未対応
            if (match) {
                var x = parseInt(match[1], 10);
                var y = parseInt(match[2], 10);
                var w = parseInt(match[3], 10);
                var h = parseInt(match[4], 10);
                region = [x, y, w, h].join(',');
            }
        }
        return region;
    }
    function getMajorVersionNumberFromSemVer(semVer) {
        var major = parseInt((semVer.split('.'))[0], 10);
        if (isNaN(major)) {
            return -1;
        } else {
            return major;
        }
    }
    function getLabelValuePair(object) {
        var string = '';
        if (object) {
            var delimiter = (lng !== 'ja') ? ': ' : '：';
            $.each(object, function(_, val) {
                if (val && 'label' in val && 'value' in val) {
                    var facetLabel = getPropertyValueI18n(val.label, lng);
                    var facetValue = getPropertyValueI18n(val.value, lng, { allowNumber: true, allowBoolean: true });
                    string += facetLabel + delimiter + facetValue + '<br>';
                }
            });
        }
        return string;
    }

    //Cursor API関係
    function getCursorEndpointUrlFromCursor(cursor) {
        var cursorEndpointUrl = null;
        if ($.isPlainObject(cursor) && $.isPlainObject(cursor.service)) {
            var service = cursor.service;
            if (service['@context'] && service['@context'] === CONTEXT_CURSOR &&
                service['@id'] && $.type(service['@id']) === 'string') {
                cursorEndpointUrl = service['@id'];
            }
        }
        return cursorEndpointUrl;
    }
    function getCursorUrl(cursorEndpointUrl, cursorIndex) {
        var cursorUrl = null;
        if (cursorEndpointUrl && getCursorIndexFromProp(cursorIndex) !== null) {
            cursorUrl = cursorEndpointUrl;
            cursorUrl += cursorEndpointUrl.indexOf('?') !== -1 ? '&' : '?';
            cursorUrl += 'cursorIndex=' + cursorIndex;
        }
        return cursorUrl;
    }
    function getCursorIndexFromCursorUrl(cursorUrl) {
        var cursorIndex = null;
        var cursorUrl_ = cursorUrl.split('?');
        if (cursorUrl_.length > 1) {
            var match = cursorUrl_[1].match(/(?:&)?cursorIndex=(-?[0-9]+)(&|$)/);
            if (match) {
                cursorIndex = parseInt(match[1], 10);
            }
        }
        return cursorIndex;
    }
    function getCursorIndexFromCanvas(canvas) {
        var cursorIndex = null;
        if (!canvas) { return cursorIndex; }
        if ($.isPlainObject(canvas) && canvas['@id'] && canvas['@type']) {
            if ((canvas['@type'] === 'cs:Canvas' || canvas['@type'] === 'codh:Canvas') && 'cursorIndex' in canvas) {
                cursorIndex = getCursorIndexFromProp(canvas.cursorIndex);
            }
        }
        return cursorIndex;
    }
    function getCursorIndexFromProp(prop) {
        var cursorIndex = null;
        if (prop === null || prop === undefined) { return cursorIndex; }
        var match = String(prop).match(/^(-?[0-9]+)$/);
        if (match) {
            cursorIndex = parseInt(match[1], 10);
        }
        return cursorIndex;
    }

    //オブジェクトの最低限の妥当性チェック
    //（この結果がfalseであるものは必ずinvalidだが、この結果がtrueであってもvalidとは限らない）
    function isValidCurationFalseTrue(curation) {
        //最低限のチェック（この結果のみをもってvalidと判断してはならない）
        //selections内の必須プロパティ未チェックなので、この結果のみをもってvalidと判断してはならない
        return ($.isPlainObject(curation) && $.isArray(curation['@context']) &&
            curation['@context'][0] === 'http://iiif.io/api/presentation/2/context.json' &&
            curation['@context'][1] === CONTEXT_CURATION &&
            (curation['@type'] === 'cr:Curation' || curation['@type'] === 'codh:Curation') &&
            $.isArray(curation.selections));
    }
    function isValidManifestFalseTrue(manifest) {
        //最低限のチェック（この結果のみをもってvalidと判断してはならない）
        return ($.isPlainObject(manifest) &&
            manifest['@context'] === 'http://iiif.io/api/presentation/2/context.json' &&
            manifest['@type'] === 'sc:Manifest' &&
            'label' in manifest);
    }
    function isValidTimelineFalseTrue(timeline) {
        //最低限のチェック（この結果のみをもってvalidと判断してはならない）
        return ($.isPlainObject(timeline) && $.isArray(timeline['@context']) &&
            timeline['@context'][0] === 'http://iiif.io/api/presentation/2/context.json' &&
            timeline['@context'][1] === CONTEXT_TIMELINE &&
            (timeline['@type'] === 'tl:Manifest' || timeline['@type'] === 'codh:Manifest') &&
            'label' in timeline &&
            timeline.viewingHint === 'time' &&
            $.isArray(timeline.cursors));
    }
    function isValidCursorFalseTrue(cursor) {
        //最低限のチェック（この結果のみをもってvalidと判断してはならない）
        return ($.isPlainObject(cursor) && $.isArray(cursor['@context']) &&
            cursor['@context'][0] === 'http://iiif.io/api/presentation/2/context.json' &&
            cursor['@context'][1] === CONTEXT_CURSOR &&
            (cursor['@type'] === 'cs:Cursor' || cursor['@type'] === 'codh:Cursor') &&
            getCursorEndpointUrlFromCursor(cursor) && //cursor.serviceのチェック
            $.isPlainObject(cursor.sequence) && $.isArray(cursor.sequence.canvases));
    }
    //URLの妥当性チェック
    function isTrustedManifestUrl(manifestUrl) {
        var identifier = getIdentifierFromManifestUrl(manifestUrl);
        if (identifier) {
            return true;
        } else {
            return isTrustedUrl(manifestUrl);
        }
    }
    function isTrustedTimelineUrl(timelineUrl) {
        return isTrustedUrl(timelineUrl);
    }
    function isTrustedUrl(url) {
        var anchor = document.createElement('a');
        anchor.href = url;
        var href = anchor.href;
        for (var i = 0; i < conf.trustedUrlPrefixes.length; i++) {
            var trustedUrlPrefix = conf.trustedUrlPrefixes[i];
            if (trustedUrlPrefix) {
                if (href.indexOf(trustedUrlPrefix) === 0) {
                    return true;
                }
            }
        }
        return false;
    }
    //identifierとmanifestUrlの相互変換
    function isValidIdentifier(identifier) {
        if (identifier && $.type(identifier) === 'string') {
            var confIdentifier = conf.resolveIdentifierSetting.identifierPattern;
            if (confIdentifier) {
                var reg = new RegExp('^' + confIdentifier + '$');
                return identifier.search(reg) === 0;
            }
        }
        return false;
    }
    function getIdentifierFromManifestUrl(manifestUrl) {
        var identifier = '';
        if (manifestUrl && $.type(manifestUrl) === 'string') {
            var confManifestUrlPrefix = conf.resolveIdentifierSetting.manifestUrlPrefix;
            var confIdentifierPattern = conf.resolveIdentifierSetting.identifierPattern;
            var confManifestUrlSuffix = conf.resolveIdentifierSetting.manifestUrlSuffix;
            //resolveIdentifierSettingの設定がない場合は、manifestUrlからidentifierへの変換はできない
            if (confManifestUrlPrefix && confIdentifierPattern) {
                var identifierReg = '(' + confIdentifierPattern + ')';
                var reg = new RegExp('^' + escapeRegExp(confManifestUrlPrefix) + identifierReg + escapeRegExp(confManifestUrlSuffix) + '$');
                var match = manifestUrl.match(reg);
                if (match) {
                    if (isValidIdentifier(match[1])) {
                        identifier = match[1];
                    }
                }
            }
        }
        return identifier;
    }
    function getManifestUrlFromIdentifier(identifier) {
        var manifestUrl = '';
        var confManifestUrlPrefix = conf.resolveIdentifierSetting.manifestUrlPrefix;
        var confIdentifierPattern = conf.resolveIdentifierSetting.identifierPattern;
        var confManifestUrlSuffix = conf.resolveIdentifierSetting.manifestUrlSuffix;
        //resolveIdentifierSettingの設定がない場合は、identifierからmanifestUrlへの変換はできない
        if (confManifestUrlPrefix && confIdentifierPattern) {
            if (isValidIdentifier(identifier)) {
                //以下のようなパターンでmanifestを返すサイトもある。
                //https://manifests.britishart.yale.edu/manifest/{OBJECT_ID}
                //https://iiif.harvardartmuseums.org/manifests/object/{OBJECT_ID}
                //http://iiif.bodleian.ox.ac.uk/iiif/manifest/{OBJECT_ID}.json
                manifestUrl = confManifestUrlPrefix + identifier + confManifestUrlSuffix;
            }
        }
        return manifestUrl;
    }

    function getRegeion(page) {
        return getRegeionFromFragment(pageInfos[page].fragment);
    }
    function getQuality(page) {
        var semVer = getCanvasImageApiVersion(page);
        var major = getMajorVersionNumberFromSemVer(semVer);
        if (major < 2) {
            return 'native';
        } else {
            return 'default';
        }
    }
    function getThumbnailUrl(page, region, width, height) {
        var complianceLevel = getCanvasImageComplianceLevel(page);
        if (complianceLevel === 0) {
            //Compliance Level 0 の場合は、Sizeにfull以外を指定しての取得は未対応と考える。
            //また、Regionにfull以外（x,y,w,hなど）を指定しての取得は期待できない上に、
            //Getty Museum のように、/full/full/ では画像を返してくれないサイトもあるので、
            //明示的にサムネイルの設定があれば、そちらを利用する。
            //https://iiif.io/api/image/2.1/compliance/#size
            var thumbnailUrl = getCanvasThumbnailUrl(page);
            if (thumbnailUrl) {
                return thumbnailUrl;
            }
        }
        var canvasImageInfoUrl = getCanvasImageInfoUrl(page);
        if (canvasImageInfoUrl) {
            var region_ = region || getRegeion(page);
            var w = width || 200;
            var h = height || 200;
            var size;
            if (complianceLevel >= 2) {
                size = '!' + w + ',' + h; //'!200,200';
            } else if (complianceLevel === 1) {
                size = w + ','; //'200,';
            } else if (complianceLevel === 0) {
                size = 'full';
            } else {
                size = '!' + w + ',' + h; //complianceLevel不明
            }
            var rotation = 0;
            var quality = getQuality(page);
            var format = 'jpg';
            var imageReqParams = [region_, size, rotation, quality + '.' + format].join('/');
            return canvasImageInfoUrl.replace('/info.json', '/' + imageReqParams);
        } else {
            //IIIF Image API非対応リソース
            return getCanvasImageResourceId(page);
        }
    }
    function getPsuedoIIIFThumbnail($image, page, region, width, height) {
        //サムネイル一覧向けサムネイルを取得（IIIF Image API非対応リソース用）
        var regionElems = (region || getRegeion(page)).split(',');
        if (regionElems.length === 4) {
            var x = parseInt(regionElems[0], 10);
            var y = parseInt(regionElems[1], 10);
            var w = parseInt(regionElems[2], 10);
            var h = parseInt(regionElems[3], 10);
            var targetW = width || 200;
            var targetH = height || 200;
            if (w < 1) { w = 1; }
            if (h < 1) { h = 1; }
            var ratioW = targetW / w;
            var ratioH = targetH / h;
            var ratio = Math.min(ratioW, ratioH, 1);
            var $psuedo_iiif_thumbnail = $('<div>').addClass('psuedo_iiif_thumbnail').css({ width: (w * ratio) + 'px', height: (h * ratio) + 'px' });
            $image.addClass('psuedo_iiif').css({ 'transform': 'scale(' + ratio + ') translate(' + (-x) + 'px,' + (-y) + 'px)' });
            return $psuedo_iiif_thumbnail.append($image);
        } else {
            return $image;
        }
    }
    function getPsuedoIIIFThumbnailInCurationList($image, fragment, width, height) {
        //キュレーションリスト画面向けサムネイルを取得（IIIF Image API非対応リソース用）
        var regionElems = getRegeionFromFragment(fragment).split(',');
        if (regionElems.length === 4) {
            var x = parseInt(regionElems[0], 10);
            var y = parseInt(regionElems[1], 10);
            var w = parseInt(regionElems[2], 10);
            var h = parseInt(regionElems[3], 10);
            var targetW = width || 100;
            var targetH = height || 90;
            if (w < 1) { w = 1; }
            if (h < 1) { h = 1; }
            var ratioW = targetW / w;
            var ratioH = targetH / h;
            var ratio = Math.min(ratioW, ratioH, 1);
            var $psuedo_iiif_thumbnail = $('<div>').addClass('psuedo_iiif_thumbnail').css({ width: (w * ratio) + 'px', height: (h * ratio) + 'px', margin: 'auto' });
            $image.addClass('psuedo_iiif').css({ 'transform': 'scale(' + ratio + ') translate(' + (-x) + 'px,' + (-y) + 'px)' });
            return $psuedo_iiif_thumbnail.append($image);
        } else {
            return null;
        }
    }
    function getImageDownloadUrl(page) {
        var complianceLevel = getCanvasImageComplianceLevel(page);
        if (complianceLevel === 0 || complianceLevel === -1) {
            //Compliance Level 0 の場合は、Regionにfull以外を指定しての取得は未対応と考える
            //IIIF Image API非対応リソースの場合も画像全体を返す
            return getCanvasImageResourceId(page);
        } else {
            var canvasImageInfoUrl = getCanvasImageInfoUrl(page);
            var region = getRegeion(page);
            var size = 'full';
            var rotation = 0;
            var quality = getQuality(page);
            var format = 'jpg';
            var imageReqParams = [region, size, rotation, quality + '.' + format].join('/');
            return canvasImageInfoUrl.replace('/info.json', '/' + imageReqParams);
        }
    }

    //bookInfos[].canvases[]要素へのアクセスヘルパー
    function getCanvasImageInfoUrl(page) {
        var bookIndex = pageInfos[page].bookIndex;
        var pageLocal = pageInfos[page].pageLocal;
        return bookInfos[bookIndex].canvases[pageLocal - 1].imageInfoUrl; //info.jsonのURL
    }
    function getCanvasId(page) {
        var bookIndex = pageInfos[page].bookIndex;
        var pageLocal = pageInfos[page].pageLocal;
        return bookInfos[bookIndex].canvases[pageLocal - 1].id;
    }
    function getCanvasIds(bookIndex) {
        var canvasIds = [];
        for (var i = 0; i < bookInfos[bookIndex].totalPagesNum; i++) {
            canvasIds.push(bookInfos[bookIndex].canvases[i].id);
        }
        return canvasIds;
    }
    function getCanvasCursorIndex(page) {
        var bookIndex = pageInfos[page].bookIndex;
        var pageLocal = pageInfos[page].pageLocal;
        return bookInfos[bookIndex].canvases[pageLocal - 1].cursorIndex;
    }
    function getCanvasLabel(page) {
        var bookIndex = pageInfos[page].bookIndex;
        var pageLocal = pageInfos[page].pageLocal;
        return bookInfos[bookIndex].canvases[pageLocal - 1].label;
    }
    function getCanvasImageApiVersion(page) {
        var bookIndex = pageInfos[page].bookIndex;
        var pageLocal = pageInfos[page].pageLocal;
        return bookInfos[bookIndex].canvases[pageLocal - 1].imageApiVersion;
    }
    function getCanvasImageComplianceLevel(page) {
        var bookIndex = pageInfos[page].bookIndex;
        var pageLocal = pageInfos[page].pageLocal;
        return bookInfos[bookIndex].canvases[pageLocal - 1].imageComplianceLevel; //IIIF Image API非対応リソースの場合は-1
    }
    function getCanvasImageResourceId(page) {
        var bookIndex = pageInfos[page].bookIndex;
        var pageLocal = pageInfos[page].pageLocal;
        return bookInfos[bookIndex].canvases[pageLocal - 1].imageResourceId;
    }
    function getCanvasThumbnailUrl(page) {
        var bookIndex = pageInfos[page].bookIndex;
        var pageLocal = pageInfos[page].pageLocal;
        return bookInfos[bookIndex].canvases[pageLocal - 1].thumbnail; //undefinedもありうる
    }
    function getCanvasWidth(page) {
        var bookIndex = pageInfos[page].bookIndex;
        var pageLocal = pageInfos[page].pageLocal;
        return bookInfos[bookIndex].canvases[pageLocal - 1].width;
    }
    function getCanvasHeight(page) {
        var bookIndex = pageInfos[page].bookIndex;
        var pageLocal = pageInfos[page].pageLocal;
        return bookInfos[bookIndex].canvases[pageLocal - 1].height;
    }
    function getManifestUrl(page) {
        var bookIndex = pageInfos[page].bookIndex;
        return bookInfos[bookIndex].manifestUrl;
    }
    function getCanvasAnnotations(page) {
        var bookIndex = pageInfos[page].bookIndex;
        var pageLocal = pageInfos[page].pageLocal;
        return bookInfos[bookIndex].canvases[pageLocal - 1].annotations;
    }

    //getter/setter
    function getMap() {
        return map;
    }
    function getLang() {
        return lng;
    }
    function getCurrentPage() {
        return page; //0-based
    }
    function getTotalPages() {
        return pageInfos.length;
    }
    function getBrowsingCurationJson() {
        return curationInfo.curation || {};
    }
    function getBrowsingCurationUrl() {
        return curationInfo.curationUrl || '';
    }
    function getCurationJsonExportUrl() {
        return conf.service.curationJsonExportUrl || '';
    }
    function getCurationJsonExport() {
        return conf.service.curationJsonExport;
    }
    function setCurationJsonExport(arg) { //arg: callback function or url or null
        if ($.isFunction(arg)) {
            conf.service.curationJsonExport = arg;
        } else if ($.type(arg) === 'string') {
            conf.service.curationJsonExport = arg;
            conf.service.curationJsonExportUrl = arg;
        } else {
            conf.service.curationJsonExport = '';
        }
    }
    function getCroppedImageExportUrl() {
        return conf.service.croppedImageExportUrl || '';
    }
    function getCroppedImageExport() {
        return conf.service.croppedImageExport;
    }
    function setCroppedImageExport(arg) { //arg: callback function or url or null
        if ($.isFunction(arg)) {
            conf.service.croppedImageExport = arg;
        } else if ($.type(arg) === 'string') {
            conf.service.croppedImageExport = arg;
            conf.service.croppedImageExportUrl = arg;
        } else {
            conf.service.croppedImageExport = '';
        }
    }
    function setEventHandler(events, handler) {
        if ($.type(events) === 'string' && $.isFunction(handler)) {
            if (conf.eventHandler === void 0) {
                conf.eventHandler = {};
            }
            if ($.isArray(conf.eventHandler[events])) {
                conf.eventHandler[events].push(handler);
            } else {
                conf.eventHandler[events] = [handler];
            }
        }
    }
    function handleEvent(events, e) {
        if (conf.eventHandler && $.isArray(conf.eventHandler[events])) {
            $.each(conf.eventHandler[events], function() {
                if ($.isFunction(this)) {
                    this(e);
                }
            });
        }
    }
    function getName() {
        return APP_NAME;
    }
    function getMode() {
        var mode;
        if (params) {
            mode = params.mode;
        }
        return mode;
    }
    function setMode(mode) {
        if (params) {
            params.mode = mode;
        }
    }
    return {
        //v1.0
        prev: onPrevPage,
        next: onNextPage,
        prevBook: onPrevBook,
        nextBook: onNextBook,
        gotoPage: gotoPage,
        showThumbnails: showThumbnails,
        showInfo: showInfo,
        showHelp: showHelp,
        //v1.1
        showCurationList: showCurationList,
        toggleFav: toggleFav,
        //v1.2
        latest: gotoLatest,
        decreaseStep: decreaseStep,
        increaseStep: increaseStep,
        //v1.4
        getMap: getMap, //L.map
        getLang: getLang, //'en' or 'ja'
        getCurrentPage: getCurrentPage, //0-based
        getTotalPages: getTotalPages,
        //curation関係
        /*  あるタブで外部キュレーションを読み込んで表示している場合、
              getBrowsingCurationUrl() === getEditingCurationUrl()
            となり、そのまま同じタブで他のmanifestを読み込んだ場合、
            getEditingCurationUrl() は変化せず、getBrowsingCurationUrl() は '' となる。

            あるタブで外部キュレーションを読み込んで表示している場合、
            getBrowsingCurationJson() で返るjsonは、外部キュレーションの元のままの内容であり、
            getEditingCurationJson() で返るjsonは、キュレーションリスト画面でのリスト編集が反映された内容となる。
            そのまま同じタブで他のmanifestを読み込んだ場合、
            getEditingCurationJson() は変化せず、getBrowsingCurationJson() は {} となる。
        */
        getBrowsingCurationUrl: getBrowsingCurationUrl,   //現在表示している外部curationのURLを取得
        getBrowsingCurationJson: getBrowsingCurationJson, //現在表示している外部curationの内容を取得（編集による影響を受けない）
        getEditingCurationUrl: getEditingCurationUrl, //現在編集している外部curationのURLを取得（sessionStorage利用）
        getEditingCurationJson: getCurationListJson,  //現在編集している外部または内部curationの内容を取得
        //curation構築関係
        /*  getBrowsingCurationFavs()でfav配列を取得 → 外部でfav配列を編集（metadata編集など）
            → getCurationJsonFromFavs()の引数に編集後のfav配列を指定し、curationのjsonを作成
        */
        getBrowsingCurationFavs: getBrowsingCurationFavs, //現在表示している外部curationに基づくfav配列を取得（リスト編集による影響を受けない）
        getCurationJsonFromFavs: getCurationJsonFromFavs, //引数で指定されたfav配列からcurationのjsonを作成して取得
        //curationエクスポート関係
        /*  getCurationJsonExportUrl() は、常にエクスポート先URLの設定値を返す。
            現在の状態（ログイン状態等）に応じて、一時的にエクスポートを無効にしているとき、getCurationJsonExport() は '' を返す。
            現在の状態（ログイン状態等）に応じて、一時的にエクスポートを無効にするときは、setCurationJsonExport(null) を用いる。
            再びエクスポートを有効にするときは、setCurationJsonExport() で引数にcallbackまたはurlを指定する。
            エクスポートが有効になっているときは、getCurationJsonExport() はcallbackまたはurlを返す。
        */
        getCurationJsonExportUrl: getCurationJsonExportUrl, //curationのエクスポート先URLを取得
        getCurationJsonExport: getCurationJsonExport, //curationのエクスポートコールバック関数またはエクスポート先URLを取得
        setCurationJsonExport: setCurationJsonExport, //curationのエクスポートコールバック関数またはエクスポート先URLを設定
        exportCurationJson: exportCurationJson, //引数で指定されたjsonをエクスポートする
        //modal処理関係
        resetSubWindows: resetSubWindows, //modal表示の排他制御
        registerSubWindow: registerSubWindow, //引数には、非表示にするためのコールバック関数を指定する。返り値は unregisterSubWindow()で利用する。
        unregisterSubWindow: unregisterSubWindow, //registerSubWindow()の返り値を引数に指定し、登録解除する
        //イベント関係
        /*  IIIF Curation Viewerから送出されるイベントとしては、
                'icv.refreshPage'：refreshPage()参照
        */
        setEventHandler: setEventHandler, //イベントハンドラをセットする
        //プラグインホスト情報関係
        getName: getName, //プラグインホスト名を返す
        //v1.6
        getPropertyValueI18n: getPropertyValueI18n,
        getCroppedImageExportUrl: getCroppedImageExportUrl, //選択領域画像のエクスポート先URLを取得
        getCroppedImageExport: getCroppedImageExport, //選択領域画像のエクスポートコールバック関数またはエクスポート先URLを取得
        setCroppedImageExport: setCroppedImageExport, //選択領域画像のエクスポートコールバック関数またはエクスポート先URLを設定
        //v1.7
        getMode: getMode //ビューモードを取得（キュレーションビューモードではvoid 0、アノテーションビューモードでは'annotation'）
    };
};