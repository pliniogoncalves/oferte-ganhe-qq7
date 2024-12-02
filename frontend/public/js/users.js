// Adicionar usuário
document.getElementById('addUserBtn').addEventListener('click', () => {
    document.getElementById('userForm').reset();
    document.getElementById('userModalLabel').textContent = 'Adicionar Usuário';
    document.getElementById('userId').value = '';
    userModal.show();
});

// Editar usuário
document.querySelectorAll('.editar').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        fetch(`/usuarios/${id}`) // Rota para buscar os dados do usuário
            .then(res => res.json())
            .then(data => {
                document.getElementById('userId').value = data.id;
                document.getElementById('userName').value = data.nome;
                document.getElementById('userRole').value = data.funcao;
                document.getElementById('userStore').value = data.loja;
                document.getElementById('userEmail').value = data.email;
                document.getElementById('userModalLabel').textContent = 'Editar Usuário';
                userModal.show();
            });
    });
});

// Deletar usuário
document.querySelectorAll('.deletar').forEach(btn => {
    btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (confirm('Deseja realmente excluir este usuário?')) {
            fetch(`/usuarios/${id}`, { method: 'DELETE' })
                .then(res => res.json())
                .then(() => location.reload());
        }
    });
});

// Submissão do formulário (Adicionar/Editar)
document.getElementById('userForm').addEventListener('submit', e => {
    e.preventDefault();
    const id = document.getElementById('userId').value;
    const url = id ? `/usuarios/${id}` : '/usuarios';
    const method = id ? 'PUT' : 'POST';

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json())
      .then(() => location.reload());
});
