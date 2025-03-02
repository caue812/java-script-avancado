let urlApi = "https://public.franciscosensaulas.com";
const campoPreco = document.getElementById('campoPreco');
const mascara = {
    mask: "00.00"
};
const mask = IMask(campoPreco, mascara);

let botaoSalvar = document.getElementById("btn-salvar");
botaoSalvar.addEventListener('click', salvar);

async function salvar(e) {
    e.preventDefault();
    
    // Obtendo valores dos campos
    let campoNome = document.getElementById("campoNome");
    let nome = campoNome.value;
    
    // Validação do nome
    if (nome.length < 3) {
        alert("Nome deve conter no mínimo 3 caracteres");
        return;
    }

    if (nome.length > 20) {
        alert("Nome deve conter no máximo 20 caracteres");
        return;
    }

    let preco = campoPreco.value;

    // Verificando se o preço está no formato correto
    if (!preco || preco === "00.00" || isNaN(preco.replace(",", "."))) {
        alert("Preço inválido. Por favor, insira um valor válido.");
        return;
    }

    let categoria = document.getElementById("campoCategoria").value; // Capturando categoria

    const dados = {
        nome: nome,
        preco: preco,
        categoria: categoria  // Incluindo categoria nos dados
    };

    let url = `${urlApi}/api/v1/empresa/produtos`;

    try {
        // Enviando requisição para o servidor
        const resposta = await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(dados)
        });

        // Adicionando um log para entender a resposta do servidor
        const respostaTexto = await resposta.text();  // Vamos obter o conteúdo como texto para análise
        console.log('Resposta do servidor:', respostaTexto);  // Isso ajuda a entender o que foi retornado

        // Verificando se a resposta foi bem-sucedida
        if (resposta.ok) {
            // Redireciona para a página de produtos
            location.href = '/produto/index.html';
        } else {
            // Tentando transformar a resposta em JSON, caso a resposta seja um erro
            let errorData;
            try {
                errorData = JSON.parse(respostaTexto); // Tentando fazer o parse do texto como JSON
            } catch (e) {
                errorData = { message: 'Erro desconhecido' }; // Caso não consiga, retornamos uma mensagem padrão
            }

            // Exibindo um alerta caso a resposta seja um erro
            alert(`Erro ao cadastrar produto: ${errorData.message || 'Erro desconhecido'}`);
        }
    } catch (error) {
        // Tratamento de erro no caso de falha na requisição
        console.error('Erro na requisição:', error);
        alert("Não foi possível cadastrar o produto. Tente novamente.");
    }
}