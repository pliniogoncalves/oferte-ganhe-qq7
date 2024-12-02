document.addEventListener("DOMContentLoaded", () => {
    const addUserBtn = document.getElementById("addUserBtn");
    const content = document.getElementById("content");

    // Carregar o formulário de cadastro
    addUserBtn?.addEventListener("click", async () => {
        try {
            const response = await fetch('/users/add');
            const formHTML = await response.text();
            content.innerHTML = formHTML;

            // Adicionar evento ao botão de cancelar
            const cancelBtn = document.getElementById("cancelBtn");
            cancelBtn.addEventListener("click", async () => {
                const response = await fetch('/users/page');
                const usersHTML = await response.text();
                content.innerHTML = usersHTML;
            });

            // Evento do formulário de submissão
            const userForm = document.getElementById("userForm");
            userForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const formData = new FormData(userForm);
                const data = Object.fromEntries(formData.entries());

                const saveResponse = await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (saveResponse.ok) {
                    alert('Usuário cadastrado com sucesso!');
                    const response = await fetch('/users/page');
                    const usersHTML = await response.text();
                    content.innerHTML = usersHTML;
                } else {
                    alert('Erro ao cadastrar usuário.');
                }
            });
        } catch (error) {
            console.error("Erro ao carregar o formulário:", error);
        }
    });
});
