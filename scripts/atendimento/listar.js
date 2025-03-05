document.addEventListener('DOMContentLoaded', () => {
    const tabelaAtendimentos = document.getElementById('tabela-atendimentos').getElementsByTagName('tbody')[0];
    async function carregarAtendimentos() {
        const response = await fetch('/api/v1/trabalho/atendimentos');
        const atendimentos = await response.json();

        atendimentos.forEach(atendimento => {
            const row = tabelaAtendimentos.insertRow();

            row.innerHTML = `
                <td>${atendimento.id}</td>
                <td>${atendimento.cliente}</td>
                <td>${atendimento.tipoAtendimento}</td>
                <td>${atendimento.atendente}</td>
                <td>${atendimento.duracao}</td>
                <td>
                    <a href="editar.html?id=${atendimento.id}" class="btn btn-warning btn-sm">Editar</a>
                    <button class="btn btn-danger btn-sm" onclick="deletarAtendimento(${atendimento.id})">Excluir</button>
                </td>
            `;
        });
    }

    async function deletarAtendimento(id) {
        const resposta = await Swal.fire({
            title: 'Você tem certeza?',
            text: "Isso não pode ser desfeito.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir!',
            cancelButtonText: 'Cancelar'
        });

        if (resposta.isConfirmed) {
            const response = await fetch(`/api/v1/trabalho/atendimentos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                Swal.fire('Excluído!', 'O atendimento foi excluído.', 'success');
                carregarAtendimentos();  
            } else {
                Swal.fire('Erro!', 'Não foi possível excluir o atendimento.', 'error');
            }
        }
    }

    carregarAtendimentos();
});
