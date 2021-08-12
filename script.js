const $aside = document.querySelector("aside");

const $main = document.querySelector("main");

const jogadorAtual = document.querySelector("aside div")

let posicoesVermelho = [];
let posicoesPreto = [];
let pontosVermelho=0
let pontosPreto=0

function criarTabuleiro() {

    let idCount = 0

    for (let i = 0; i < 7; i++) {

        let coluna = document.createElement('div')

        coluna.classList.add('coluna')
        coluna.addEventListener("click", () => {
            identificarLivre(coluna);
        });

        $main.appendChild(coluna)

        for (let y = 0; y < 6; y++) {

            let space = document.createElement('div')

            space.classList.add('espaco')
            space.id = `space${idCount}`

            coluna.appendChild(space)

            idCount++
        }
    }
}

criarTabuleiro();

function controleJogador() {
    let copiaJogador = document.querySelector("aside div")
    if(copiaJogador.classList[1]==="vermelho"){
        copiaJogador.classList.remove("vermelho")
        copiaJogador.classList.add("preto")
    }else{
        copiaJogador.classList.remove("preto")
        copiaJogador.classList.add("vermelho")
    }

}

function notificarVitoria(cor) {
    
    
    $main.innerText=""
    let notificação = document.createElement("p")
    notificação.classList.add("fadeIn")
    if(cor==="empate"){
        notificação.innerText="EMPATE"
    }else if(cor==="vermelho"){
        pontosVermelho++
        contadorVitória(cor, pontosVermelho)
        notificação.innerText=`JOGADOR: ${cor.toUpperCase()} GANHOU`
    }
    else if(cor==="preto"){
        pontosPreto++
        contadorVitória(cor, pontosPreto)
        notificação.innerText=`JOGADOR: ${cor.toUpperCase()} GANHOU`
    }
    $main.appendChild(notificação)
    const $body = document.querySelector("body")
    const btnRestart = document.createElement("button")
    btnRestart.classList.add("restart")
    btnRestart.innerText="Restart"
    $body.appendChild(btnRestart)
    btnRestart.addEventListener("click", Restart)
}
function contadorVitória(cor, pontos){
    const pontosjogador = document.querySelector(`.pontos_${cor}`)
    pontosjogador.innerText=pontos
}

function Restart(){
    document.querySelector("button").remove()
    posicoesVermelho = [];
    posicoesPreto = [];
    $main.innerText=""
    controleJogador()
    criarTabuleiro()
}


function verficiarVencedor(cor, posicoes) {
    let posicoesJogador;

    if (cor === "vermelho") {
        posicoesJogador = posicoes;
    }

    if (cor === "preto") {
        posicoesJogador = posicoes;
    }

    for (let i = 0; i < posicoesJogador.length; i++) {
        if (posicoesJogador.includes(posicoesJogador[i] + 1)
            && posicoesJogador.includes(posicoesJogador[i] + 2)
            && posicoesJogador.includes(posicoesJogador[i] + 3)) {
            notificarVitoria(cor)
            break
        } else if (posicoesJogador.includes(posicoesJogador[i] + 5)
            && posicoesJogador.includes(posicoesJogador[i] + 10)
            && posicoesJogador.includes(posicoesJogador[i] + 15)) {
            notificarVitoria(cor)
            break
        } else if (posicoesJogador.includes(posicoesJogador[i] + 6)
            && posicoesJogador.includes(posicoesJogador[i] + 12)
            && posicoesJogador.includes(posicoesJogador[i] + 18)) {

            notificarVitoria(cor)
            break
        } else if (posicoesJogador.includes(posicoesJogador[i] + 7)
            && posicoesJogador.includes(posicoesJogador[i] + 14)
            && posicoesJogador.includes(posicoesJogador[i] + 21)) {
            notificarVitoria(cor)
         } 
    }
    if (posicoesVermelho.length === 21 && posicoesPreto.length === 21) {
           
        notificarVitoria("empate")
    }
}

function atualizarArray(id, cor) {



    if(cor==="vermelho"){
        posicoesVermelho.push(parseInt(id.substr(5)))
    }
    if(cor==="preto"){
        posicoesPreto.push(parseInt(id.substr(5)))
    }
    if(posicoesVermelho.length>=4){
        verficiarVencedor("vermelho", posicoesVermelho)
    }if(posicoesPreto.length>=4 && posicoesPreto.length<21){
        verficiarVencedor("preto", posicoesPreto)
    }
}

function adicionarDisco(id) {
    
    let copiaJogador = document.querySelector("aside div")

    let criaDisco = document.createElement("div")

    criaDisco.classList.add("disco")
    criaDisco.classList.add(copiaJogador.classList[1])

    let corDisco  = criaDisco.classList[1]

    let espacoLivre = document.getElementById(id)

    espacoLivre.appendChild(criaDisco)

    let idEspacoLivre=espacoLivre.id

    atualizarArray(idEspacoLivre, corDisco)
    
    controleJogador()

}

function identificarLivre(colunaClicada) {

    let idEspacoLivre;

    if (colunaClicada.children[0].childElementCount !== 0) {
        return "Coluna totalmente ocupada."
    }

    for (let i = 0; i < colunaClicada.children.length; i++) {
        if (colunaClicada.children[i].childElementCount !== 0) {
            idEspacoLivre = colunaClicada.children[i - 1].id
            break
        }
        idEspacoLivre = colunaClicada.children[i].id
    }

    adicionarDisco(idEspacoLivre)

}

function criaJogadores(){
    const $body = document.querySelector("body")
    const jogadores = document.createElement("div")
    const jogadorVermelho= document.createElement("div")
    const jogadorPreto= document.createElement("div")
    const jV = document.createElement("div")
    const jP = document.createElement("div")
    const textV = document.createElement("p")
    const textP = document.createElement("p")


    jogadores.classList.add("container_jogadores")
    jogadorVermelho.classList.add("jodador")
    jogadorPreto.classList.add("jodador")
    jV.classList.add("vermelho")
    jV.classList.add("disco2")
    jP.classList.add("preto")
    jP.classList.add("disco2")
    textV.classList.add("pontos_vermelho")
    textP.classList.add("pontos_preto")

    jogadorVermelho.innerText="Jogador"
    jogadorPreto.innerText="Jogador"
    textP.innerText="0"
    textV.innerText="0"

    $body.appendChild(jogadores)
    jogadores.appendChild(jogadorVermelho)
    jogadores.appendChild(jogadorPreto)
    jogadorVermelho.appendChild(jV)
    jogadorPreto.appendChild(jP)
    jogadorVermelho.appendChild(textV)
    jogadorPreto.appendChild(textP)
}
criaJogadores()
