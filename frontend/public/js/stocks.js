document.addEventListener("DOMContentLoaded", () => {
    const content = document.getElementById("content");

    // Criar estoque
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

    // Buscar estoque
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

    // Editar estoque
    document.addEventListener("click", async (event) => {
        const editStockBtn = event.target.closest(".editStock");
        if (editStockBtn) {
            const stockId = editStockBtn.dataset.id;
            const url = `/stocks/edit/${stockId}`;
            window.history.pushState({}, '', url);

            try {
                const response = await fetch(url);
                if (response.ok) {
                    content.innerHTML = await response.text();
                    const stockForm = document.getElementById("stockForm");

                    stockForm.addEventListener("submit", async (e) => {
                        e.preventDefault();

                        const formData = new FormData(stockForm);
                        const data = Object.fromEntries(formData.entries());

                        try {
                            const stockResponse = await fetch(`/api/stocks/edit/${stockId}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(data),
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
                } else {
                    throw new Error("Erro ao carregar o formulário de edição.");
                }
            } catch (error) {
                console.error("Erro ao carregar o formulário de edição:", error);
                showModal('Erro', "Erro ao carregar o formulário de edição.");
            }
        }
    });

    // Excluir estoque
    document.addEventListener("click", async (event) => {
        const deleteStockBtn = event.target.closest(".deleteStock");
        if (deleteStockBtn) {
            const stockId = deleteStockBtn.dataset.id;
            showModal('Confirmação', 'Tem certeza que deseja deletar este estoque?', async () => {
                try {
                    const response = await fetch(`/api/stocks/delete/${stockId}`, { method: 'DELETE' });
                    if (response.ok) {
                        showModal('Sucesso', 'Estoque deletado com sucesso!');
                        const stocksResponse = await fetch('/stocks/page');
                        content.innerHTML = await stocksResponse.text();
                    } else {
                        const errorDetails = await response.json();
                        showModal('Erro', `Erro ao deletar estoque: ${errorDetails.message || 'Erro desconhecido.'}`);
                    }
                } catch (error) {
                    console.error('Erro ao deletar estoque:', error);
                    showModal('Erro', 'Erro inesperado ao deletar estoque.');
                }
            });
        }
    });

    // Exportar CSV de estoque
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
