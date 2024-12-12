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
    
                const { role, storeId } = JSON.parse(document.getElementById('userDetails').textContent);
    
                const talonForm = document.getElementById("talonForm");
                talonForm.addEventListener("submit", async (e) => {
                    e.preventDefault();

                    const formData = new FormData(talonForm);
                    const data = Object.fromEntries(formData.entries());

                    data.date_send = `${data.date}T${data.time}:00`;
                    delete data.date;
                    delete data.time;
    
                    data.user_send = role === 'Administrador' ? data.user : storeId;
    
                    try{
                        const saveResponse = await fetch('/api/talons/request/', {
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