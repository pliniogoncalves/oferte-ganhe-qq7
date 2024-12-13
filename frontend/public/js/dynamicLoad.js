document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.querySelector("main");

    async function loadPage(url, pushState = true) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                // Se a resposta for 403, verifica se a resposta é JSON ou HTML
                if (response.status === 403) {
                    const contentType = response.headers.get('Content-Type');
                    
                    // Se a resposta for JSON, tenta fazer o parse
                    if (contentType && contentType.includes('application/json')) {
                        const data = await response.json();
                        throw new Error(data.message || "Você não tem permissão para acessar esta página.");
                    }
                    
                    // Se for HTML, significa que o backend enviou uma página de erro
                    const htmlContent = await response.text();
                    throw new Error("Você não tem permissão para acessar esta página.");
                }
                
                throw new Error("Erro ao carregar conteúdo.");
            }
    
            const content = await response.text();
            mainContent.innerHTML = content;
    
            if (pushState) {
                window.history.pushState({}, '', url);
            }
        } catch (error) {
            console.error("Erro ao carregar a página:", error);
    
            // Exibe a mensagem de erro no conteúdo principal
            mainContent.innerHTML = `<h3><p>${error.message}</p></h3>`;
    
        }
    }

    window.addEventListener("popstate", async () => {
        const url = window.location.pathname;
        await loadPage(url, false);
    });

    document.body.addEventListener("click", async (event) => {
        const button = event.target.closest(".load-content");
        if(button){
            event.preventDefault();
            const url = button.getAttribute("data-url");
            await loadPage(url);
        }
    });
});