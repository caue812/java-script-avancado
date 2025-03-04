
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


async function salvarCliente(evento) {
    evento.preventDefault(); 

    let nome = campoNome.value;
    let telefone = campoTelefone.value;
    let credito = campoCredito.value;

   
    credito = credito.replace(',', '.');

    const dados = {
        nome: nome,
        telefone: telefone,
        credito: credito
    };

    const urlParaSalvarCliente = `${urlAPI}/api/v1/empresa/produtos/clientes`;
    
    const resposta = await fetch(urlParaSalvarCliente, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dados)
    });

    if (resposta.ok === false) {
        alert("Não foi possível cadastrar o cliente.");
    } else {
        location.href = '/clientes/index.html';
    }
}


document.getElementById("formCliente").addEventListener("submit", function(evento) {
    evento.preventDefault();  

    const nome = campoNome.value;
    const telefone = campoTelefone.value;
    const credito = campoCredito.value;

    salvarCliente(evento);  
});


const botaoSalvar = document.getElementById("btn-salvar");
botaoSalvar.addEventListener("click", function(evento) {
    evento.preventDefault();  
    salvarCliente(evento); 
});
