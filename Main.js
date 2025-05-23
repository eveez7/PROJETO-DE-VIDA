const botoes = document.querySelectorAll(".botao");
const textos = document.querySelectorAll(".aba-conteudo");

// Datas futuras para cada objetivo
const datasObjetivos = [
    adicionarMeses(new Date(), 6),           // Me formar (6 meses)
    adicionarAnos(new Date(), 2),            // Viajem internacional (2 anos)
    adicionarAnos(new Date(), 2.5),          // Casar (2 ou 3 anos - coloquei 2.5 anos como média)
    adicionarAnos(new Date(), 5),            // Construir uma família (5 anos)
    adicionarMeses(new Date(), 12)           // Aprender novo idioma (12 meses)
];

// Função para adicionar meses
function adicionarMeses(data, meses) {
    const novaData = new Date(data);
    novaData.setMonth(novaData.getMonth() + meses);
    return novaData;
}

// Função para adicionar anos
function adicionarAnos(data, anos) {
    const novaData = new Date(data);
    novaData.setFullYear(novaData.getFullYear() + anos);
    return novaData;
}

// Lógica das abas
botoes.forEach((botao, indice) => {
    botao.addEventListener("click", () => {
        selecionarAba(botao);
        mostrarTexto(indice);
    });
});

function selecionarAba(botao) {
    botoes.forEach(b => b.classList.remove("ativo"));
    botao.classList.add("ativo");
}

function mostrarTexto(indice) {
    textos.forEach(t => t.classList.remove("ativo"));
    textos[indice].classList.add("ativo");
}

// Contadores individuais
function atualizarContadores() {
    let totalDias = 0;

    datasObjetivos.forEach((dataAlvo, indice) => {
        const agora = new Date();
        const diferenca = dataAlvo - agora;

        if (diferenca < 0) {
            document.getElementById(`dias${indice}`).innerText = 0;
            document.getElementById(`horas${indice}`).innerText = 0;
            document.getElementById(`min${indice}`).innerText = 0;
            document.getElementById(`seg${indice}`).innerText = 0;
            return;
        }

        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
        const segundos = Math.floor((diferenca / 1000) % 60);

        totalDias += dias;

        document.getElementById(`dias${indice}`).innerText = dias;
        document.getElementById(`horas${indice}`).innerText = horas;
        document.getElementById(`min${indice}`).innerText = minutos;
        document.getElementById(`seg${indice}`).innerText = segundos;
    });

    document.getElementById("total-dias").innerText = totalDias;
}

// Atualiza os contadores a cada segundo
setInterval(atualizarContadores, 1000);

// Zoom (A+ A-)
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');

zoomInBtn.addEventListener('click', () => {
    document.body.style.fontSize = 'larger';
});

zoomOutBtn.addEventListener('click', () => {
    document.body.style.fontSize = 'smaller';
});