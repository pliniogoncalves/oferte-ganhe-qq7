document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    //Create
    document.addEventListener("click", async (event) => {
        const addUserBtn = event.target.closest("#addUserBtn");
        if(addUserBtn){
            try{
                const url = '/users/add';
                window.history.pushState({}, '', url);

                const response = await fetch('/users/add');
                const formHTML = await response.text();
                content.innerHTML = formHTML;
    
                const [storesResponse, rolesResponse] = await Promise.all([
                    fetch('/api/store/list'),
                    fetch('/api/profiles/list')
                ]);
    
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
    
                const cancelBtn = document.getElementById("cancelBtn");
                cancelBtn.addEventListener("click", async () => {
                    const response = await fetch('/users/page');
                    const usersHTML = await response.text();
                    content.innerHTML = usersHTML;
                });
    
                const userForm = document.getElementById("userForm");
                userForm.addEventListener("submit", async (e) => {
                    e.preventDefault();
                    const formData = new FormData(userForm);
                    const data = Object.fromEntries(formData.entries());
    
                    const saveResponse = await fetch('/api/users/register/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    });
    
                    if(saveResponse.ok){
                        alert('Usuário cadastrado com sucesso!');
                        const response = await fetch('/users/page');
                        const usersHTML = await response.text();
                        content.innerHTML = usersHTML;
                    }else{
                        alert('Erro ao cadastrar usuário.');
                    }
                });
            }catch(error){
                console.error("Erro ao carregar o formulário:", error);
            }
        }
    });

    // Read
    document.addEventListener("click", async (event) => {
        if(event.target.closest("#searchBtn")) {
            const searchInput = document.getElementById("search");
            const registration = searchInput?.value.trim();

            if(!registration){
                alert('Por favor, insira uma matrícula para buscar.');
                return;
            }

            try{
                const response = await fetch(`/users/search?registration=${encodeURIComponent(registration)}`);
                if(response.ok){
                    const tableHTML = await response.text();
                    const tableBody = document.querySelector("table tbody");
                    if(tableBody){
                        tableBody.innerHTML = tableHTML;
                    }else{
                        console.error("Tabela de usuários não encontrada.");
                    }
                }else if(response.status === 404){
                    alert('Usuário não encontrado.');
                }else{
                    alert('Erro ao buscar usuário.');
                }
            }catch(error){
                console.error('Erro ao buscar usuário:', error);
            }
        }
    });

    // Update
    document.addEventListener("click", async (event) => {
        if(event.target.closest(".editar")) {
            const registration = event.target.closest(".editar").dataset.registration;
    
            try{
                const response = await fetch(`/users/edit/${registration}`);
                if(response.ok){
                    document.getElementById("content").innerHTML = await response.text();
    
                    const cancelBtn = document.getElementById("cancelBtn");
                    cancelBtn.addEventListener("click", async () => {
                        const usersResponse = await fetch('/users/page');
                        document.getElementById("content").innerHTML = await usersResponse.text();
                    });
    
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
    
                        const saveResponse = await fetch(`/api/users/edit/${registration}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload),
                        });
    
                        if(saveResponse.ok){
                            alert('Usuário atualizado com sucesso!');
                            const usersResponse = await fetch('/users/page');
                            document.getElementById("content").innerHTML = await usersResponse.text();
                        } else {
                            alert('Erro ao atualizar usuário.');
                        }
                    });
                }
            }catch(error){
                console.error('Erro ao carregar formulário de edição:', error);
            }
        }
    });

    // Delete
    document.addEventListener("click", async (event) => {
        if(event.target.closest(".deletar")){
            const registration = event.target.closest(".deletar").dataset.registration;
            if(confirm('Tem certeza que deseja deletar este usuário?')){
                try {
                    const response = await fetch(`/api/users/delete/${registration}`, {
                        method: 'DELETE',
                    });
    
                    if(response.ok){
                        alert('Usuário deletado com sucesso!');
                        const usersResponse = await fetch('/users/page');
                        document.getElementById("content").innerHTML = await usersResponse.text();
                    }else{
                        alert('Erro ao deletar usuário.');
                    }
                }catch(error){
                    console.error('Erro ao deletar usuário:', error);
                }
            }
        }
    });    
    
});
