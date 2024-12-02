document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    // Delegação de eventos para carregar o formulário de cadastro
    document.addEventListener("click", async (event) => {
        if (event.target.closest("#addUserBtn")) {
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
        }
    });

    // Delegação de eventos para buscar usuário por matrícula
    document.addEventListener("click", async (event) => {
        if (event.target.closest("#searchBtn")) {
            const searchInput = document.getElementById("search");
            const registration = searchInput?.value.trim();

            if (!registration) {
                alert('Por favor, insira uma matrícula para buscar.');
                return;
            }

            try {
                const response = await fetch(`/users/search?registration=${encodeURIComponent(registration)}`);
                if (response.ok) {
                    const tableHTML = await response.text();
                    const tableBody = document.querySelector("table tbody");
                    if (tableBody) {
                        tableBody.innerHTML = tableHTML;
                    } else {
                        console.error("Tabela de usuários não encontrada.");
                    }
                } else if (response.status === 404) {
                    alert('Usuário não encontrado.');
                } else {
                    alert('Erro ao buscar usuário.');
                }
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        }
    });
});
