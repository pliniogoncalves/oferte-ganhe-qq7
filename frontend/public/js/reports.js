document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById("content");

    //reports view
    document.addEventListener("click", async (event) => {
        const visualizarButtons = event.target.closest(".btn-visualizar");
        if(visualizarButtons){
            const visualizarRoute = visualizarButtons.dataset.view;
            console.log('botão visualizar clicado')
            if(visualizarRoute) {
                const routes = {
                    showReportUsers: '/users/page',
                    showReportProfiles: '/profiles/page',
                    showReportTalons: '/talons/page',
                    showReportStocks: '/stocks/page',
                    showReportStores: '/stores/page',
                };

                const destination = routes[visualizarRoute];
                if(destination){
                    try{
                        const response = await fetch(destination);
                        if(response.ok){
                            const htmlContent = await response.text();
                            const contentContainer = document.querySelector("#content");

                            if(contentContainer){
                                contentContainer.innerHTML = htmlContent;
                            }else{
                                console.error("Container principal não encontrado!");
                            }
                        }else{
                            console.error("Erro ao carregar a página:", response.statusText);
                        }
                    }catch(error){
                        console.error("Erro ao buscar o conteúdo:", error);
                    }
                }else{
                    console.error(`Rota não encontrada para: ${visualizarRoute}`);
                }
            }else{
                throw new Error("Erro ao carregar página.");
            }
        }
    });
    

    // download csv
    const downloadButtons = document.querySelectorAll('.btn-download');
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const downloadRoute = button.getAttribute('data-download');
            if (downloadRoute) {
                window.location.href = `/relatorios/${downloadRoute}`;
            }
        });
    });
});
