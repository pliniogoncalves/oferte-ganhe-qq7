document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.querySelector("main");

    async function loadPage(url, pushState = true) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Erro ao carregar conteúdo.");

            const content = await response.text();
            mainContent.innerHTML = content;

            if (pushState) {
                window.history.pushState({}, '', url);
            }
        } catch (error) {
            console.error("Erro ao carregar a página:", error);
            mainContent.innerHTML = "<p class='text-danger'>Erro ao carregar o conteúdo.</p>";
        }
    }

    // Event listener para navegações com "Voltar" e "Avançar"
    window.addEventListener("popstate", async () => {
        const url = window.location.pathname;
        await loadPage(url, false);
    });

    // Delegação para cliques dinâmicos
    document.body.addEventListener("click", async (event) => {
        const button = event.target.closest(".load-content");
        if (button) {
            event.preventDefault();
            const url = button.getAttribute("data-url");
            await loadPage(url);
        }
    });
});
