/*
 * IIIF Curation Viewer - Firebase authentication plugin
 * http://codh.rois.ac.jp/software/iiif-curation-viewer/
 *
 * Copyright 2017 Center for Open Data in the Humanities, Research Organization of Information and Systems
 * Released under the MIT license
 *
 * Core contributor: Jun HOMMA (@2SC1815J)
 */
var ICVAuthFirebase = function(config, uiConfig, uiHeaderConfig) {
    'use strict';
    var pluginHost = typeof iiifViewer !== 'undefined' ? iiifViewer : void 0;
    var err;

    //依存関係の確認
    if (!pluginHost) {
        err = new Error(); logError('Plugin host not found.', err.lineNumber);
        return;
    }
    if (typeof firebase === 'undefined' || !firebase || !config) {
        err = new Error(); logError('Firebase and/or firebase config not found.', err.lineNumber);
        return;
    }

    //----------------------------------------------------------------------
    firebase.initializeApp(config);
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    var uiHeaderConf = configure(uiHeaderConfig, {
        linkParentSelector: '#navbar_lang_ul'
    });
    var haveSignedIn = false;
    firebase.auth().onAuthStateChanged(function(user) {
        var lang = pluginHost.getLang();
        if (user) {
            // ログイン状態
            var logout =
                '<li class="dropdown navbar-text navbar-text-custom-header navbar-text-custom-header-logout" id="nav_login_logout_dropdown">' +
                '  <a href="#" data-toggle="dropdown" class="dropdown-toggle" id="nav_login_logout_text"></a>' +
                '  <ul class="dropdown-menu">' +
                '    <li id="nav_login_logout"><a href="#">' + ((lang !== 'ja') ? 'Logout' : 'ログアウト') + '</a></li>' +
                '  </ul>' +
                '</li>';
            if (uiHeaderConf.linkPlaceHolder) {
                if ($('#nav_login_logout_dropdown').length) {
                    $('#nav_login_logout_dropdown').replaceWith(logout);
                }
                if ($(uiHeaderConf.linkPlaceHolder).length) {
                    $(uiHeaderConf.linkPlaceHolder).replaceWith(logout);
                }
            } else {
                $('#nav_login_logout_dropdown').remove();
                $(uiHeaderConf.linkParentSelector).append(logout);
            }
            $('#nav_login_logout_text').text(user.displayName).append('<span class="caret"></span>');
            $('#nav_login_logout').on('click', function() {
                firebase.auth().signOut(); // ログアウトする
                return false;
            });
            if (!haveSignedIn) {
                //ログアウト状態からログイン状態に変化したとき（別のタブでログインした場合も対象）
                haveSignedIn = true;
            }
        } else {
            // ログアウト状態
            var login =
                '<li class="dropdown navbar-text navbar-text-custom-header navbar-text-custom-header-logout" id="nav_login_logout_dropdown">' +
                '  <a href="#" data-toggle="dropdown" class="dropdown-toggle" id="nav_login_logout_text">' + ((lang !== 'ja') ? 'Login' : 'ログイン') + '</a>' +
                '  <ul class="dropdown-menu" style="z-index: 1010;">' +
                '    <li id="nav_login_logout_menu"><div id="firebaseui-auth-container"></div></li>' +
                '  </ul>' +
                '</li>';
            if (uiHeaderConf.linkPlaceHolder) {
                if ($('#nav_login_logout_dropdown').length) {
                    $('#nav_login_logout_dropdown').replaceWith(login);
                }
                if ($(uiHeaderConf.linkPlaceHolder).length) {
                    $(uiHeaderConf.linkPlaceHolder).replaceWith(login);
                }
            } else {
                $('#nav_login_logout_dropdown').remove();
                $(uiHeaderConf.linkParentSelector).append(login);
            }
            $('#firebaseui-auth-container').on('keydown', function(e) {
                e.stopPropagation();
            });
            ui.start('#firebaseui-auth-container', uiConfig);
            if (ui.isPendingRedirect()) {
                //認証処理中であることをフィードバックするため
                $('#nav_login_logout_text').dropdown('toggle');
            }
            if (haveSignedIn) {
                //ログイン状態からログアウト状態に変化したとき（別のタブでログアウトした場合も対象）
                haveSignedIn = false;
            }
        }
    }, function(error) {
        err = new Error(); logError(error.message, err.lineNumber);
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
            helper(conf_, config, 'linkParentSelector', 'string');
            helper(conf_, config, 'linkPlaceHolder', 'string');
        }
        return conf_;
    }

    function logError(message, lineNumber) {
        if (window.console) {
            var pluginName = 'Firebase authentication plugin';
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