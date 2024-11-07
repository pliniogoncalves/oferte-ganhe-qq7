const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController.js');
const { insertStore, searchStore, searchStoreNumber, editStore, removeStore } = require('../services/storeService.js')

//Rota de depuração para verificar se o 'api/store' está ativa
router.get('/', (req, res) =>{
    res.send('Rota de Loja ativa');
});

// Rota para a página de Lojas
router.get('/store/page', storeController.getUserPage);

// Rota para cadastrar uma nova Loja
router.post('/store/register', async (req, res) => {
    const {nome, numero} = req.body;

    try{
        const newStore = await insertStore(nome, numero);
        res.status(201).json({ message: 'Loja cadastrada com sucesso!', store: newStore});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar Loja', erro: erro.message});
    }
});

// Rota para Buscar Todos as Lojas
router.get('/store/list', async (req, res) => {
    try {
        const users = await searchStore();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar todas as lojas', error: err.message });
    }
});

// Rota para Buscar uma loja pelo numero
router.get('/store/list/:numero', async (req, res) => {
    const { numero } = req.params;

    try {
        const result = await searchStoreNumber(numero);
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({ message: 'Loja não encontrado' });
        }
    }catch(err) {
        res.status(500).json({ message: 'Erro ao buscar loja', error: err.message });
    }
});

// Rota para editar uma loja existente
router.put('/store/edit/:numero', async (req, res) =>{
    const { numero } = req.params;
    const { nome, novoNumero } = req.body;

    try{
        const updateStore = await editStore(nome, novoNumero, numero);
        if (updateStore) {
            res.status(200).json({ message: 'Loja atualizada com sucesso!', store: updateStore });
        } else {
            res.status(404).json({ message: 'Loja não encontrada.' });
        }
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao editar Loja', error: erro.message });
    }

});

// Rota para excluir uma loja
router.delete('/store/delete/:numero', async (req, res) => {
    const { numero } = req.params;

    try{
        const removedStore = await removeStore(numero);
        if(removedStore){
            res.status(200).json({ message: 'Loja excluída com sucesso!', store: removedStore });
        }else{
            res.status(404).json({ message: 'Loja não encontrada.' });
        }
    }catch(erro){
        res.status(500).json({ message: 'Erro ao excluir Loja', error: erro.message });
    }
});

module.exports = router;