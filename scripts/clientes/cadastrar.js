const urlAPI = "https://public.franciscosensaulas.com";
const campoNome = document.getElementById('campoNome');
const campoTelefone = document.getElementById('campoTelefone');
const campoCredito = document.getElementById('campoCredito');

const mascaraCredito = {
    mask: "00000,00"
};
const maskCredito = IMask(campoCredito, mascaraCredito);

const mascaraTelefone = {
    mask: "(00) 00000-0000"
};
const maskTelefone = IMask(campoTelefone, mascaraTelefone);

function validarCampos() {
    let nome = campoNome.value.trim();
    let telefone = campoTelefone.value.trim();
    let credito = campoCredito.value.trim();

    if (!nome) {
        alert("O campo 'Nome' é obrigatório.");
        return false;
    }

    const telefoneRegex = /\(\d{2}\) \d{5}-\d{4}/;
    if (!telefone.match(telefoneRegex)) {
        alert("O telefone deve estar no formato (XX) XXXXX-XXXX.");
        return false;
    }

    const creditoRegex = /^\d{5},\d{2}$/;
    if (!credito.match(creditoRegex)) {
        alert("O crédito deve estar no formato 00000,00.");
        return false;
    }

    return true;
}

async function salvarCliente(evento) {
    evento.preventDefault();

    if (!validarCampos()) {
        return;
    }

    let nome = campoNome.value;
    let telefone = campoTelefone.value;
    let credito = campoCredito.value;

    credito = credito.replace(',', '.');

    const dados = {
        nome: nome,
        telefone: telefone,
        credito: credito
    };

    const urlParaSalvarCliente = `${urlAPI}/api/v1/produtos/clientes`;

    const resposta = await fetch(urlParaSalvarCliente, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dados)
    });

    if (resposta.ok === false) {
        alert("Não foi possível cadastrar o cliente.");
    } else {
        alert("Cliente cadastrado com sucesso!");
        location.href = '/clientes/index.html';
    }
}

document.getElementById("formCliente").addEventListener("submit", function(evento) {
    evento.preventDefault();
    salvarCliente(evento);
});

const botaoSalvar = document.getElementById("btn-salvar");
botaoSalvar.addEventListener("click", function(evento) {
    evento.preventDefault();
    salvarCliente(evento);
});
