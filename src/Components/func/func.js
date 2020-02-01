export const width = ()=> {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (height > width) {
        return true;
    } else {
        return false;
    }
}