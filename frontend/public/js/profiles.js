document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    // Create
    document.addEventListener("click", async (event) => {
        const addProfileBtn = event.target.closest("#addProfileBtn");
        if(addProfileBtn) {
            try{
                const url = '/profiles/add';
                window.history.pushState({}, '', url);
    
                const response = await fetch(url);
                if(!response.ok) throw new Error("Erro ao carregar o formulário.");
                content.innerHTML = await response.text();
    
                const profileForm = document.getElementById("profileForm");
    
                profileForm.addEventListener("submit", async (e) => {
                    e.preventDefault();
    
                    const formData = new FormData(profileForm);
                    const data = Object.fromEntries(formData.entries());
    
                    const selectedPermissions = Array.from(
                        document.querySelectorAll('input[name="permissions"]:checked')
                    ).map(el => el.value);
    
                    try{
                        const createProfileResponse = await fetch('/api/profiles/register/', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ name: data.name })
                        });
    
                        if(!createProfileResponse.ok){
                            const errorDetails = await createProfileResponse.json();
                            showModal('Erro', `Erro ao cadastrar perfil: ${errorDetails.message || "Erro desconhecido."}`);
                            return;
                        }
    
                        for(const permissionName of selectedPermissions) {
                            const permissionResponse = await fetch('/api/profile-permissions/register/', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    profileName: data.name,
                                    permissionName
                                }),
                            });
    
                            if(!permissionResponse.ok){
                                const errorDetails = await permissionResponse.text();
                                console.error("Erro ao associar permissão:", errorDetails);
                                showModal('Erro', `Erro ao associar permissão: ${errorDetails}`);
                                return;
                            }
                        }
    
                        showModal('Sucesso', 'Perfil cadastrado com sucesso!');
                        const profilesResponse = await fetch('/profiles/page');
                        if (!profilesResponse.ok) throw new Error("Erro ao carregar a lista de perfis.");
                        content.innerHTML = await profilesResponse.text();
                    }catch(error){
                        console.error("Erro ao cadastrar perfil:", error);
                        showModal('Erro', "Erro inesperado ao cadastrar perfil.");
                    }
                });
            }catch(error){
                console.error("Erro ao carregar o formulário:", error);
                showModal('Erro', "Erro ao carregar o formulário de cadastro.");
            }
        }
    });
    
    // Read
    document.addEventListener("click", async (event) => {
        if (event.target.closest("#searchProfileBtn")) {
            const searchInput = document.getElementById("search");
            const query = searchInput?.value.trim();
    
            try{
                const response = await fetch(`/profiles/search?name=${encodeURIComponent(query || '')}`);
                
                if (response.ok) {
                    const tableHTML = await response.text();
                    const tableBody = document.querySelector("table tbody");
                    if(tableBody) {
                        tableBody.innerHTML = tableHTML;
                    }else{
                        console.error("Tabela de perfis não encontrada.");
                    }
                }else if(response.status === 404) {
                    showModal('Aviso', 'Perfil não encontrado.');
                }else{
                    showModal('Erro', 'Erro ao buscar perfis.');
                }
            }catch(error){
                console.error('Erro ao buscar perfis:', error);
                showModal('Erro', 'Erro inesperado ao buscar perfis.');
            }
        }
    });

    // Update
    document.addEventListener("click", async (event) => {
        const editProfileBtn = event.target.closest(".editProfile");
        if (editProfileBtn) {
            const nameProfile = editProfileBtn.dataset.name;
    
            const url = `/profiles/edit/${nameProfile}`;
            window.history.pushState({}, '', url);
    
            try{
                const response = await fetch(url);
                if (response.ok) {
                    content.innerHTML = await response.text();
                    const profileForm = document.getElementById("profileForm");
    
                    profileForm.addEventListener("submit", async (e) => {
                        e.preventDefault();
    
                        const formData = new FormData(profileForm);
                        const data = Object.fromEntries(formData.entries());
    
                        const selectedPermissions = Array.from(
                            document.querySelectorAll('input[name="permissions"]:checked')
                        ).map(el => el.value);
    
                        const allPermissions = Array.from(
                            document.querySelectorAll('input[name="permissions"]')
                        ).map(el => el.value);
    
                        const removedPermissions = allPermissions.filter(permission => !selectedPermissions.includes(permission));
    
                        try{
                            const profileResponse = await fetch(`/api/profiles/edit/${nameProfile}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    newName: data.name
                                }),
                            });
    
                            if(!profileResponse.ok){
                                const errorDetails = await profileResponse.json();
                                showModal('Erro', `Erro ao atualizar perfil: ${errorDetails.message || "Erro desconhecido."}`);
                                return;
                            }
    
                            for (const permissionName of selectedPermissions) {
                                const permissionResponse = await fetch('/api/profile-permissions/register/', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        profileName: data.name,
                                        permissionName
                                    }),
                                });
    
                                if(!permissionResponse.ok){
                                    const errorDetails = await permissionResponse.text();
                                    console.error("Erro ao associar permissão:", errorDetails);
                                    showModal('Erro', `Erro ao associar permissão: ${errorDetails}`);
                                    return;
                                }
                            }
    
                            if(removedPermissions.length > 0){
                                const deleteResponse = await fetch('/api/profile-permissions/delete', {
                                    method: 'DELETE',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        profileName: data.name,
                                        permissionNames: removedPermissions
                                    }),
                                });
    
                                if(!deleteResponse.ok){
                                    const errorDetails = await deleteResponse.text();
                                    console.error("Erro ao remover permissões:", errorDetails);
                                    showModal('Erro', `Erro ao remover permissões: ${errorDetails}`);
                                    return;
                                }
                            }
    
                            showModal('Sucesso', 'Perfil e Permissões atualizados com sucesso!');
                            const profilesResponse = await fetch('/profiles/page');
                            content.innerHTML = await profilesResponse.text();
                        }catch(error){
                            console.error("Erro ao salvar alterações:", error);
                            showModal('Erro', "Erro ao atualizar o perfil e permissões.");
                        }
                    });
                }else{
                    throw new Error("Erro ao carregar o formulário de edição.");
                }
            }catch(error){
                console.error("Erro ao carregar o formulário de edição:", error);
                showModal('Erro', "Não foi possível carregar o formulário de edição.");
            }
        }
    });  

    // Delete
    document.addEventListener("click", async (event) => {
        const deleteProfileBtn = event.target.closest(".deleteProfile");
        if(deleteProfileBtn) {
            const profileName = deleteProfileBtn.dataset.name;
            showModal('Confirmação', 'Tem certeza que deseja deletar este perfil?', async () => {
                try{
                    const response = await fetch(`/api/profiles/delete/${profileName}`, {
                        method: 'DELETE',
                    });
    
                    if(response.ok){
                        showModal('Sucesso', 'Perfil deletado com sucesso!');
                        const profilesResponse = await fetch('/profiles/page');
                        content.innerHTML = await profilesResponse.text();
                    }else{
                        const errorDetails = await response.json();
                        showModal('Erro', `Erro ao deletar perfil: ${errorDetails.message || 'Erro desconhecido.'}`);
                    }
                }catch(error){
                    console.error('Erro ao deletar perfil:', error);
                    showModal('Erro', 'Erro inesperado ao deletar perfil.');
                }
            });
        }
    });

    // Export CSV
    document.addEventListener("click", async (event) => {
        const exportProfileCsvBtn = event.target.closest("#exportProfileCsvBtn");
        if (exportProfileCsvBtn) {
            try {
                const response = await fetch('/api/profiles/export-csv', { method: 'GET' });
                if (!response.ok) throw new Error("Erro ao exportar CSV.");

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = 'perfis.csv';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);

                showModal('Sucesso', 'O arquivo CSV foi exportado com sucesso.');
            } catch (error) {
                console.error('Erro ao exportar CSV:', error);
                showModal('Erro', 'Erro inesperado ao exportar CSV.');
            }
        }
    });
});
