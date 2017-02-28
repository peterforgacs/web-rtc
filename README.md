

````sh
yarn install
cd server
yarn Install
yarn start
````
# Overview
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

