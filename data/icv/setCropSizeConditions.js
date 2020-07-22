/*
 * IIIF Curation Viewer - Crop size conditions set plugin
 * http://codh.rois.ac.jp/software/iiif-curation-viewer/
 *
 * Copyright 2019 Center for Open Data in the Humanities, Research Organization of Information and Systems
 * Released under the MIT license
 *
 * Core contributor: Jun HOMMA (@2SC1815J)
 */
var icvSetCropSizeConditions = (function() {
    var cropSizeConditionsConfig = {
        enableDefaultSize: false,
        defaultWidth: 100,
        defaultHeight: 100,
        keepDefaultAspectRatio: false,
        enableMinimumSize: false,
        minPercentageToCanvasShortSideLength: 25
    };
    return ICVSetCropSizeConditions(cropSizeConditionsConfig);
})();