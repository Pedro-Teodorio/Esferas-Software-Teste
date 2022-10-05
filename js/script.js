const display_timer = document.getElementById("display-timer"); //! Display do Timer
const btn_start_timer = document.getElementById("btn-start-timer"); //! Botão de Iniciar o Timer
const btn_stop_timer = document.getElementById("btn-stop-timer"); //! Botão de Cancelar o Timer

let interval; //! Variavel de Definição do Timer
let pause = false; //! Variavel de verificação da Pausa
let totalSeconds = 0; //! Variavel de total de segundos
let bell = new Audio("/audio/audio_bell.mp3"); //! Variavel que cria um objeto de audio
let keyPressCount = 0; //! Variavel de verificação de precionamento de tecla
let clickCount = 0; //! Variavel de verificação de click

init();
//circle start
let progressBar = document.querySelector(".e-c-progress");
let indicator = document.getElementById("e-indicator");
let pointer = document.getElementById("e-pointer");
let length = Math.PI * 2 * 100; //! Tamanho de 100% da barra de progresso do circulo.
progressBar.style.strokeDasharray = length;
// ? Função que atualiza o Circulo
function updateCircle(value, timePercent) {
  let offset = length - (length * value) / timePercent;
  progressBar.style.strokeDashoffset = offset;
  pointer.style.transform = `rotate(${(360 * value) / timePercent}deg)`;
}
// ? Função que Inicializadora
function init() {
  btn_stop_timer.style.display = "none"; //! Esconde o botão de Cancelar
  // ? Adiciona um evento ao botão de iniciar
  btn_start_timer.addEventListener("click", () => {
    clickCount++;
    if (clickCount === 1) {
      let valueTimer = display_timer.value; //! Valor do display em formato de string
      startTimer(setTotalSeconds(valueTimer)); //! Chama a função startTImer que passa a Função setTotalSeconds
      btn_start_timer.innerHTML = `<em class="bi bi-pause-fill bg-transparent text-center fs-3"></em>`; //! Muda Icone para pause
      pause = false;
    } else {
      pause = !pause; // ! Inverte o valor de pause
      if (pause) {
        // ! Verifica o valor de pause
        btn_start_timer.innerHTML = `<em class="bi bi-play-fill bg-transparent text-center fs-3"></em>`; //! Muda Icone para play
      } else {
        btn_start_timer.innerHTML = `<em class="bi bi-pause-fill bg-transparent text-center fs-3"></em>`; //! Muda Icone para pause
      }
    }
    display_timer.disabled = true; //! Desativa o display para não ocorrer edição
    btn_stop_timer.style.display = ""; //! Esconde o botão de Cancelar
    keyPressCount = 1;
  });
  // ? Adiciona um evento ao botão de Cancelar
  btn_stop_timer.addEventListener("click", () => {
    interval = clearInterval(interval); // ! Pausa o Valor do Timer
    display_timer.value = "00:00:00"; //! Valor do display em formato de string
    display_timer.disabled = false; //! Ativa o display para nedição
    btn_stop_timer.style.display = "none"; //! Esconde o botão de Cancelar
    keyPressCount = 0; //! Zera a variavel keyPressCount
    clickCount = 0; //! Zera a variavel clickCount
    btn_start_timer.innerHTML = `<em class="bi bi-play-fill bg-transparent text-center fs-3"></em>`; //! Muda Icone para play
  });
}
// ? Função que faz o calculo dos segundos totais do meu Timer
function setTotalSeconds(data) {
  let timer = data.split(":"); //! Transforma em array.
  let [hours, minutes, seconds] = timer; //! Desestrutura o array em 3 variveis.
  totalSeconds =
    parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds); //! Faz o calculo do total de segundos.
  return totalSeconds; //! Retorna o total de segundos.
}
// ? Função que inicializadora do Timer
function startTimer(seconds) {
  interval = setInterval(() => {
    if (pause) return; //! Verifica se o pause e verdadeiro
    seconds--; //! Decrementa os segundos a cada 1 segundo.
    updateDisplay(seconds); //! Chama a Função que atualiza o Timer.
    updateCircle(seconds, totalSeconds); //! Chama a Função que atualiza o Circulo

    //! Verifica se o timer é igual a zero
    if (seconds <= 0) {
      interval = clearInterval(interval); // ! Pausa o Valor do Timer em 0
      display_timer.disabled = false; //! Ativa o display para nedição
      btn_stop_timer.style.display = "none"; //! Esconde o botão de Cancelar
      btn_start_timer.innerHTML = `<em class="bi bi-play-fill bg-transparent text-center fs-3"></em>`; //! Muda Icone para play
      bell.play(); // ! Toca o Alarme
      keyPressCount = 0; //! Zera a variavel keyPressCount
      clickCount = 0; //! Zera a variavel clickCount
    }
  }, 1000);
}
//? Função que atualiza o Timer
function updateDisplay(totalSeconds) {
  let hours = Math.floor(totalSeconds / 3600) % 24; //! Conversão de segundos em horas.
  let minutes = Math.floor(totalSeconds / 60) % 60; //! Conversão de segundos em minutos.
  let seconds = totalSeconds % 60; //! Definindo os segundos.

  hours = hours < 10 ? `0${hours}` : hours; //! Verifica se a hora é menor que 10 e adiciona um 0 a esquerda.
  minutes = minutes < 10 ? `0${minutes}` : minutes; //! Verifica se o minuto é menor que 10 e adiciona um 0 a esquerda.
  seconds = seconds < 10 ? `0${seconds}` : seconds; //! Verifica se a segundo é menor que 10 e adiciona um 0 a esquerda.
  display_timer.value = `${hours}:${minutes}:${seconds}`; //!Atualiza o display do timer.
}

//  ? Adiciona o evento pressionamento de tecla na página
document.addEventListener("keypress", (event) => {
  const keyName = event.key; //! Variavel que captura a tecla pressionada
  if (keyName === "i") {
    keyPressCount++;
    if (keyPressCount === 1) {
      btn_start_timer.click(); //! Aciona o botão que inicia o timer
      btn_start_timer.innerHTML = `<em class="bi bi-pause-fill bg-transparent text-center fs-3"></em>`; //! Muda Icone para pause
      pause = false; //! Muda a variavel pause para false
    } else {
      pause = false; //! Muda a variavel pause para false
      btn_start_timer.innerHTML = `<em class="bi bi-pause-fill bg-transparent text-center fs-3"></em>`; //! Muda Icone para pause
    }
  } else if (keyName === "p") {
    btn_start_timer.innerHTML = `<em class="bi bi-play-fill bg-transparent text-center fs-3"></em>`; //! Muda Icone para play
    pause = true; //! Muda a variavel pause para True
  }
});
