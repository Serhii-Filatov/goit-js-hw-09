const refs = {
    body: document.querySelector('body'),
    buttonStart: document.querySelector('[data-start]'),
    buttonStop: document.querySelector('[data-stop]'),
}

let intervalId

refs.buttonStart.addEventListener('click', onClickButtonStart)
refs.buttonStop.addEventListener('click', onClickButtonStop)

function onClickButtonStart() {   
    refs.buttonStart.toggleAttribute('disabled')
    refs.buttonStop.toggleAttribute('disabled')

    intervalId = setInterval(changeColorBg, 1000)
}

function onClickButtonStop() {
    refs.buttonStart.toggleAttribute('disabled')
    refs.buttonStop.toggleAttribute('disabled')

    clearInterval(intervalId)    
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColorBg() {
    refs.body.style.backgroundColor = getRandomHexColor()
    
}
