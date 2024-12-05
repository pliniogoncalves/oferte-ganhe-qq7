document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    // Create
    document.addEventListener("click", async (event) => {
        const addStoreBtn = event.target.closest("#addStoreBtn");
        if(addStoreBtn){
            try{
                const url = '/stores/add';
                window.history.pushState({}, '', url);
    
                const response = await fetch(url);
                if(!response.ok) throw new Error("Erro ao carregar o formulário.");
                const formHTML = await response.text();
                content.innerHTML = formHTML;
    
                const userForm = document.getElementById("userForm");
                userForm.addEventListener("submit", async (e) => {
                    e.preventDefault();
                    const formData = new FormData(userForm);
                    const data = Object.fromEntries(formData.entries());
    
                    try{
                        const saveResponse = await fetch('/api/store/register/', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data)
                        });
    
                        if(saveResponse.ok){
                            showModal('Sucesso', 'Loja cadastrada com sucesso!');
                            const storesResponse = await fetch('/stores/page');
                            if (!storesResponse.ok) throw new Error("Erro ao carregar a lista de lojas.");
                            const usersHTML = await storesResponse.text();
                            content.innerHTML = usersHTML;
                        }else{
                            const errorData = await saveResponse.json();
                            showModal('Erro', `Erro ao cadastrar loja: ${errorData.message || "Erro desconhecido."}`);
                        }
                    }catch(error){
                        console.error("Erro ao cadastrar loja:", error);
                        showModal('Erro', "Erro inesperado ao cadastrar loja.");
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
        if(event.target.closest("#searchStoreBtn")){
            const searchInput = document.getElementById("search");
            const number = searchInput?.value.trim();
    
            try{
                const response = number 
                    ? await fetch(`/stores/search?number=${encodeURIComponent(number)}`)
                    : await fetch(`/stores/list`);
    
                if(response.ok){
                    const tableHTML = await response.text();
                    const tableBody = document.querySelector("table tbody");
                    tableBody ? tableBody.innerHTML = tableHTML : console.error("Tabela de lojas não encontrada.");
                }else if(response.status === 404) {
                    showModal('Aviso', number ? 'Loja não encontrada.' : 'Nenhuma loja disponível.');
                }else{
                    showModal('Erro', 'Erro ao buscar lojas.');
                }
            }catch(error){
                console.error('Erro ao buscar lojas:', error);
                showModal('Erro', 'Erro inesperado ao buscar lojas.');
            }
        }
    });

    // Update
    document.addEventListener("click", async (event) => {
        const editStoreBtn = event.target.closest(".editStore");
        if(editStoreBtn){
            const number = editStoreBtn.dataset.number;
    
            const url = `/stores/edit/${number}`;
            window.history.pushState({}, '', url);
    
            try{
                const response = await fetch(url);
                if(response.ok){
                    document.getElementById("content").innerHTML = await response.text();
                    const editForm = document.getElementById("editForm");

                    editForm.addEventListener("submit", async (e) => {
                        e.preventDefault();
                        const formData = new FormData(editForm);
                        const data = Object.fromEntries(formData.entries());

                        const payload = {
                            name: data.name,
                            newNumber: data.number,
                            
                        };

                        try{
                            const saveResponse = await fetch(`/api/store/edit/${number}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(payload),
                            });
    
                            if(saveResponse.ok){
                                showModal('Sucesso', 'Loja atualizada com sucesso!');
                                const storeResponse = await fetch('/stores/page');
                                if(!storeResponse.ok) throw new Error("Erro ao carregar a lista de lojas.");
                                document.getElementById("content").innerHTML = await storeResponse.text();
                            }else{
                                const errorDetails = await saveResponse.json();
                                showModal('Erro', `Erro ao atualizar loja: ${errorDetails.message || 'Erro desconhecido.'}`);
                            }
                        }catch(error){
                            console.error("Erro ao salvar alterações:", error);
                            showModal('Erro', "Erro ao atualizar a loja.");
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
        const deleteStoreBtn = event.target.closest(".deleteStore");
        if(deleteStoreBtn){
            const number = deleteStoreBtn.dataset.number;
            showModal('Confirmação', 'Tem certeza que deseja deletar esta Loja', async () => {
                try{
                    const response = await fetch(`/api/store/delete/${number}`, {
                        method: 'DELETE',
                    });
    
                    if(response.ok){
                        showModal('Sucesso', 'Loja deletada com sucesso!');
                        const storeResponse = await fetch('/stores/page');
                        content.innerHTML = await storeResponse.text();
                    } else {
                        showModal('Erro', 'Erro ao deletar loja.');
                    }
                }catch(error){
                    console.error('Erro ao deletar loja:', error);
                    showModal('Erro', 'Erro inesperado ao deletar loja.');
                }
            });
        }
    });
    
    //Export CSV
    document.addEventListener("click", async (event) => {
        const exportStoreCsvBtn = event.target.closest("#exportStoreCsvBtn");
        if(exportStoreCsvBtn){
            try{
                const response = await fetch('/api/store/export-csv', { method: 'GET' });
                if (!response.ok) throw new Error("Erro ao exportar CSV.");
    
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = 'lojas.csv';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);

                showModal('Sucesso', 'O arquivo CSV foi exportado com sucesso.');

            }catch(error){
                console.error('Erro ao exportar CSV:', error);
                showModal('Erro', 'Erro inesperado ao exportar CSV.');
            }
        }
    });
});
