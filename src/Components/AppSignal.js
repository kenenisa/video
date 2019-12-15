import React,{useEffect} from 'react'
import signalhub from 'signalhub';
import createSwarm from 'webrtc-swarm';
//
const hub = signalhub('vid-chat',[
    'http://localhost:8080'
]);

function initial() {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then(stream => {
        const my = document.getElementById("my");
        my.srcObject = stream;
        my.play();
        const swarm = createSwarm(hub, {
            stream: stream
        });
        
        console.log(swarm)
        swarm.on('peer', (peer, id) => {
            console.log(id)
            peer.on('data', data => {
                console.log(data.toString())
            })
            peer.on('stream', function (str) {
                console.log(str);
                // const element = document.getElementById('other');
                // element.srcObject = str;
                // element.play();
            })
        })
        
        setInterval(() => {
            swarm.peers.forEach(peer => {
                peer.send(window.location.hash);
            })
        }, 1000);
    });
}
function addStream(element,stream) {
    element.srcObject = stream;
    element.play();
}

function AppSignal(){
    useEffect(()=>{
        initial()
    },);
    return (
        <div>
            <h1>The App</h1>
            <video id='my' style={{ border: 2 + "px solid red" }}></video>
            <video id='other' style={{ border: 2 + "px solid blue" }}></video>
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
