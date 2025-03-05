document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const atendimentoId = urlParams.get('id');

    const response = await fetch(`/api/v1/trabalho/atendimentos/${atendimentoId}`);
    const atendimento = await response.json();

    if (!atendimento) {
        Swal.fire('Erro', 'Atendimento não encontrado!', 'error');
        return;
    }

    document.getElementById("campoId").value = atendimento.id;
    document.getElementById("campoCliente").value = atendimento.cliente;
    document.getElementById("campoTipoAtendimento").value = atendimento.tipoAtendimento;
    document.getElementById("campoAtendente").value = atendimento.atendente;
    document.getElementById("campoDuracao").value = atendimento.duracao;
    document.getElementById("campoDescricao").value = atendimento.descricao;

    document.getElementById("form-editar-atendimento").addEventListener("submit", async function (event) {
        event.preventDefault();

        const cliente = document.getElementById("campoCliente").value;
        const tipoAtendimento = document.getElementById("campoTipoAtendimento").value;
        const atendente = document.getElementById("campoAtendente").value;
        const duracao = document.getElementById("campoDuracao").value;
        const descricao = document.getElementById("campoDescricao").value;

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
            const response = await fetch(`/api/v1/trabalho/atendimentos/${atendimentoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cliente, tipoAtendimento, atendente, duracao, descricao })
            });

            if (response.ok) {
                Swal.fire('Sucesso', 'Atendimento atualizado com sucesso!', 'success');
                window.location.href = 'index.html';
            } else {
                Swal.fire('Erro', 'Não foi possível atualizar o atendimento.', 'error');
            }
        } catch (error) {
            Swal.fire('Erro', 'Erro ao atualizar atendimento.', 'error');
        }
    });
});










