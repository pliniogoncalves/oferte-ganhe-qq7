document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

     // Create
     document.addEventListener("click", async (event) => {
        const addTalonBtn = event.target.closest("#addTalonBtn");
        if (addTalonBtn) {
            try{
                const url = '/talons/add';
                window.history.pushState({}, '', url);
    
                const response = await fetch(url);
                if (!response.ok) throw new Error("Erro ao carregar o formulário.");
                const formHTML = await response.text();
                content.innerHTML = formHTML;
    
                const talonForm = document.getElementById("talonForm");
                talonForm.addEventListener("submit", async (e) => {
                    e.preventDefault();

                    const formData = new FormData(talonForm);
                    const data = Object.fromEntries(formData.entries());

                    data.dateSend = `${data.date}T${data.time}:00`;
                    delete data.date;
                    delete data.time;
    
                    const storeSelect = document.getElementById("store");
                    const selectedOption = storeSelect.options[storeSelect.selectedIndex];
                    data.storeId = selectedOption.getAttribute("data-id");
                    delete data.store;

                    const userDetails = JSON.parse(document.getElementById('userDetails').textContent);
                    data.userSend = parseInt(userDetails.id, 10);

                    data.quantity = parseInt(data.quantity, 10);
    
                    try{
                        const saveResponse = await fetch('/api/talons/register', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data),
                        });
    
                        if(saveResponse.ok){
                            showModal('Sucesso', 'Talão solicitado com sucesso!');
                            const talonsResponse = await fetch('/talons/page');
                            if (!talonsResponse.ok) throw new Error("Erro ao carregar a lista de talões.");
                            const talonsHTML = await talonsResponse.text();
                            content.innerHTML = talonsHTML;
                        }else{
                            const errorData = await saveResponse.json();
                            showModal('Erro', `Erro ao solicitar talão: ${errorData.message || "Erro desconhecido."}`);
                        }
                    }catch(error){
                        console.error("Erro ao solicitar talão:", error);
                        showModal('Erro', "Erro inesperado ao solicitar talão.");
                    }
                });
            }catch(error){
                console.error("Erro ao carregar o formulário:", error);
                showModal('Erro', "Erro ao carregar o formulário de solicitação.");
            }
        }
    });

    //Read
    document.addEventListener("click", async (event) => {
        if(event.target.closest("#searchTalonBtn")) {
            const searchInput = document.getElementById("search");
            const id = searchInput?.value.trim();
    
            try{
                const response = id
                    ? await fetch(`/talons/search?id=${encodeURIComponent(id)}`)
                    : await fetch(`/talons/list`);
    
                if(response.ok){
                    const tableHTML = await response.text();
                    const tableBody = document.querySelector("table tbody");
                    tableBody ? tableBody.innerHTML = tableHTML : console.error("Tabela de talões não encontrada.");
                }else if(response.status === 404) {
                    showModal('Aviso', id ? 'Talão não encontrado.' : 'Nenhum talão disponível.');
                }else{
                    showModal('Erro', 'Erro ao buscar talões.');
                }
            }catch(error){
                console.error('Erro ao buscar talões:', error);
                showModal('Erro', 'Erro inesperado ao buscar talões.');
            }
        }
    });

     //Edit
     document.addEventListener('click', async (event) => {
        const editTalonBtn = event.target.closest('.editTalon');
        if(editTalonBtn){
            const id = editTalonBtn.dataset.id;
    
            const url = `/talons/edit/${id}`;
            window.history.pushState({}, '', url);
    
            try{
                const response = await fetch(url);
                if(response.ok){
                    document.getElementById("content").innerHTML = await response.text();
                    const talonForm = document.getElementById("talonForm");
    
                    talonForm.addEventListener("submit", async (e) => {
                        e.preventDefault();
    
                        const formData = new FormData(talonForm);
                        const data = Object.fromEntries(formData.entries());
    
                        data.dateSend = `${data.date}T${data.time}:00`;
                        delete data.date;
                        delete data.time;
    
                        const storeSelect = document.getElementById("store");
                        const selectedOption = storeSelect.options[storeSelect.selectedIndex];
                        data.storeId = selectedOption.getAttribute("data-id");
                        delete data.store;
    
                        try{
                            const saveResponse = await fetch(`/api/talons/edit/${id}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(data),
                            });
    
                            if(saveResponse.ok){
                                showModal('Sucesso', 'Talão atualizado com sucesso!');
                                const talonsResponse = await fetch('/talons/page');
                                if (!talonsResponse.ok) throw new Error("Erro ao carregar a lista de talões.");
                                document.getElementById("content").innerHTML = await talonsResponse.text();
                            } else {
                                const errorDetails = await saveResponse.json();
                                showModal('Erro', `Erro ao atualizar talão: ${errorDetails.message || 'Erro desconhecido.'}`);
                            }
                        }catch(error){
                            console.error("Erro ao salvar alterações:", error);
                            showModal('Erro', "Erro ao atualizar o talão.");
                        }
                    });
                }else{
                    throw new Error("Erro ao carregar o formulário de edição.");
                }
            }catch(error){
                console.error("Erro ao carregar o formulário de edição completa:", error);
                showModal('Erro', "Não foi possível carregar o formulário de edição completa.");
            }
        }
    });

    //update
    document.addEventListener('click', async (event) => {
        const updateTalonBtn = event.target.closest('.updateTalon');
        if(updateTalonBtn){
            const url = updateTalonBtn.dataset.url;
    
            try{
                window.history.pushState({}, '', url);
    
                const response = await fetch(url);
                if(!response.ok) throw new Error("Erro ao carregar a página de talões.");
    
                document.getElementById("content").innerHTML = await response.text();
            }catch(error){
                console.error("Erro ao carregar a página de talões:", error);
                showmodal("Erro ao carregar a página de talões.");
            }
        }
    
        const confirmReceiptBtn = event.target.closest('.confirm-receipt-btn');
        if(confirmReceiptBtn){
            const talonId = confirmReceiptBtn.dataset.id;
    
            showModal('Confirmação', 'Tem certeza que deseja confirmar o recebimento deste talão?', async () => {
                try{
                    const dateReceived = new Date().toISOString();
    
                    const userDetails = JSON.parse(document.getElementById('userDetails').textContent);
                    const userReceived = parseInt(userDetails.id, 10);
    
                    const updateResponse = await fetch(`/api/talons/update/${talonId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ dateReceived, userReceived, status: 'Recebido' }),
                    });
    
                    if(!updateResponse.ok) throw new Error("Erro ao confirmar talão.");
    
                    showModal('Sucesso', 'Talão confirmado com sucesso!');
    
                    const talonsResponse = await fetch('/talons/update');
                    if(!talonsResponse.ok) throw new Error("Erro ao recarregar a lista de talões.");
                    document.getElementById("content").innerHTML = await talonsResponse.text();
                }catch(error){
                    console.error("Erro ao confirmar o talão:", error);
                    showModal('Erro', "Erro ao confirmar o talão.");
                }
            });
        }
    });
    
     // Delete
     document.addEventListener("click", async (event) => {
        const deleteTalonBtn = event.target.closest(".deleteTalon");
        if(deleteTalonBtn){
            const talonId = deleteTalonBtn.dataset.id;
            showModal('Confirmação', 'Tem certeza que deseja deletar este talão?', async () => {
                try{
                    const response = await fetch(`/api/talons/delete/${talonId}`, {
                        method: 'DELETE',
                    });
    
                    if(response.ok){
                        showModal('Sucesso', 'Talão deletado com sucesso!');
                        const talonsResponse = await fetch('/talons/page');
                        content.innerHTML = await talonsResponse.text();
                    } else {
                        showModal('Erro', 'Erro ao deletar talão.');
                    }
                }catch(error){
                    console.error('Erro ao deletar talão:', error);
                    showModal('Erro', 'Erro inesperado ao deletar talão.');
                }
            });
        }
    });

    //Export CSV
    document.addEventListener("click", async (event) => {
        const exportTalonCsvBtn = event.target.closest("#exportTalonCsvBtn");
        if(exportTalonCsvBtn){
            try{
                const response = await fetch('/api/talons/export-csv', { method: 'GET' });
                if (!response.ok) throw new Error("Erro ao exportar CSV.");
    
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = 'taloes.csv';
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

    // Export individual Talon CSV
    document.addEventListener("click", async (event) => {
        const exportTalonBtn = event.target.closest(".exportTalon");
        if (exportTalonBtn) {
            const talonId = exportTalonBtn.dataset.id;
    
            try{
                const response = await fetch(`/api/talons/export-csv/${talonId}`, { method: 'GET' });
                if (!response.ok) throw new Error("Erro ao exportar CSV do talão.");
    
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
    
                const a = document.createElement('a');
                a.href = url;
                a.download = `talon_${talonId}.csv`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
    
                showModal('Sucesso', 'O arquivo CSV do talão foi exportado com sucesso.');
            }catch(error){
                console.error('Erro ao exportar CSV do talão:', error);
                showModal('Erro', 'Erro inesperado ao exportar CSV do talão.');
            }
        }
    });

    //talon details
    document.addEventListener("click", async (event) => {
        const detailsTalonBtn = event.target.closest(".detailsTalon");
    
        if(detailsTalonBtn){
            const talonId = detailsTalonBtn.dataset.id;
    
            try{
                const response = await fetch(`/api/talons/details/${talonId}`);
                if(!response.ok) throw new Error("Erro ao buscar os detalhes do talão.");
    
                const talon = await response.json();
    
                const dateSend = talon.dateSend
                    ? new Date(talon.dateSend).toLocaleString("pt-BR")
                    : "Não disponível";
                const dateReceived = talon.dateReceived
                    ? new Date(talon.dateReceived).toLocaleString("pt-BR")
                    : "Não disponível";
    
                const detailsMessage = `
                    <h4 class="mb-3">Detalhes do Talão</h4>
                    <p><strong>ID:</strong> ${talon.id_talon}</p>
                    <p><strong>Loja:</strong> ${talon.storeName}</p>
                    <p><strong>Data de Envio:</strong> ${dateSend}</p>
                    <p><strong>Funcionário que Enviou:</strong> ${talon.userSend || "Não disponível"}</p>
                    <p><strong>Data de Recebimento:</strong> ${dateReceived}</p>
                    <p><strong>Funcionário que Recebeu:</strong> ${talon.userReceived || "Não disponível"}</p>
                    <p><strong>Quantidade:</strong> ${talon.quantity_talon}</p>
                    <p><strong>Status:</strong> ${talon.status_talon}</p>
                `;

                showModal("Detalhes do Talão", detailsMessage);
            }catch(error){
                console.error("Erro ao carregar os detalhes do talão:", error);
                showModal("Erro", "Erro ao carregar os detalhes do talão.");
            }
        }
    });

});