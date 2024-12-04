document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const matricula = document.getElementById('matricula').value;
    const senha = document.getElementById('senha').value;

    try{
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ matricula, senha }),
        });

        if(response.ok){
            window.location.href = '/main';
        }else{
            const data = await response.json();
            showModal('Erro', data.message || 'Falha no login.');
        }
    }catch(error){
        console.error('Login error:', error);
        showModal('Erro', 'Ocorreu um erro ao tentar fazer login.');
    }
});

document.getElementById('formEsqueciSenha').addEventListener('submit', async (e) => {
    e.preventDefault();

    console.log("Arquivo login.js carregado.");

    const email = document.getElementById('emailRecuperacao').value;
    console.log('Formulário enviado. Email:', email);

    try{
        const response = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if(response.ok){
            showModal('Sucesso', 'Um e-mail de recuperação foi enviado para o endereço informado.');
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalEsqueciSenha'));
            modal.hide();
        }else{
            showModal('Erro', data.message || 'Falha ao solicitar recuperação de senha.');
        }
    }catch(error){
        console.error('Erro na recuperação de senha:', error);
        showModal('Erro', 'Ocorreu um erro ao tentar recuperar a senha.');
    }
});

