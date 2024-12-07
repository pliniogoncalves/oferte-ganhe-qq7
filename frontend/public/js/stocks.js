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
        if (editStockBtn) {
            const storeData = JSON.parse(editStockBtn.getAttribute('data-store'));

            const url = `/stocks/edit/${storeData.storeNumber}`;
            window.history.pushState({}, '', url);

            try{
                const response = await fetch(url);
                if(response.ok){
                    content.innerHTML = await response.text();

                    const stockForm = document.getElementById("stockForm");
                    stockForm.storeId.value = storeData.id_store;
                    stockForm.currentStock.value = storeData.current_stock;
                    stockForm.minStock.value = storeData.minimum_stock;
                    stockForm.recommendedStock.value = storeData.recommended_stock;

                    stockForm.addEventListener("submit", async (e) => {
                        e.preventDefault();
                        const formData = new FormData(stockForm);
                        const data = Object.fromEntries(formData.entries());

                        const payload = {
                            stockId: data.stockId || null,
                            storeId: data.storeId,
                            talonId: data.talonId || null,
                            currentStock: parseFloat(data.currentStock),
                            minStock: parseFloat(data.minStock),
                            recommendedStock: parseFloat(data.recommendedStock),
                        };

                        console.log("Payload enviado:", payload);

                        try{
                            const editStockApiUrl = `/api/stock/edit/${storeData.id_stock || ''}`;
                            const stockResponse = await fetch(editStockApiUrl, {
                                method: storeData.id_stock? 'POST':'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(payload),
                            });

                            if (!stockResponse.ok) {
                                const errorDetails = await stockResponse.json();
                                showModal('Erro', `Erro ao atualizar estoque: ${errorDetails.message || "Erro desconhecido."}`);
                                return;
                            }

                            showModal('Sucesso', 'Estoque atualizado com sucesso!');
                            const stocksResponse = await fetch('/stocks/page');
                            content.innerHTML = await stocksResponse.text();
                        } catch (error) {
                            console.error("Erro ao salvar alterações:", error);
                            showModal('Erro', "Erro ao atualizar o estoque.");
                        }
                    });
                }else{
                    throw new Error("Erro ao carregar o formulário de edição.");
                }
            }catch(error){
                console.error("Erro ao carregar o formulário de edição:", error);
                showModal('Erro', "Erro ao carregar o formulário de edição.");
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
