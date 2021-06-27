function sleep (time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true)
        }, time)
    })
}

async function updateMusic() {
    await sleep(1000)
    console.log('load aplayer')
    var el = document.getElementsByClassName("aplayer-withlist")
    if(el.length == 0)
    {
        console.log("reflush")
        window.location.reload()
    }
    // if (window.aplayers) {
    // console.log(window.aplayers)
    // for (let i = 0; i < window.aplayers.length; i++) {
    //     window.aplayers[i].destroy();
    //     location.reload()
    // }
    // console.log("clean")
    // window.aplayers = [];
}
}

updateMusic()