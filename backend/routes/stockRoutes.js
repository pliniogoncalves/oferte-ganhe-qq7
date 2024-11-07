const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController.js');
const { insertStock, searchStock, searchStockByStore, editStock, removeStock } = require('../services/stockService.js');

//Rota de depuração para verificar se o 'api/stock' está ativa
router.get('/', (req, res) =>{
    res.send('Rota de Estoque ativa');
});

// Rota para a página de Estoque
router.get('/stock/page', stockController.getUserPage);

// Rota para cadastrar um novo Estoque
router.post('/stock/register', async (req, res) => {
    const {quantidade_minima, quantidade_recomendada, quantidade_atual, loja} = req.body;

    try{
        const newStock = await insertStock(quantidade_minima, quantidade_recomendada, quantidade_atual, loja);
        res.status(201).json({ message: 'Estoque cadastrado com sucesso!', stock: newStock});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar Estoque', erro: erro.message});
    }
});

// Rota para Buscar Todos os Estoques
router.get('/stock/list', async (req, res) => {
    try {
        const stock = await searchStock();
        res.status(200).json(stock);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar todos os estoques', error: err.message });
    }
});

// Rota para Buscar um estoque pela loja
router.get('/stock/list/:loja', async (req, res) => {
    const { loja } = req.params;

    try {
        const result = await searchStockByStore(loja);
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({ message: 'Estoque não encontrado' });
        }
    }catch(err) {
        res.status(500).json({ message: 'Erro ao buscar Estoque', error: err.message });
    }
});

// Rota para editar um Estoque existente
router.put('/stock/edit/:loja', async (req, res) =>{
    const { loja } = req.params;
    const { quantidade_minima, quantidade_recomendada, quantidade_atual } = req.body;

    try{
        const updateStock = await editStock(quantidade_minima, quantidade_recomendada, quantidade_atual, loja);
        if (updateStock) {
            res.status(200).json({ message: 'Estoque atualizado com sucesso!', stock: updateStock });
        } else {
            res.status(404).json({ message: 'Estoque não encontrado.' });
        }
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao editar Estoque', error: erro.message });
    }

});

// Rota para excluir um estoque
router.delete('/stock/delete/:loja', async (req, res) => {
    const { loja } = req.params;

    try{
        const removedStock = await removeStock(loja);
        if(removedStock){
            res.status(200).json({ message: 'Estoque excluído com sucesso!', stock: removedStock });
        }else{
            res.status(404).json({ message: 'Estoque não encontrado.' });
        }
    }catch(erro){
        res.status(500).json({ message: 'Erro ao excluir Estoque', error: erro.message });
    }
});

module.exports = router;