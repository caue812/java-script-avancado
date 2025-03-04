const urlAPI = "https://public.franciscosensaulas.com";
const campoNome = document.getElementById('campoNome');
const campoTelefone = document.getElementById('campoTelefone');
const campoCredito = document.getElementById('campoCredito');

// Máscara para o campo de crédito (com vírgula)
const mascaraCredito = {
    mask: "00000,00"
};
const maskCredito = IMask(campoCredito, mascaraCredito);

// Máscara para o campo de telefone (formato (XX) XXXXX-XXXX)
const mascaraTelefone = {
    mask: "(00) 00000-0000"
};
const maskTelefone = IMask(campoTelefone, mascaraTelefone);

// Pegando o id do cliente a partir da URL
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idParaEditar = params.get("id");


// Função para consultar os dados do cliente e preenchê-los no formulário
async function consultarDadosClientePorId() {
    const urlParaConsultarCliente = `${urlAPI}/api/v1/produtos/clientes/${idParaEditar}`;
    
    const resposta = await fetch(urlParaConsultarCliente);

    if (resposta.ok === false) {
        alert("Cliente não encontrado");
        window.location.href = "/clientes/index.html";
        return;
    }

    const dadosCliente = await resposta.json();

    // Preenchendo os campos do formulário com os dados do cliente
    campoNome.value = dadosCliente.nome;
    campoTelefone.value = dadosCliente.telefone;
    campoCredito.value = dadosCliente.credito;
}

// Função para editar os dados do cliente
async function editar(evento) {
    evento.preventDefault();

    let nome = campoNome.value;
    let telefone = campoTelefone.value;
    let credito = campoCredito.value;

    // Remover a vírgula do valor de crédito e substituí-la por ponto para envio correto
    credito = credito.replace(',', '.');

    const dados = {
        nome: nome,
        telefone: telefone,
        credito: credito
    };

    const urlParaEditarCliente = `${urlAPI}/api/v1/empresa/produtos/clientes/${idParaEditar}`;
    
    const resposta = await fetch(urlParaEditarCliente, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dados)
    });

    if (resposta.ok === false) {
        alert("Não foi possível alterar");
    } else {
        location.href = '/clientes/index.html';
    }
}

// Adicionando o evento de click no botão de edição
const botaoEditar = document.getElementById("btn-alterar");
botaoEditar.addEventListener("click", editar);

// Carregar os dados do cliente assim que a página for carregada
consultarDadosClientePorId();
