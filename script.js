const $aside = document.querySelector("aside");

const $main = document.querySelector("main");

const jogadorAtual = document.querySelector("aside div")

let posicoesVermelho = [];
let posicoesPreto = [];

function criarTabuleiro() {
    let idCount = 0
    for(let i=0; i<7;i++){
        let coluna = document.createElement('div')
        coluna.classList.add('coluna')
        $main.appendChild(coluna)
        for(let y=0; y< 6; y++){
            let space=document.createElement('div')
            space.classList.add('espaco')
            space.id = `space${idCount}`
            coluna.appendChild(space)
            idCount++
        }
    }
}

criarTabuleiro();

function controleJogador() {

    //identifica jogador atual
    let copiaJogador = document.querySelector("aside div")
    if(copiaJogador.classList[1]==="vermelho"){
        copiaJogador.classList.remove("vermelho")
        copiaJogador.classList.add("preto")
    }else{
        copiaJogador.classList.remove("preto")
        copiaJogador.classList.add("vermelho")
    }
    //muda classe para a próxima cor

}

function notificarVitoria(cor) {

    const colunas = document.querySelectorAll(".coluna")
    for(let i=0;i<colunas.length;i++){
        colunas[i].classList.add("hidden")
    }
    let notificação = document.createElement("p")
    if(cor==="empate"){
        notificação.innerText="EMPATE"
    }else{
        notificação.innerText=`JOGADOR: ${cor.toUpperCase()} GANHOU`
    }
    $main.appendChild(notificação)

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

    //identificar jogador atual
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
    //adicionar id ao array correspondente ao jogador

     
    // verificarEmpate()

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

for (let i = 0; i < $main.children.length; i++) {
    $main.children[i].addEventListener("click", () => {
        identificarLivre($main.children[i]);
    });
}