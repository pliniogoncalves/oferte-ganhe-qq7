document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    // Função genérica para exibir modal de mensagens
    function exibirModalMensagem(titulo, mensagem, tipo = 'info') {
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        modalTitle.innerText = titulo;
        modalMessage.innerText = mensagem;

        const modal = new bootstrap.Modal(document.getElementById('mensagemModal'));
        modal.show();
    }

    // Função para exibir modal de confirmação
    function exibirModalConfirmacao(mensagem, callback) {
        const confirmMessage = document.getElementById('confirmMessage');
        confirmMessage.innerText = mensagem;

        const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
        confirmModal.show();

        document.getElementById('confirmYes').onclick = () => {
            confirmModal.hide();
            callback(true);
        };
        document.getElementById('confirmNo').onclick = () => {
            confirmModal.hide();
            callback(false);
        };
    }

    // Create
    document.addEventListener("click", async (event) => {
        const addUserBtn = event.target.closest("#addUserBtn");
        if (addUserBtn) {
            try {
                const url = '/users/add';
                window.history.pushState({}, '', url);

                const response = await fetch('/users/add');
                if (!response.ok) throw new Error("Erro ao carregar o formulário.");

                content.innerHTML = await response.text();

                const [storesResponse, rolesResponse] = await Promise.all([
                    fetch('/api/store/list'),
                    fetch('/api/profiles/list')
                ]);

                if (!storesResponse.ok || !rolesResponse.ok) {
                    throw new Error("Erro ao carregar dados de lojas ou perfis.");
                }

                const stores = await storesResponse.json();
                const roles = await rolesResponse.json();

                const storeSelect = document.getElementById("store");
                stores.forEach(store => {
                    const option = document.createElement("option");
                    option.value = store.number_store;
                    option.textContent = store.number_store;
                    storeSelect.appendChild(option);
                });

                const profileSelect = document.getElementById("profile");
                roles.forEach(profile => {
                    const option = document.createElement("option");
                    option.value = profile.name_profile;
                    option.textContent = profile.name_profile;
                    profileSelect.appendChild(option);
                });

                const userForm = document.getElementById("userForm");
                userForm.addEventListener("submit", async (e) => {
                    e.preventDefault();

                    const formData = new FormData(userForm);
                    const data = Object.fromEntries(formData.entries());

                    try {
                        const saveResponse = await fetch('/api/users/register/', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data)
                        });

                        if (saveResponse.ok) {
                            exibirModalMensagem('Sucesso', 'Usuário cadastrado com sucesso!');
                            const response = await fetch('/users/page');
                            if (!response.ok) throw new Error("Erro ao carregar a lista de usuários.");
                            content.innerHTML = await response.text();
                        } else {
                            const errorData = await saveResponse.json();
                            exibirModalMensagem('Erro', `Erro ao cadastrar usuário: ${errorData.message || "Erro desconhecido."}`);
                        }
                    } catch (error) {
                        console.error("Erro ao cadastrar usuário:", error);
                        exibirModalMensagem('Erro', "Erro inesperado ao cadastrar usuário.");
                    }
                });
            } catch (error) {
                console.error("Erro ao carregar o formulário:", error);
                exibirModalMensagem('Erro', "Erro ao carregar o formulário de cadastro.");
            }
        }
    });

    // Read
    document.addEventListener("click", async (event) => {
        if (event.target.closest("#searchBtn")) {
            const searchInput = document.getElementById("search");
            const registration = searchInput?.value.trim();

            try {
                const response = registration 
                    ? await fetch(`/users/search?registration=${encodeURIComponent(registration)}`) 
                    : await fetch(`/users/list`);

                if (response.ok) {
                    const tableHTML = await response.text();
                    const tableBody = document.querySelector("table tbody");
                    tableBody ? (tableBody.innerHTML = tableHTML) : console.error("Tabela de usuários não encontrada.");
                } else if (response.status === 404) {
                    exibirModalMensagem('Atenção', registration ? 'Usuário não encontrado.' : 'Nenhum usuário disponível.');
                } else {
                    exibirModalMensagem('Erro', 'Erro ao buscar usuários.');
                }
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                exibirModalMensagem('Erro', 'Erro inesperado ao buscar usuários.');
            }
        }
    });

    // Update
    document.addEventListener("click", async (event) => {
        const editUserBtn = event.target.closest(".editar");
        if (editUserBtn) {
            const registration = editUserBtn.dataset.registration;
            const url = `/users/edit/${registration}`;
            window.history.pushState({}, '', url);

            try {
                const response = await fetch(`/users/edit/${registration}`);
                if (response.ok) {
                    content.innerHTML = await response.text();

                    const userForm = document.getElementById("userForm");
                    userForm.addEventListener("submit", async (e) => {
                        e.preventDefault();

                        try {
                            const formData = new FormData(userForm);
                            const data = Object.fromEntries(formData.entries());

                            const payload = {
                                name: data.name,
                                newRegistration: data.registration,
                                email: data.email,
                                password: data.password,
                                profile: data.profile,
                                store: data.store,
                            };

                            const saveResponse = await fetch(`/api/users/edit/${registration}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(payload),
                            });

                            if (saveResponse.ok) {
                                exibirModalMensagem('Sucesso', 'Usuário atualizado com sucesso!');
                                const usersResponse = await fetch('/users/page');
                                content.innerHTML = await usersResponse.text();
                            } else {
                                const errorDetails = await saveResponse.json();
                                exibirModalMensagem('Erro', `Erro ao atualizar usuário: ${errorDetails.message || 'Erro desconhecido.'}`);
                            }
                        } catch (error) {
                            console.error("Erro ao salvar as alterações:", error);
                            exibirModalMensagem('Erro', "Erro ao atualizar o usuário.");
                        }
                    });
                } else {
                    throw new Error("Erro ao carregar o formulário de edição.");
                }
            } catch (error) {
                console.error("Erro ao carregar o formulário de edição:", error);
                exibirModalMensagem('Erro', "Não foi possível carregar o formulário de edição.");
            }
        }
    });

    // Delete
    document.addEventListener("click", async (event) => {
        const deleteUserBtn = event.target.closest(".deletar");
        if (deleteUserBtn) {
            const registration = deleteUserBtn.dataset.registration;
            exibirModalConfirmacao('Tem certeza que deseja deletar este usuário?', async (confirmado) => {
                if (confirmado) {
                    try {
                        const response = await fetch(`/api/users/delete/${registration}`, {
                            method: 'DELETE',
                        });

                        if (response.ok) {
                            exibirModalMensagem('Sucesso', 'Usuário deletado com sucesso!');
                            const usersResponse = await fetch('/users/page');
                            content.innerHTML = await usersResponse.text();
                        } else {
                            exibirModalMensagem('Erro', 'Erro ao deletar usuário.');
                        }
                    } catch (error) {
                        console.error('Erro ao deletar usuário:', error);
                        exibirModalMensagem('Erro', 'Erro inesperado ao deletar usuário.');
                    }
                }
            });
        }
    });
});
