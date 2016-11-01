'use strict'

/**
 * Parses get string
 * @name {String} patameter name
 */

function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function initRoom() {
    console.log(easyrtc);
    console.log('__________________________________');
    console.log('before connect');
    connect();
    console.log('after connect');

    var userRole = getParameterByName('user');

    if (userRole === 'admin') {


        easyrtc.getVideoSourceList(function(videoSrcList) {
            // check if exists
            var videoId = videoSrcList[0].deviceId;
            console.log('__________________________________');
            console.log(videoId);
            easyrtc.setVideoSource(videoId);
            easyrtc.initMediaSource(
                function(stream) {
                    createLocalVideo(stream, 'selfVideo');
                    if (otherEasyrtcid) {
                        easyrtc.addStreamToCall(otherEasyrtcid, 'selfVideo');
                    }
                },
                function(errCode, errText) {
                    easyrtc.showError(errCode, errText);
                }, 'selfVideo');

        })

    }
}

initRoom();