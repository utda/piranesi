/*
 * IIIF Curation Viewer - Firebase authentication extension
 * http://codh.rois.ac.jp/software/iiif-curation-viewer/
 *
 * Copyright 2017 Center for Open Data in the Humanities, Research Organization of Information and Systems
 * Released under the MIT license
 *
 * Core contributor: Jun HOMMA (@2SC1815J)
 */
var icvAuthFirebase = (function() {
    var firebaseConfig = {
        apiKey: 'AIzaSyAcsAVeIJ5l2HCWY0OlCMxP-OVXodONYqA',
        authDomain: 'codh-81041.firebaseapp.com',
        databaseURL: 'https://codh-81041.firebaseio.com',
        projectId: 'codh-81041',
        storageBucket: 'codh-81041.appspot.com',
        messagingSenderId: '230970439562'
    };
    var uiConfig = {
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            //firebase.auth.GithubAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
            //firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        tosUrl: ''
    };
    return ICVAuthFirebase(firebaseConfig, uiConfig);
})();
