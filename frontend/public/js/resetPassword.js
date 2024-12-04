document.getElementById('formRedefinirSenha').addEventListener('submit', async function (e) {
    e.preventDefault();

    const newPassword = document.getElementById('newPassword').value;
    const token = document.getElementById('token').value;
    const feedback = document.getElementById('feedbackRedefinirSenha');

    try{
        const response = await fetch('/api/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword }),
        });

        const data = await response.json();

        if(response.ok){
            feedback.classList.remove('d-none', 'alert-danger');
            feedback.classList.add('alert-success');
            feedback.textContent = 'Senha redefinida com sucesso! Você já pode fazer login.';
        }else{
            throw new Error(data.message);
        }
    }catch(error){
        feedback.classList.remove('d-none', 'alert-success');
        feedback.classList.add('alert-danger');
        feedback.textContent = `Erro: ${error.message}`;
    }
});
