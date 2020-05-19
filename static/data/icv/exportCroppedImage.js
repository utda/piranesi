/*
 * IIIF Curation Viewer - Cropped image export plugin
 * http://codh.rois.ac.jp/software/iiif-curation-viewer/
 *
 * Copyright 2019 Center for Open Data in the Humanities, Research Organization of Information and Systems
 * Released under the MIT license
 *
 * Core contributor: Jun HOMMA (@2SC1815J)
 */
var icvExportCroppedImage = (function() {
    /*
    //初期状態で有効となるエクスポート先サービスを登録する場合の設定例
    var defaultCroppedImageExportConfig = {
        name: [
            {
                '@language': 'en',
                '@value': 'Single Kuzushiji Recognition'
            },
            {
                '@language': 'ja',
                '@value': 'くずし字一文字認識'
            }
        ],
        description: [
            {
                '@language': 'en',
                '@value': 'Performs single kuzushiji character recognition and displays the result in a popup.'
            },
            {
                '@language': 'ja',
                '@value': 'くずし字一文字の認識を行い、ポップアップ内に結果を表示します。'
            }
        ],
        homepage: 'http://codh.rois.ac.jp/char-shape/app/single-mobilenet/',
        exportUrl: 'http://codh.rois.ac.jp/char-shape/app/single-mobilenet-frame/',
        openTab: false,
        height: '280px'
    };
    */
    //初期状態で有効となるエクスポート先サービスを登録しない場合の設定
    var defaultCroppedImageExportConfig = {};

    var croppedImageExportPluginConfig = {
        trustedUrlPrefixes: ['https://mp.ex.nii.ac.jp/']
    };
    return ICVExportCroppedImage(defaultCroppedImageExportConfig, croppedImageExportPluginConfig);
})();