/*
 * IIIF Curation Viewer - Curation metadata edit plugin
 * http://codh.rois.ac.jp/software/iiif-curation-viewer/
 *
 * Copyright 2017 Center for Open Data in the Humanities, Research Organization of Information and Systems
 * Released under the MIT license
 *
 * Core contributor: Jun HOMMA (@2SC1815J)
 */
var icvEditCurationMetadata = (function() {
    var curationMetadataConfig = {
        useJsonEditor: true,
        jsonEditorOptions: {
            schema: {
                'title': 'Metadata',
                'type': 'array',
                'format': 'table',
                'items': {
                    'title': 'item',
                    'type': 'object',
                    'properties': {
                        'label': {
                            'type': 'string'
                        },
                        'value': {
                            'type': [
                                'string',
                                'array'
                            ]
                        }
                    }
                }
            },
            theme: 'bootstrap3',
            iconlib: 'bootstrap3',
            disable_array_delete_all_rows: true,
            disable_array_delete_last_row: true,
            disable_array_reorder: true,
            disable_properties: true
        }
    };
    return ICVEditCurationMetadata(curationMetadataConfig);
})();