const userService = require('../services/userService.js')

// Controlador para a página de usuários
const userController = {
    //Função para exibir a pagina de usuario
    getUserPage: (req, res) => {
        res.send("Página dos Usuários");
    },

    // Funçao para cadastrar um novo Usuário
    insertUser: async (req, res) => {
        const {nome, matricula, email, senha, loja, perfil} = req.body;

        try{
            const newUser = await userService.insertUser(nome, matricula, email, senha, loja, perfil);
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!', user: newUser});
        }catch(erro){
            res.status(500).json({ message: 'Erro ao cadastrar usuário', erro: erro.message});
        }
    },

    // Função para Buscar Todos os Usuários
    searchUser : async (req, res) => {
        try {
            const users = await userService.searchUser();
            res.status(200).json(users);
        }catch(err){
            res.status(500).json({ message: 'Erro ao buscar todos os usuários', error: err.message });
        }
    },

    // Função para Buscar um usuário pela matricula
    searchUserMatricula : async (req, res) => {
        const { matricula } = req.params;

        try {
            const result = await userService.searchUserMatricula(matricula);
            if(result){
                res.status(200).json(result);
            }else{
                res.status(404).json({ message: 'Usuário não encontrado' });
            }
        }catch(err) {
            res.status(500).json({ message: 'Erro ao buscar usuário', error: err.message });
        }
    },

    // Função para editar um usuário existente
    editUser : async (req, res) =>{
        const { matricula } = req.params;
        const { nome, novaMatricula, email, senha, loja, perfil } = req.body;

        try{
            const updateUser = await userService.editUser(nome, novaMatricula, email, senha, loja, perfil, matricula);
            if (updateUser) {
                res.status(200).json({ message: 'Usuário atualizado com sucesso!', user: updateUser });
            }else{
                res.status(404).json({ message: 'Usuário não encontrado.' });
            }
        }catch(erro){
            res.status(500).json({ message: 'Erro ao editar usuário', error: erro.message });
        }
    },

    // Função para excluir um usuário
    removeUser : async (req, res) => {
        const { matricula } = req.params;

        try{
            const removedUser = await userService.removeUser(matricula);
            if(removedUser){
                res.status(200).json({ message: 'Usuário excluído com sucesso!', user: removedUser });
            }else{
                res.status(404).json({ message: 'Usuário não encontrado.' });
            }
        }catch(erro){
            res.status(500).json({ message: 'Erro ao excluir usuário', error: erro.message });
        }
    }
};

module.exports = userController;
