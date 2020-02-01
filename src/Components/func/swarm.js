import signalhub from "signalhub";
import createSwarm from "webrtc-swarm";
import { getStorage } from "./serviceProvider";
//
const hub = signalhub("vid-chat", [
    "https://signalhub-hzbibrznqa.now.sh",
    "https://signalhub-jccqtwhdwc.now.sh",
]);
const user = getStorage().me;
if (!localStorage.me) {
    localStorage.me = JSON.stringify(user);
}
if (!localStorage.other) {
    localStorage.other = JSON.stringify([]);
}
function swarmFunc(stream) {
    const swarm = createSwarm(hub, {
        stream: stream,
        uuid: localStorage.me ? JSON.parse(localStorage.me).id : null
    });
    user.id = swarm.me;
    localStorage.me = JSON.stringify(user);
    

    return swarm;
}
export default swarmFunc;




