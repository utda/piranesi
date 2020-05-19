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
var iiifViewer = (function() {
    var configExample = {
        generic: {
            //pagesパラメータによる表示対象指定は利用不可（デフォルト設定）

            //pagesパラメータで指定できるmanifest以外に表示を認めるURLのリスト
            //manifest/timelineパラメータで指定したURL、および
            //curationパラメータで指定したURLのJSON内に記述されたmanifest/timelineのURLが、
            //trustedUrlPrefixesリストの要素から始まる場合、表示を認める。
            trustedUrlPrefixes: ['https://', 'http://'] //無制限
        },
        generic_jsonKeeper: {
            trustedUrlPrefixes: ['https://', 'http://'], //無制限
            service: {
                curationJsonExportUrl: 'https://mp.ex.nii.ac.jp/api/curation/json'
            }
        },
        pmjt: {
            title: [
                {
                    '@language': 'en',
                    '@value': 'Pre-modern Japanese Text Viewer'
                },
                {
                    '@language': 'ja',
                    '@value': '日本古典籍ビューア'
                }
            ],
            //pagesパラメータによる表示対象指定可能
            resolveIdentifierSetting: {
                manifestUrlPrefix: 'http://codh.rois.ac.jp/pmjt/book/',
                identifierPattern: '[0-9]{9}',
                manifestUrlSuffix: '/manifest.json'
            },
            //pagesパラメータで指定できるmanifest以外に表示を認めるURLのリスト
            trustedUrlPrefixes: [] //pagesパラメータで指定できるmanifest以外は表示不可
        },
        digitalTyphoonFd: {
            //pagesパラメータによる表示対象指定は利用不可

            //pagesパラメータで指定できるmanifest以外に表示を認めるURLのリスト
            trustedUrlPrefixes: [
                'http://agora.ex.nii.ac.jp/digital-typhoon/himawari-3g/iiif/'
            ],
            timeline: {
                steps: [1, 6, 36, 144]
            },
            service: {
                croppedImageExportUrl: 'http://agora.ex.nii.ac.jp/cgi-bin/iiif/clipping.pl'
            },
            doc: {
                aboutUrl: 'http://codh.rois.ac.jp/software/iiif-curation-viewer/timeline.html#ui' //言語ごとにaboutページを分けない場合
            }
        },
        digitalTyphoonJp: {
            //pagesパラメータによる表示対象指定は利用不可

            //pagesパラメータで指定できるmanifest以外に表示を認めるURLのリスト
            trustedUrlPrefixes: [
                'http://agora.ex.nii.ac.jp/digital-typhoon/himawari-3g/iiif/'
            ],
            timeline: {
                steps: [1, 4, 24, 144, 576]
            },
            service: {
                croppedImageExportUrl: 'http://agora.ex.nii.ac.jp/cgi-bin/iiif/clipping.pl'
            },
            doc: {
                aboutUrl: [ //言語ごとにaboutページを分ける場合の書き方
                    {
                        '@language': 'en',
                        '@value': 'http://codh.rois.ac.jp/software/iiif-curation-viewer/timeline.html#ui'
                    },
                    {
                        '@language': 'ja',
                        '@value': 'http://codh.rois.ac.jp/software/iiif-curation-viewer/timeline.html#ui'
                    }
                ]
            }
        },
        toyobunko: {
            //pagesパラメータによる表示対象指定可能
            resolveIdentifierSetting: {
                manifestUrlPrefix: 'http://dsr.nii.ac.jp/toyobunko/',
                identifierPattern: '.*',
                manifestUrlSuffix: '/manifest.json',
                numberOfSlashesInIdentifier: 1 //identifierには'/'が1つ含まれている
            },
            //pagesパラメータで指定できるmanifest以外に表示を認めるURLのリスト
            trustedUrlPrefixes: [] //pagesパラメータで指定できるmanifest以外は表示不可
        },
        harvardartmuseums: {
            //pagesパラメータによる表示対象指定可能
            resolveIdentifierSetting: {
                manifestUrlPrefix: 'https://iiif.harvardartmuseums.org/manifests/object/',
                identifierPattern: '[0-9]+',
                manifestUrlSuffix: '',
                numberOfSlashesInIdentifier: 0 //identifierに含まれる'/'は0個
            },
            //pagesパラメータで指定できるmanifest以外に表示を認めるURLのリスト
            trustedUrlPrefixes: [] //pagesパラメータで指定できるmanifest以外は表示不可
        },
        bodleian: {
            //pagesパラメータによる表示対象指定可能
            resolveIdentifierSetting: {
                manifestUrlPrefix: 'http://iiif.bodleian.ox.ac.uk/iiif/manifest/',
                identifierPattern: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
                manifestUrlSuffix: '.json',
                numberOfSlashesInIdentifier: 0 //identifierに含まれる'/'は0個
            },
            //pagesパラメータで指定できるmanifest以外に表示を認めるURLのリスト
            trustedUrlPrefixes: [] //pagesパラメータで指定できるmanifest以外は表示不可
        },
        codhKuzushiji: {
            title: [
                {
                    '@language': 'en',
                    '@value': '<span class="icp_navbar_brand_logo"></span>Kuzushiji Recognition Viewer'
                },
                {
                    '@language': 'ja',
                    '@value': '<span class="icp_navbar_brand_logo"></span>くずし字認識ビューア'
                }
            ],
            trustedUrlPrefixes: ['https://', 'http://'], //無制限
            service: {
                curationJsonExportUrl: 'https://mp.ex.nii.ac.jp/api/curation/json'
            }
        }
    };
    return IIIFCurationViewer(configExample.generic_jsonKeeper);
})();