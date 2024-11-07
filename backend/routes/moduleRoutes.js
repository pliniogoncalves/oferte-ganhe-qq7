const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/moduleController.js');
const { insertModule, searchModule, searchModuleName, editModule, removeModule } = require('../services/moduleService.js')

//Rota de depuração para verificar se o 'api/module' está ativa
router.get('/', (req, res) =>{
    res.send('Rota de Modulo ativa');
});

// Rota para a página de Modulos
router.get('/module/page', moduleController.getUserPage);

// Rota para cadastrar um novo modulo
router.post('/module/register', async (req, res) => {
    const {nome, acesso, funcionalidade} = req.body;

    try{
        const newModule = await insertModule(nome, acesso, funcionalidade);
        res.status(201).json({ message: 'Modulo cadastrado com sucesso!', module: newModule});
    }catch(erro){
        res.status(500).json({ message: 'Erro ao cadastrar Modulo', erro: erro.message});
    }
});

// Rota para Buscar Todos os Modulos
router.get('/module/list', async (req, res) => {
    try {
        const module = await searchModule();
        res.status(200).json(module);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar todos os modulos', error: err.message });
    }
});

// Rota para Buscar um modulo por nome
router.get('/module/list/:nome', async (req, res) => {
    const { nome } = req.params;

    try {
        const result = await searchModuleName(nome);
        if(result){
            res.status(200).json(result);
        }else{
            res.status(404).json({ message: 'Modulo não encontrado' });
        }
    }catch(err) {
        res.status(500).json({ message: 'Erro ao buscar Modulo', error: err.message });
    }
});

// Rota para editar um modulo existente
router.put('/module/edit/:nome', async (req, res) =>{
    const { nome } = req.params;
    const { novoNome, acesso, funcionalidade } = req.body;

    try{
        const updateModule = await editModule(novoNome, acesso, funcionalidade, nome);
        if (updateModule) {
            res.status(200).json({ message: 'Modulo atualizado com sucesso!', module: updateModule });
        } else {
            res.status(404).json({ message: 'Modulo não encontrado.' });
        }
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao editar Modulo', error: erro.message });
    }

});

// Rota para excluir um Modulo
router.delete('/module/delete/:nome', async (req, res) => {
    const { nome } = req.params;

    try{
        const removedModule = await removeModule(nome);
        if(removeModule){
            res.status(200).json({ message: 'Modulo excluído com sucesso!', module: removedModule });
        }else{
            res.status(404).json({ message: 'Modulo não encontrado.' });
        }
    }catch(erro){
        res.status(500).json({ message: 'Erro ao excluir Modulo', error: erro.message });
    }
});

module.exports = router;