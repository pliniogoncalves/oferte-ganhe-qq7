document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/logout', { method: 'POST' });

        if (response.ok) {
            window.location.href = '/login';
        } else {
            exibirModalMensagem('Erro', 'Falha ao fazer logout.');
        }
    } catch (error) {
        console.error('Logout error:', error);
        exibirModalMensagem('Erro', 'Ocorreu um erro ao tentar fazer logout.');
    }
});

/**
 * Exibe o modal de mensagens.
 * @param {string} titulo - Título da mensagem.
 * @param {string} mensagem - Conteúdo da mensagem.
 */
function exibirModalMensagem(titulo, mensagem) {
    document.getElementById('modalTitle').innerText = titulo;
    document.getElementById('modalMessage').innerText = mensagem;
    const modal = new bootstrap.Modal(document.getElementById('mensagemModal'));
    modal.show();
}
