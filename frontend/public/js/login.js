// Lógica para envio do formulário de login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const matricula = document.getElementById('matricula').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matricula, senha }),
        });

        if (response.ok) {
            window.location.href = '/main';
        } else {
            const data = await response.json();
            exibirModalLoginMensagem('Erro', data.message || 'Falha no login.');
        }
    } catch (error) {
        console.error('Login error:', error);
        exibirModalLoginMensagem('Erro', 'Ocorreu um erro ao tentar fazer login.');
    }
});

// Lógica para envio do formulário de "Esqueci a senha"
document.getElementById('formEsqueciSenha').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('emailRecuperacao').value;

    try{
        const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if(response.ok){
            exibirModalLoginMensagem('Sucesso', 'Um e-mail de recuperação foi enviado para o endereço informado.');
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalEsqueciSenha'));
            modal.hide();
        }else{
            const data = await response.json();
            exibirModalLoginMensagem('Erro', data.message || 'Falha ao solicitar recuperação de senha.');
        }
    }catch(error){
        console.error('Erro na recuperação de senha:', error);
        exibirModalLoginMensagem('Erro', 'Ocorreu um erro ao tentar recuperar a senha.');
    }
});

