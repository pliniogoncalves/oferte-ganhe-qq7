const transactionService = require('../services/transactionService.js')

//Controller for the transaction page
const transactionController = {
    
    getTransactionPage: (req, res) => {
        res.send("Página das transações");
    },

    // Function to register a new transaction
    insertTransaction: async (req, res) => {
        const { talonId, transactionType, transactionDate, userId, talonQuantity } = req.body;
    
        try{
            const newTransaction = await transactionService.insertTransaction(talonId, transactionType, transactionDate, userId, talonQuantity);
            res.status(201).json({ message: 'Transaction created successfully!', transaction: newTransaction });
        }catch(err){
            res.status(500).json({ message: 'Error creating transaction', error: err.message });
        }
    },

    //Function to search for all transactions
    searchTransactions: async (req, res) => {
        try{
            const transactions = await transactionService.searchTransactions();
            res.status(200).json(transactions);
        }catch(err){
            res.status(500).json({ message: 'Error fetching transactions', error: err.message });
        }
    },

    //Function to search for transaction by ID
    searchTransactionId: async (req, res) => {
        const { id } = req.params;
    
        try{
            const transaction = await transactionService.searchTransactionId(id);
            if(transaction){
                res.status(200).json(transaction);
            }else{
                res.status(404).json({ message: 'Transaction not found' });
            }
        }catch(err){
            res.status(500).json({ message: 'Error fetching transaction', error: err.message });
        }
    },

    //Function to update a transaction
    editTransaction: async (req, res) => {
        const { id } = req.params;
        const { transactionType, transactionDate, userId, talonQuantity } = req.body;
    
        try{
            const updatedTransaction = await transactionService.editTransaction(id, transactionType, transactionDate, userId, talonQuantity);
            if(updatedTransaction){
                res.status(200).json({ message: 'Transaction updated successfully!', transaction: updatedTransaction });
            }else{
                res.status(404).json({ message: 'Transaction not found' });
            }
        }catch(err){
            res.status(500).json({ message: 'Error updating transaction', error: err.message });
        }
    },

    //Function to delete a transaction
    removeTransaction: async (req, res) => {
        const { id } = req.params;
    
        try{
            const removedTransaction = await transactionService.removeTransaction(id);
            if(removedTransaction){
                res.status(200).json({ message: 'Transaction deleted successfully!', transaction: removedTransaction });
            }else{
                res.status(404).json({ message: 'Transaction not found' });
            }
        }catch(err){
            res.status(500).json({ message: 'Error deleting transaction', error: err.message });
        }
    }
};

module.exports = transactionController;
