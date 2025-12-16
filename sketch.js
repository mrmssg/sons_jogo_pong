//determina posicao inicial da bolinha
let xBolinha = 300;
let yBolinha = 200;

// determina o tamanho da bolinha - diametro e o raio
let diametro = 30;
let raio = diametro / 2;

//determina a velocidade da bolinha no eixo x e y
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//determina posicao da raquete
let xRaquete = 5;
let yRaquete = 150;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//dimensoes raquete
let raqueteComprimento = 10;
let raqueteAltura = 90;

let colidiu = false;

// placar do jogo
 let meusPontos = 0;
 let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

// Cenario
let fundo

//Possibilitando o erro da raquete do oponente
let chanceDeErrar = 0;

function preload() {
    trilha = loadSound("trilha.mp3");
    ponto = loadSound("ponto.mp3");
    raquetada = loadSound("raquetada.mp3");
    fundo = loadImage("/imagem/fundo.jpg")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(fundo);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBordas();
  mostraRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaMinhaRaquete();
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaquete, yRaquete);
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  calculaChanceDeErrar();
  evitaBugBolinha();
}

function mostraBolinha() {
  fill("#FFC107")
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBordas() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }

  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  fill("#FF2600")
  rect(x, y, raqueteComprimento, raqueteAltura);
}


function movimentaMinhaRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
     // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
   yRaquete = constrain(yRaquete, 10, 300);
}

// function movimentaRaqueteOponente() {
//   if (keyIsDown(87)) {
//     yRaqueteOponente -= 10;
//   }
//   if (keyIsDown(83)) {
//     yRaqueteOponente += 10;
//   }
//      // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
//    yRaqueteOponente = constrain(yRaquete, 10, 300);
// }

function movimentaRaqueteOponente() { 
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30; 
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar
  yRaqueteOponente = constrain(yRaqueteOponente, 10, 300);
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function verificaColisaoRaquete(x, y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXBolinha *= -1;
      raquetada.play();
    }
}
function incluiPlacar(){
  textSize(16);
  stroke(255);
  textAlign(CENTER, CENTER);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170,22 );
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255)
  text(pontosDoOponente, 470,22);
}

function marcaPonto() { 
if (xBolinha > 590) { 
  meusPontos += 1;
  ponto.play();
}
if (xBolinha < 10) { 
  pontosDoOponente += 1;
  ponto.play();
}
}
// evita Bolinha travada atrás da raquete
function evitaBugBolinha(){
  if(xBolinha - raio < 0){
    xBolinha = 15;
  }
  if(xBolinha + raio > 600){
    xBolinha = 580;
  }
}
