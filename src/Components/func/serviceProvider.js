const user = getStorage().me;
//
export function streamExists(array, value) {
    let bool = false;
    // eslint-disable-next-line
    array.map(a => {
        if (a.data.me.id === value.data.me.id) {
            bool = true;
        }
    });
    return bool;
}
export function isExist(value) {
    const others = JSON.parse(localStorage.other);
    let bool = false;
    // eslint-disable-next-line
    others.map(other => {
        if (other.name === value.name) {
            bool = true;
        }
    });
    return bool;
}
export function updateUser(value) {
    const others = JSON.parse(localStorage.other);
    let newArray = [];
    // eslint-disable-next-line
    others.map(other => {
        if (other.name === value.name) {
            newArray.push(value);
        } else {
            newArray.push(other);
        }
    });
    // console.log("[phase 1]: attempting to update user", value,newArray);

    localStorage.other = JSON.stringify(newArray);
}
export function createUser(value) {
    const others = JSON.parse(localStorage.other);
    console.log(value);
    let newArray = others;
    newArray.push(value);
    // console.log("[phase 1]: attempting to Create user", value, newArray);

    localStorage.other = JSON.stringify(newArray);
}
export function saveUser(value) {
    console.log("[phase 1]: saving: ", value);
    if (value) {
        if (value.name) {
            if (isExist(value)) {
                console.log("[phase 1]: user Existes", value);
                updateUser(value);
            } else {
                console.log("[phase 1]: user Does NOT Existes", value);
                createUser(value);
            }
        }
    }
}
export function phaseOneRequest(swarm) {
    console.log("[phase 1]: Started");
    console.log("sending request");
    swarm.peers.forEach(peer => {
        console.log(peer);
        validatePeer(peer, {
            type: "request",
            user: getStorage().me,
            phase: 1
        });
    });
}
export function phaseOneResponse(swarm, payload) {
    console.log("[phase 1]: response Recived", payload);
    saveUser(payload);
    swarm.peers.forEach(peer => {
        validatePeer(peer, {
            type: "response",
            user: user,
            phase: 1
        });
    });
}
export function store(what) {
    if (what === "other") {
    } else {
    }
}
export function jes(obj) {
    return JSON.stringify(obj);
}
export function jep(obj) {
    return JSON.parse(obj);
}
export function firstPhase(swarm, data) {
    if (data.type === "request") {
        phaseOneResponse(swarm, data.user);
    } else if (data.type === "response") {
        saveUser(data.user);
    } else {
        console.log("Someting is wrong on the recived data");
    }
}
export function secondPhase(swarm, data) {
    if (data.type === "offer") {
        //call recived or call offered
        //prepare to ring
        if (data.who.your === getStorage().me.id) {
            // is the call for me?
            console.log("ringing the call from: ");
            return { type: "ring", data };
        } else {
            return { type: null, data: null };
        }
    } else if (data.type === "answer") {
        //answer recived
        //prepare to enable track
        const peer = swarm.remotes[data.who];
        peer.stream.getTracks()[0].enabled = true;
        console.log("Answer recived from: ", peer);
        return { type: "connected", data };
    } else if (data.type === "rejected") {
        return { type: "rejected", data };
    } else if (data.type === "accepted") {
        return { type: "accepted", data };
    } else if (data.type === "end") {
        const peer = swarm.remotes[data.who];
        peer.stream.getTracks()[0].enabled = false;
        console.log("call ended");
        return { type: "end", data };
    } else {
        return { type: "abort", data };
    }
}
export function getStorage() {

    return {
        me: localStorage.me ? JSON.parse(localStorage.me) : {},
        other: localStorage.me ? JSON.parse(localStorage.other) : []
    };
}
export function sendPeer(id, swarm, prams) {
    const peer = swarm.remotes[id];
    if (peer && peer._channel.readyState === "open") {
        peer.send(jes(prams));
        return true;
    } else {
        console.log("can not send b/c:", peer);
        return false;
    }
}
export function validatePeer(peer, prams) {
    if (peer && peer._channel.readyState === "open") {
        peer.send(jes(prams));
    }
}
