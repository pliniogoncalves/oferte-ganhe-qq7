document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    // Create
    document.addEventListener("click", async (event) => {
        const addStockBtn = event.target.closest("#addStockBtn");
        if (addStockBtn) {
            try {
                const url = '/stocks/add';
                window.history.pushState({}, '', url);

                const response = await fetch(url);
                if (!response.ok) throw new Error("Erro ao carregar o formulário.");
                content.innerHTML = await response.text();

                const stockForm = document.getElementById("stockForm");

                stockForm.addEventListener("submit", async (e) => {
                    e.preventDefault();

                    const formData = new FormData(stockForm);
                    const data = Object.fromEntries(formData.entries());

                    try {
                        const createStockResponse = await fetch('/api/stocks/register/', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data),
                        });

                        if (!createStockResponse.ok) {
                            const errorDetails = await createStockResponse.json();
                            showModal('Erro', `Erro ao cadastrar estoque: ${errorDetails.message || "Erro desconhecido."}`);
                            return;
                        }

                        showModal('Sucesso', 'Estoque cadastrado com sucesso!');
                        const stocksResponse = await fetch('/stocks/page');
                        content.innerHTML = await stocksResponse.text();
                    } catch (error) {
                        console.error("Erro ao cadastrar estoque:", error);
                        showModal('Erro', "Erro inesperado ao cadastrar estoque.");
                    }
                });
            } catch (error) {
                console.error("Erro ao carregar o formulário:", error);
                showModal('Erro', "Erro ao carregar o formulário de cadastro.");
            }
        }
    });

    // Read
    document.addEventListener("click", async (event) => {
        const searchStockBtn = event.target.closest("#searchStockBtn");
        if (searchStockBtn) {
            const searchInput = document.getElementById("search");
            const query = searchInput?.value.trim();

            try {
                const response = await fetch(`/stocks/search?store=${encodeURIComponent(query || '')}`);
                if (response.ok) {
                    const tableHTML = await response.text();
                    const tableBody = document.querySelector("table tbody");
                    if (tableBody) tableBody.innerHTML = tableHTML;
                } else if (response.status === 404) {
                    showModal('Aviso', 'Estoque não encontrado.');
                } else {
                    showModal('Erro', 'Erro ao buscar estoques.');
                }
            } catch (error) {
                console.error('Erro ao buscar estoques:', error);
                showModal('Erro', 'Erro inesperado ao buscar estoques.');
            }
        }
    });

     // Update
     document.addEventListener("click", async (event) => {
        const editStockBtn = event.target.closest(".editStock");
        if(editStockBtn){
            const id = editStockBtn.dataset.id;

            if (!id) {
                console.error("ID do estoque está indefinido ou inválido.");
                return alert("Erro: não foi possível identificar o estoque para edição.");
            }
    
            const url = `/stocks/edit/${id}`;
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
                            stockId: data.stockId,
                            currentStock: parseInt(data.currentStock, 10),
                            minStock: parseInt(data.minStock, 10),
                            recommendedStock: parseInt(data.recommendedStock, 10),
                        };

                        try{
                            const saveResponse = await fetch(`/api/stock/edit/${id}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(payload),
                            });
    
                            if(saveResponse.ok){
                                showModal('Sucesso', 'Estoque atualizado com sucesso!');
                                const stockResponse = await fetch('/stocks/page');
                                if(!stockResponse.ok) throw new Error("Erro ao carregar a lista de estoques.");
                                document.getElementById("content").innerHTML = await stockResponse.text();
                            }else{
                                const errorDetails = await saveResponse.json();
                                showModal('Erro', `Erro ao atualizar estoque: ${errorDetails.message || 'Erro desconhecido.'}`);
                            }
                        }catch(error){
                            console.error("Erro ao salvar alterações:", error);
                            showModal('Erro', "Erro ao atualizar a estoque.");
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

    //Export CSV
    document.addEventListener("click", async (event) => {
        const exportStockCsvBtn = event.target.closest("#exportStockCsvBtn");
        if (exportStockCsvBtn) {
            try {
                const response = await fetch('/api/stocks/export-csv', { method: 'GET' });
                if (!response.ok) throw new Error("Erro ao exportar CSV.");

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = 'estoques.csv';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);

                showModal('Sucesso', 'O arquivo CSV foi exportado com sucesso.');
            } catch (error) {
                console.error('Erro ao exportar CSV:', error);
                showModal('Erro', 'Erro ao exportar CSV.');
            }
        }
    });
});
