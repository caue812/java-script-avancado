document.getElementById("form-cadastrar-atendimento").addEventListener("submit", async function (event) {
    event.preventDefault();

    const cliente = document.getElementById("campoCliente").value;
    const tipoAtendimento = document.getElementById("campoTipoAtendimento").value;
    const atendente = document.getElementById("campoAtendente").value;
    const duracao = document.getElementById("campoDuracao").value;
    const descricao = document.getElementById("campoDescricao").value;

    // Validações
    if (cliente.length < 20 || cliente.length > 30) {
        Swal.fire('Erro', 'O nome do cliente deve ter entre 20 e 30 caracteres.', 'error');
        return;
    }

    if (duracao < 0 || duracao > 1440) {
        Swal.fire('Erro', 'A duração deve ser entre 0 e 1440 minutos.', 'error');
        return;
    }

    if (descricao.length < 100 || descricao.length > 150) {
        Swal.fire('Erro', 'A descrição deve ter entre 100 e 150 caracteres.', 'error');
        return;
    }

    try {
        const response = await fetch('/api/v1/trabalho/atendimentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cliente, tipoAtendimento, atendente, duracao, descricao })
        });

        if (response.ok) {
            Swal.fire('Sucesso', 'Atendimento cadastrado com sucesso!', 'success');
            document.getElementById("form-cadastrar-atendimento").reset();
        } else {
            Swal.fire('Erro', 'Não foi possível cadastrar o atendimento.', 'error');
        }
    } catch (error) {
        Swal.fire('Erro', 'Erro ao cadastrar atendimento.', 'error');
    }
});
