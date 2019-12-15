export const width = ()=> {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (height > width) {
        console.log('prortrate')
        return true;
    } else {
        console.log('landscape')

        return false;
    }
}