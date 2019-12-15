import Peer from "simple-peer";

function PeerObj() {
    const peer = new Peer({ initiator: false, trickle: false });
    peer.on('signal', e => {
        localStorage.peerAdress = JSON.stringify(e);
    })
    return peer;
}

export default PeerObj
