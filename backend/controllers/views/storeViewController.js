const storeViewService = require('../../services/views/storeViewService.js');

const storeViewController = {
    getStorePage: async (req, res) => {
        try{
            
            const itemsPerPage = 10; 
            const { stores, currentPage, totalPages } = await storeViewService.getPaginatedStores(req.query.page, itemsPerPage);

            res.render('partials/stores/stores', { 
                layout: false, 
                title: 'Gestão de Lojas',
                stores: stores,
                currentPage,
                totalPages,
            });
        }catch(error){
            console.error('Erro ao carregar lojas:', error);
            res.status(500).send('Erro ao carregar a página de lojas');
        }
    },

    getAddStorePage: async (req, res) => {
        try{
            res.render('partials/stores/addStores', {
                layout: false,
                title: 'Cadastrar Loja',
            });
        }catch(error){
            console.error('Erro ao carregar a página de cadastro de lojas:', error);
            res.status(500).send('Erro ao carregar a página.');
        }
    },

    getAllStores: async (req, res) => {
        try{
            const stores = await storeViewService.getAllStores();
            res.status(200).render("partials/stores/storesTable", { 
                layout: false,
                stores: stores || [],
                cssFiles: [],
            });
        }catch(error){
            console.error("Erro ao listar lojas:", error);
            res.status(500).send("Erro ao listar lojas.");
        }
    },

    searchStoresByNumber: async (req, res) => {
        const { number } = req.query;

        try{
            const stores = number 
                ? await storeViewService.getStoreByNumber(number) 
                : await storeViewService.getAllStores();

            if(number && !stores){
                return res.status(404).send("Loja não encontrado");
            }

            res.render("partials/stores/storesTable", { 
                layout: false,
                stores: Array.isArray(stores) ? stores : [stores],
                cssFiles: [],
            });
        }catch(error){
            console.error("Erro ao buscar loja por numero:", error);
            res.status(500).send("Erro ao buscar loja.");
        }
    },

    getEditStorePage: async (req, res) => {
        try{
            const { number } = req.params;
            const { store } = await storeViewService.getEditStoreData(number);

            if(!store){
                return res.status(404).send('Loja não encontrada');
            }

            res.render('partials/stores/editStores', {
                layout: false,
                stores: store,
                title: 'Editar Loja',
            });
        }catch(error){
            console.error('Erro ao carregar edição:', error);
            res.status(500).send('Erro ao carregar a página de edição');
        }
    },
};

module.exports = storeViewController;
