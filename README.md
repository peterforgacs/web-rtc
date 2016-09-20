WebRTC demo
===================


Simple WebRTC demo using Node Js and WebSockets. 

----------


Install
-------------

```sh
$ git clone https://github.com/peterforgacs/webRTC
$ cd webRTC
$ npm install
$ npm install -g node-static
$ static&
$ node server&
```
After the install the demo can be used from http://localhost:8080/ .

Overview
-------------
#### <i class="icon-trash"></i> Browser compatibility
WebRTC has a global ~62% compatibility rate in 2016.
http://caniuse.com/#search=webrtc

#### <i class="icon-trash"></i> Parts of WebRTC

WebRTC has 3 major parts built into the browser.

 - Audio enginge
 - Video engine
 - Transport layer

#### <i class="icon-trash"></i> Audio / Video engine
You can access the media stream trough the getUserMedia API.

```javascript
navigator.getUserMedia({video:true, audio:false}, 
function(stream){
	var video = document.querySelector('video');
	video.src = window.URL.createObjectUrl(stream);
}, function (err){});
```
This asks for permission  to use the webcam or microphone according to the given constraints.

The media stream is represented as a Blob object in Javascript ( immutable objects that represent raw data ). The createObjectUrl method creates a DOM String that represents the media stream for the current session and can be used as source on video elements.

#### <i class="icon-trash"></i> Transport Layer
The transportation layer can be used trough the RTCPeerConnection object.
The job of the RTCPeerConnection object is to maintain the session and state of a peer connection in the browser. It also handles the setup and creation of a peer connection.

To connect people you also need a signaling server which is not defined in the WebRTC standard.

> **A connection between user1 and user2:**
 
> - user1 calls CreateOffer()  
> - user1 sets local session description 
> - user1 sends its session description to user2 trough the signaling server 
> - user1 sends its Ice candidate to user2 
> - user2 sets the incoming session description from user1 as remote session description 
> - user2 calls createAnswer() and passing user1 session description 
> - user2 also send its local session description to user1 
> - user1 sets its remote session description what he got from user2 
> - user2 sends its Ice candidate to user1 


A connection starts with an offer from one user.
This sends the sdp file to the server that gets sent to the offered user.
The sdp file contains information about media codecs etc used by the offering party. These sdp files are exchanged so both client has his and the other clients sdp saved.

To finalize the the peer to peer connection you also need to use the ICE framework ( built into the browser ) that uses either STUN or TURN protocols to figure out the correct local / outside IP of  the peers. Depending on the users network configuration ICE either uses STUN or TURN.

During the setup of the RTCPeerConnection object you can specify a STUN or TURN server that is mainly used to ? get the outside IP of the client.
```javascript
var configuration = {
    "iceServers": [{ "url": "stun:stun.1.google.com:19302" }]
  };
yourConnection = new RTCPeerConnection(configuration);
```
After the peer connection has been established we can use the other peers media stream the same way as the local stream.
```javascript
yourConnection.addStream(stream);
  yourConnection.onaddstream = function (e) {
    theirVideo.src = window.URL.createObjectURL(e.stream);
};
```
#### <i class="icon-trash"></i> Signaling Server

Most of the time WebSockets is used for the signaling server.
For production some people advise to use socket.io (http://socket.io/) which is built on top of WebSockets.
You can also use traditional frameworks like XMMP. 

Frameworks / Ready made solutions
-------------

#### <i class="icon-trash"></i> Integration with PHP
 - http://stackoverflow.com/questions/17209717/how-to-integrate-nodejs-socket-io-and-php
 - https://github.com/jdutheil/nodePHP
 - https://github.com/niutech/node.php
 
#### <i class="icon-trash"></i> WebRTC frameworks
 - https://tokbox.com/
 - https://github.com/webRTC-io/webRTC.io
 - https://github.com/priologic/easyrtc
 - https://github.com/andyet/SimpleWebRTC

#### Articles
 - https://bloggeek.me/siganling-protocol-webrtc/

#Todo
- Dockerize the whole server
- Use socket.io instead of websockets
- Use new webrtc api
- Create an admin side that shows live rooms
- Save old connections
- Create a proper chat frontend
