const buttons = document.querySelectorAll('.btn')
const start = document.querySelector('.start')
const blokeioBtns = document.querySelector('.blokeioBtns')
const blokeioStart = document.querySelector('.blokeioStart')
const resultadoText = document.querySelector('.mensagem')
const resultado = document.querySelector('.resultado')
const resultadoBtn = document.querySelector('.resultado button')
const pontuacao = document.querySelector('.pontuacao')
let listaJogo = []
let listaJogador = []
let naoDerrota = false
let numVitoria = 1


buttons.forEach((item, index) =>{
    item.addEventListener('click', ()=>{
        btnClidado(index)
    })
})


start.addEventListener('click', iniciar)

function blokearJogo(){
    blokeioBtns.style.display = 'block'
}

function desblokearJogo(){
    blokeioBtns.style.display = 'none'
}

function blokearInicio(){
    blokeioStart.style.display = 'block'
}

function desblokearInicio(){
    blokeioStart.style.display = 'none'
}

function abrirResultado(mensagem, cor){
    resultadoText.innerText = mensagem
    resultado.style.backgroundColor = cor
    resultado.style.display = 'flex'
}


function fecharResultado(){
    resultado.style.display = 'flex'
}

resultadoBtn.addEventListener('click' ,() =>{
    resultado.style.display = 'none'
})

function iniciar(){
    let numSorteado = sortear()
    adicionarAoJogo(numSorteado)
    blokearJogo()
    iluminarTodos()
    testarDerrota()
    adicionarPontuacao()
}

function sortear(){
    let number = Math.floor(Math.random() * (8 - 0 + 1)) + 0; 
    return number
}

function adicionarAoJogo(numero){
    listaJogo.push(numero)
}


function iluminarTodos(){
    listaJogo.forEach((item, index) =>{
        setTimeout(() => {
            setTimeout(() =>{
                buttons[item].style.backgroundColor = 'rgb(18, 147, 35)'
            }, 200)
            setTimeout(() =>{
                buttons[item].style.backgroundColor = 'rgb(13, 78, 22)'
            }, 1000)
            if(listaJogo.length -1 == index){
                setTimeout(()=>{
                    desblokearJogo()
                }, 1000)
            }
        }, 1000  + index * 1000)     
    })
}

function testarDerrota(){
    if(!naoDerrota){
        blokearInicio()
        naoDerrota = true
    }
}

function btnClidado(index){
    mostrarClicado(index)
    adiconarClicado(index)
    verificarListas()
    if(listaJogador.length == listaJogo.length && listaJogo != 0){
        iniciar()
        listaJogador = []
    }   
}

function mostrarClicado(click){
    buttons[click].style.backgroundColor = 'rgb(170, 152, 16)'
    buttons[click].style.border = '6px solid rgb(100, 98, 4)'
    setTimeout(() =>{
        buttons[click].style.backgroundColor = 'rgb(13, 78, 22)'
        buttons[click].style.border = '6px solid rgb(8, 46, 13)'
    }, 500)
}

function adiconarClicado(index){
    listaJogador.push(index)
}


function verificarListas(){
    verificarDerota()
    verificarVitoria()
}

function verificarDerota(){
    for(let i = 0; i < listaJogador.length; i++){
        if(listaJogo[i] != listaJogador[i]) derrota()
    }
}

function verificarVitoria(){
    if(listaJogador.length == 10){
        vitoria()
    }
}

function vitoria(){
    let mensagem = 'Parabens'
    reinico()
    abrirResultado(mensagem, '#0f08')
}

function adicionarPontuacao(){
    pontuacao.innerText = listaJogo.length -1
}
/* function adicionarPontuacao(){
    pontuacao.innerText = numVitoria
    numVitoria ++
} */

function derrota(){
    let mensagem = 'perdeu'
    reinico()
    abrirResultado(mensagem, '#f008')
}

function reinico(){
    resetarVariavies()
    desblokearInicio()
    blokearJogo()
}

function resetarVariavies(){
    listaJogo = []
    listaJogador = []
    naoDerrota = false
}
