import React, { useEffect } from "react";
import signalhub from "signalhub";
import createSwarm from "webrtc-swarm";
//
const hub = signalhub("vid-chat", [
    // "https://signalhub-hzbibrznqa.now.sh",
    // "https://signalhub-jccqtwhdwc.now.sh",
    "http://localhost:8080"
]);
const user = {
    name: window.location.hash,
    id: null
};
if (!localStorage.me) {
    localStorage.me = JSON.stringify(user);
}
if (!localStorage.other) {
    localStorage.other = JSON.stringify([]);
}
// function process(type) {
//     switch (type) {
//         case 'user':
//             return newUser;
//             break;
//         case ''
//     }
// }
function isExist(value) {
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
function updateUser(value) {
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
function createUser(value) {
    const others = JSON.parse(localStorage.other);

    let newArray = others;
    newArray.push(value);
    // console.log("[phase 1]: attempting to Create user", value, newArray);

    localStorage.other = JSON.stringify(newArray);
}
function saveUser(value) {
    // console.log("[phase 1]: saving: ", value.name);
    if (isExist(value)) {
        // console.log("[phase 1]: user Existes", value);
        updateUser(value);
    } else {
        // console.log("[phase 1]: user Does NOT Existes", value);
        createUser(value);
    }
}
function phaseOneRequest(swarm) {
    // console.log("[phase 1]: Started");
    swarm.peers.forEach(peer => {
        if (peer.connected) {
            peer.send(
                JSON.stringify({ type: "request", user: user, phase: 1 })
            );
        }
    });
}
function phaseOneResponse(swarm, payload) {
    // console.log("[phase 1]: response Recived",payload);
    saveUser(payload);
    swarm.peers.forEach(peer => {
        peer.send(JSON.stringify({ type: "response", user: user, phase: 1 }));
    });
}
function initial() {
    if (navigator.onLine) {
        navigator.mediaDevices
            .getUserMedia({ video: false, audio: true })
            .then(stream => {
                const swarm = createSwarm(hub, {
                    stream: stream,
                    uuid: localStorage.me
                        ? JSON.parse(localStorage.me).id
                        : null
                });
                user.id = swarm.me;
                localStorage.me = JSON.stringify(user);
                swarm.on("connect", (peer, id) => {
                    // console.log(peer);

                    // console.log("connection stablished with: ", id);
                    //
                    peer.on("data", data => {
                        data = JSON.parse(data.toString());
                        // console.log(data);
                        if (data.type === "request" && data.phase === 1) {
                            phaseOneResponse(swarm, data.user);
                        } else if (
                            data.type === "response" &&
                            data.phase === 1
                        ) {
                            saveUser(data.user);
                        } else if (data.phase === 2) {
                            // console.log(data);
                            /**
                             * GETS ANSWERD HERE
                             * GETS ANSWERD HERE
                             * GETS ANSWERD HERE
                             * GETS ANSWERD HERE
                             * GETS ANSWERD HERE
                             */
                            // const my = document.getElementById("my");
                            // my.srcObject = stream;
                            // my.play();
                            // console.log(swarm.remotes[data.who.me]);
                            if (data.type === "offer") {
                                //call recived or call offered
                                //prepare to ring
                                if (
                                    data.who.your ===
                                    JSON.parse(localStorage.me).id
                                ) {
                                    // is the call for me?
                                    localStorage.offer = JSON.stringify(
                                        data.who
                                    ); //save the call for now
                                    document.getElementById("answer").style = //show the answer button
                                        "display:block";
                                    console.log("ringing the call from: ", peer);
                                    
                                }
                            } else {
                                       //answer recived
                                       //prepare to enable track
                                       const peer = swarm.remotes[data.who];
                                       peer.stream.getTracks()[0].enabled = true;
                                       console.log(
                                           "Answer recived from: ",
                                           peer
                                       );
                                   }
                        } else {
                            console.log(data);
                            console.info(
                                "[From Angles]: Your Incoming Data Is Fucked Up!!!"
                            );
                        }
                    });
                    if (peer.stream) {
                        peer.stream.getTracks()[0].enabled = false;

                        const other = document.getElementById("other");
                        other.srcObject = peer.stream;
                        other.play();
                    }
                });

                // function call() {
                //     swarm.peers.forEach(peer => {
                //         peer.send(JSON.stringify({ request: "offer" }));
                //     });
                // }
                phaseOneRequest(swarm);
                /**
                 * call Initiates
                 */
                if (document.getElementById("call")) {
                    document
                        .getElementById("call")
                        .addEventListener("click", function(e) {
                            const id = e.path[1].children[1].innerHTML;
                            // console.log(id, swarm.remotes[id]);
                            const peer = swarm.remotes[id];
                            if (peer) {
                                peer.send(
                                    JSON.stringify({
                                        type: "offer",
                                        who: { your: id, me: swarm.me },
                                        phase: 2
                                    })
                                );
                                console.log("Calling to: ", peer);

                            }

                            // swarm.peers.forEach(peer => {
                            //     console.log("lookiing for the person...");
                            //     peer.send(
                            //             type: "offer",
                            //             who: { your: id, me: swarm.me },
                            //             phase: 2
                            //         })
                            //     );
                            // });
                        });
                }
                const answer = document.getElementById("answer");
                if (answer) {
                    answer.addEventListener("click", function () {
                        const peerId = JSON.parse(localStorage.offer).me;
                        const peer = swarm.remotes[peerId];
                        peer.send(
                            JSON.stringify({
                                type: "answer",
                                who: swarm.me,
                                phase: 2
                            })
                        );
                        peer.stream.getTracks()[0].enabled = true;
                        console.log('answerd the call from: ', peer)
                    });
                }
                setInterval(() => {
                    console.log("[peers]: ", swarm.peers.length);
                    phaseOneRequest(swarm);
                    // swarm.peers.forEach(peer => {
                    // });
                }, 5000);
                // });
            });
    } else {
        console.error(
            "[From Angels]: YOU ARE NOT CONNECTED TO ANY NETWORK, I CAN'T GIVE YOU A PEER"
        );
    }
}
// function addStream(value, stream) {
//     const element = document.getElementById(value);
//     element.srcObject = stream;
//     element.play();
// }
//   }

function AppSignal() {
    useEffect(() => {
        initial();
    }, []);
    return (
        <div>
            <h1>The App</h1>
            <div id='list'></div>
            <video id='my' style={{ border: 2 + "px solid red" }}></video>
            <video id='other' style={{ border: 2 + "px solid blue" }}></video>
            <button id='answer' style={{ display: 'none' }}>
                Answer
            </button>
            {JSON.parse(localStorage.other).map((user, key) => (
                <div key={key}>
                    <span>{user.name}</span>
                    <div style={{ display: "none" }}>{user.id}</div>
                    <button id='call'>Call</button>
                </div>
            ))}
        </div>
    );
}
export default AppSignal;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// function Player(data) {
//     data = data || {};
//     this.color = data.color || randomColor();
//     this.x = 0;
//     this.y = 0;
//     this.element = document.createElement("div");
//     Object.assign(this.element.style, {
//         width: "30px",
//         height: "30px",
//         position: "absolute",
//         top: "0px",
//         left: "0px",
//         backgroundColor: this.color
//     });
//     document.body.appendChild(this.element);
// }
// Player.prototype.update = function(data) {
//     // console.log(players)
//     data = data || {};
//     this.x = data.x || this.x;
//     this.y = data.y || this.y;
//     Object.assign(this.element.style, {
//         top: this.y + "px",
//         left: this.x + "px"
//     });
// };
// function randomColor() {
//     const color = "#" + (((1 << 10) * Math.random()) | 0).toString();
//     // console.log('color',color);
//     return color;
// }
// document.addEventListener(
//     "keypress",
//     function(e) {
//         const speed = 30;
//         switch (e.key) {
//             case "a":
//                 you.x -= speed;
//                 break;
//             case "d":
//                 you.x += speed;
//                 break;
//             case "w":
//                 you.y -= speed;
//                 break;
//             case "s":
//                 you.y += speed;
//                 break;
//         }
//     },
//     false
// );
