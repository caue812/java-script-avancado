const campoNome = document.getElementById('campoNome');
const campoPreco = document.getElementById('campoPreco');
const campoCategotia = document.getElementById('campoCategoria');
const mascara = {
    mask:"00,00"
};
const mask = IMask(campoPreco, mascara);

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const idParaEditar = params.get("id");
const urlAPI = "https://public.franciscosensaulas.com"

async function consultarDadosProdutoPorId(){
    const urlParaConsultarProduto = `${urlAPI}/api/v1/empresa/produtos/${idParaEditar}`
    console.log(urlParaConsultarProduto);

    const resposta = await fetch(urlParaConsultarProduto);

    if(resposta.ok == false){
        alert("Produto não encontrado");
        window.location.href = "/produto/index.html";
        return;
    }

    const dadosProduto = await resposta.json();
    console.log(dadosProduto);

    campoNome.value = dadosProduto.nome;
    campoPreco.value = dadosProduto.preco;
    campoCategotia.value = dadosProduto.categoria;
}

async function editar(evento){
    evento.preventDefault();

    let nome = campoNome.value;
    let preco = campoPreco.value;
    let categoria = campoCategotia.value;

    const dados = {
        nome: nome,
        preco: preco,
        categoria: categoria
    }
    let url = `${urlAPI}/api/v1/empresa/produtos/${idParaEditar}`;
    const resposta = await fetch(url, {
        method: "PUT",
        headers: {"content-type": "application/json" },
        body: JSON.stringify(dados)
    });

    if (resposta.ok == false) {
        alert("Não foi possivel alterar")
    }else{
        location.href = '/produto/index.html';
    }
    
}
const botaoEditar = document.getElementById("botao-alterar");
botaoEditar.addEventListener("click", editar);

consultarDadosProdutoPorId();