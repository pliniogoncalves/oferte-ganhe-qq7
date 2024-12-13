document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", async (event) => {
        const editPasswordBtn = event.target.closest(".editPassword");
        if (editPasswordBtn) {
            const registration = editPasswordBtn.dataset.registration;
            const url = `/config/password/${registration}`;
            window.history.pushState({}, '', url);

            try{
                const response = await fetch(url);
                if(response.ok){
                    document.getElementById("content").innerHTML = await response.text();
                    
                    const passwordForm = document.getElementById("passwordForm");
                    passwordForm.addEventListener("submit", async (e) => {
                        e.preventDefault();
                        const formData = new FormData(passwordForm);
                        const data = Object.fromEntries(formData.entries());

                        if(data.newPassword !== data.confirmPassword){
                            showModal('Erro', 'As senhas não coincidem.');
                            return;
                        }

                        try{
                            const saveResponse = await fetch(`/api/users/password/${registration}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(data),
                            });

                            if(saveResponse.ok){
                                showModal('Sucesso', 'Senha atualizada com sucesso!');
                            }else{
                                const errorDetails = await saveResponse.json();
                                showModal('Erro', `Erro ao atualizar senha: ${errorDetails.message || 'Erro desconhecido.'}`);
                            }
                        }catch(error){
                            console.error("Erro ao atualizar senha:", error);
                            showModal('Erro', 'Erro ao atualizar a senha.');
                        }
                    });
                }else{
                    throw new Error('Erro ao carregar a página de alteração de senha.');
                }
            }catch(error){
                console.error('Erro ao carregar página de alteração de senha:', error);
                showModal('Erro', 'Não foi possível carregar a página.');
            }
        }
    });
});
