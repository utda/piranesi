/*
 * IIIF Curation Viewer - JSONkeeper export plugin
 * http://codh.rois.ac.jp/software/iiif-curation-viewer/
 *
 * Copyright 2017 Center for Open Data in the Humanities, Research Organization of Information and Systems
 * Released under the MIT license
 *
 * Core contributor: Jun HOMMA (@2SC1815J)
 */
var icvExportJsonKeeper = (function() {
    var jsonKeeperConfig = {
        accessControl: 'firebase',
        allowAnonymousPost: true
    };
    return ICVExportJsonKeeper(jsonKeeperConfig);
})();