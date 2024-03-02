const html = document.querySelector('html')
const focoBtn = document.querySelector('.app__card-button--foco')
const curtoBtn = document.querySelector('.app__card-button--curto')
const longoBtn = document.querySelector('.app__card-button--longo')
const banner = document.querySelector ('.app__image')
const titulo = document.querySelector ('.app__title')
const botoes = document.querySelectorAll ('.app__card-button')
const musicaInput =document.querySelector('#alternar-musica')
const startPauseBt = document.querySelector('#start-pause')
const iniciarPausarBt = document.querySelector('#start-pause span')
const startPauseIcon = document.querySelector('.app__card-primary-butto-icon')
const timer = document.querySelector('#timer') /*tempoNaTela*/

const musica = new Audio('/sons/luna-rise-part-one.mp3') 
const beepAudio = new Audio('/sons/beep.mp3')
const playAudio = new Audio('/sons/play.wav')
const pauseAudio = new Audio('/sons/pause.mp3')

let tempoDecorrido = 1500
let intervaloId = null

musica.loop=true

musicaInput.addEventListener ('change', () => {
    if(musica.paused){musica.play()}
    else {musica.pause()}
})

focoBtn.addEventListener('click', () => {
    tempoDecorrido=1500
    alterarContexto('foco')
    focoBtn.classList.add ('active')
})

curtoBtn.addEventListener('click', () => {
    tempoDecorrido=300
    alterarContexto('descanso-curto')
    curtoBtn.classList.add ('active')
})

longoBtn.addEventListener('click', () => {
    tempoDecorrido=600
    alterarContexto('descanso-longo')
    longoBtn.classList.add ('active')
})

function alterarContexto (contexto) {
    showtimer()
    botoes.forEach(function (contexto){contexto.classList.remove('active')})
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `           
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }    
}

const contagemRegressiva = () => {
    if(tempoDecorrido <= 0){
        beepAudio.play()
        alert('Tempo finalizado!')
        zerar()
        return
    }
    tempoDecorrido -= 1
    showtimer()
}

startPauseBt.addEventListener('click', iniciarPausar)

function iniciarPausar() {
    if(intervaloId){
        pauseAudio.play()
        zerar()
        return
    }
    playAudio.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarPausarBt.textContent = "Pausar"
    startPauseIcon.setAttribute('src', `/imagens/pause.png`)
}

function zerar() {
    clearInterval(intervaloId) 
    iniciarPausarBt.textContent = "Começar"
    startPauseIcon.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId = null
}

function showtimer () {
    const tempo = new Date(tempoDecorrido *1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`
}
showtimer()

