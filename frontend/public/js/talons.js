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

});