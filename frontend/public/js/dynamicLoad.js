document.addEventListener("DOMContentLoaded", () => {
    const loadButtons = document.querySelectorAll(".load-content");
    const mainContent = document.querySelector("main");

    loadButtons.forEach(button => {
        button.addEventListener("click", async (event) => {
            const url = button.getAttribute("data-url");

            try{
                // Update the URL without reloading the page
                window.history.pushState({}, '', url);

                // Make the call to fetch the content
                const response = await fetch(url);
                if(!response.ok) throw new Error("Erro ao carregar conteúdo.");

                const content = await response.text();

                // Inserts the received content into <main>
                mainContent.innerHTML = content;

            }catch (error){
                console.error("Erro ao carregar a página:", error);
                mainContent.innerHTML = "<p class='text-danger'>Erro ao carregar o conteúdo.</p>";
            }
        });
    });
});
