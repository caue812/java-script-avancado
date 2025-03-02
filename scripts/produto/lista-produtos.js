let tabelaProdutos = document.getElementById("tabela-produtos");
let botaoConsultarProdutos = document.getElementById("consultar-produtos");

let urlApi = "https://public.franciscosensaulas.com"
function atribuirCliqueBotoesApagar() {
    let botoesApagar = document.getElementsByClassName("botao-apagar");
    Array.from(botoesApagar).forEach((botao) => {
        botao.addEventListener('click', apagar);
    });
}

function apagar(evento) {
      

    const botaoClique = evento.target;


    const nome = botaoClique.getAttribute("data-nome");
    const id = botaoClique.getAttribute("data-id");

    Swal.fire({
        title: `Deseja apagar o cadastro do produto '${nome}'?`,
        text: "Você não poderá reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim apagar!",
        cancelButtonText: "Não",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            apagarProduto(id);
        }
    });
}

async function apagarProduto(id) {
    let url = `${urlApi}/api/v1/empresa/produtos/${id}`
    console.log(url)

    const resposta = await fetch(url, {method: "DELETE"});
    if(resposta.ok == false){
        alert("Não foi possível apagar");
        return;
    }

    Swal.fire({
        title: "Apagado!",
        text: "Produto removido com sucesso!",
        icon: "success"
    });
    ConsultarProdutos();
    
}

async function ConsultarProdutos() {
    let url = `${urlApi}/api/v1/empresa/produtos`
    const resposta = await fetch(url);

    if(resposta.ok == false){
        alert("Não foi possivel carregar os dados")
    }
    const produtos = await resposta.json();

    let tbody = tabelaProdutos.querySelector("tbody");
    tbody.innerHTML = "";

    produtos.forEach(produto => {

        const colunas = `   
        <td>${produto.id}</td>
        <td>${produto.nome}</td>
          <td>${produto.categoria}</td>
        <td>${produto.preco}</td>
    
        <td>
        <a href="editar.html?id=${produto.id}" class="btn btn-warning"><i class="fas fa-pencil"></i> Editar</a>
        <button class="btn btn-danger botao-apagar" data-id=${produto.id}  data-nome=${produto.nome}><i class="fas fa-trash"></i> Apagar</button>
        </td>`
        const linha = document.createElement("tr");
        linha.innerHTML = colunas;

        tbody.appendChild(linha);

        console.log(produto);
    });
    atribuirCliqueBotoesApagar()
}

botaoConsultarProdutos.addEventListener("click", ConsultarProdutos);

ConsultarProdutos();