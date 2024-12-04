document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    // Create
    document.addEventListener("click", async (event) => {
        const addUserBtn = event.target.closest("#addUserBtn");
        if(addUserBtn){
            try {
                const url = '/users/add';
                window.history.pushState({}, '', url);
    
                const response = await fetch('/users/add');
                if(!response.ok) throw new Error("Erro ao carregar o formulário.");
                const formHTML = await response.text();
                content.innerHTML = formHTML;

                const [storesResponse, rolesResponse] = await Promise.all([
                    fetch('/api/store/list'),
                    fetch('/api/profiles/list')
                ]);
    
                if(!storesResponse.ok || !rolesResponse.ok) throw new Error("Erro ao carregar dados de lojas ou perfis.");
    
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
    
                        if(saveResponse.ok){
                            showModal('Sucesso', 'Usuário cadastrado com sucesso!');
                            const response = await fetch('/users/page');
                            if (!response.ok) throw new Error("Erro ao carregar a lista de usuários.");
                            const usersHTML = await response.text();
                            content.innerHTML = usersHTML;
                        } else {
                            const errorData = await saveResponse.json();
                            showModal('Erro', `Erro ao cadastrar usuário: ${errorData.message || "Erro desconhecido."}`);
                        }
                    } catch(error) {
                        console.error("Erro ao cadastrar usuário:", error);
                        showModal('Erro', "Erro inesperado ao cadastrar usuário.");
                    }
                });
            } catch(error) {
                console.error("Erro ao carregar o formulário:", error);
                showModal('Erro', "Erro ao carregar o formulário de cadastro.");
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
    
                if(response.ok){
                    const tableHTML = await response.text();
                    const tableBody = document.querySelector("table tbody");
                    tableBody ? tableBody.innerHTML = tableHTML : console.error("Tabela de usuários não encontrada.");
                } else if(response.status === 404) {
                    showModal('Aviso', registration ? 'Usuário não encontrado.' : 'Nenhum usuário disponível.');
                } else {
                    showModal('Erro', 'Erro ao buscar usuários.');
                }
            } catch(error) {
                console.error('Erro ao buscar usuários:', error);
                showModal('Erro', 'Erro inesperado ao buscar usuários.');
            }
        }
    });

    // Update
    document.addEventListener("click", async (event) => {
        const editUserBtn = event.target.closest(".editar");
        if(editUserBtn){
            const registration = editUserBtn.dataset.registration;
    
            const url = `/users/edit/${registration}`;
            window.history.pushState({}, '', url);
    
            try {
                const response = await fetch(url);
                if(response.ok){
                    document.getElementById("content").innerHTML = await response.text();
                    const userForm = document.getElementById("userForm");

                    userForm.addEventListener("submit", async (e) => {
                        e.preventDefault();
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

                        try {
                            const saveResponse = await fetch(`/api/users/edit/${registration}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(payload),
                            });
    
                            if(saveResponse.ok){
                                showModal('Sucesso', 'Usuário atualizado com sucesso!');
                                const usersResponse = await fetch('/users/page');
                                if (!usersResponse.ok) throw new Error("Erro ao carregar a lista de usuários.");
                                document.getElementById("content").innerHTML = await usersResponse.text();
                            } else {
                                const errorDetails = await saveResponse.json();
                                showModal('Erro', `Erro ao atualizar usuário: ${errorDetails.message || 'Erro desconhecido.'}`);
                            }
                        } catch(error) {
                            console.error("Erro ao salvar alterações:", error);
                            showModal('Erro', "Erro ao atualizar o usuário.");
                        }
                    });
                } else {
                    throw new Error("Erro ao carregar o formulário de edição.");
                }
            } catch(error) {
                console.error("Erro ao carregar o formulário de edição:", error);
                showModal('Erro', "Não foi possível carregar o formulário de edição.");
            }
        }
    });

    // Delete
    document.addEventListener("click", async (event) => {
        const deleteUserBtn = event.target.closest(".deletar");
        if(deleteUserBtn){
            const registration = deleteUserBtn.dataset.registration;
            showModal('Confirmação', 'Tem certeza que deseja deletar este usuário?', async () => {
                try {
                    const response = await fetch(`/api/users/delete/${registration}`, {
                        method: 'DELETE',
                    });
    
                    if(response.ok){
                        showModal('Sucesso', 'Usuário deletado com sucesso!');
                        const usersResponse = await fetch('/users/page');
                        content.innerHTML = await usersResponse.text();
                    } else {
                        showModal('Erro', 'Erro ao deletar usuário.');
                    }
                } catch(error) {
                    console.error('Erro ao deletar usuário:', error);
                    showModal('Erro', 'Erro inesperado ao deletar usuário.');
                }
            });
        }
    });    
});
