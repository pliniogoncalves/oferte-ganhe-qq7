const Transaction = require('../models/Transaction');
const Talon = require('../models/Talon');
const User = require('../models/User');

//Function to insert a new transaction
async function insertTransaction(talonId, transactionType, transactionDate, userId, talonQuantity) {
    try{
        const transaction = await Transaction.create({
            id_talon: talonId,
            type_transaction: transactionType,
            date_transaction: transactionDate,
            user_transaction: userId,
            quantity_talon_transaction: talonQuantity,
        });
        return transaction;
    }catch(err){
        console.error('Error inserting transaction:', err);
        throw err;
    }
}

//Function to fetch all transactions
async function searchTransactions() {
    try{
        const transactions = await Transaction.findAll({
            include: [
                { model: Talon, attributes: ['status_talon'], required: false },
                { model: User, attributes: ['name_users'], required: false },
            ],
        });
        return transactions;
    }catch(err){
        console.error('Error fetching transactions:', err);
        throw err;
    }
}

//Function to search for transaction by ID
async function searchTransactionId(transactionId) {
    try{
        const transaction = await Transaction.findOne({
            where: { id_transaction: transactionId },
            include: [
                { model: Talon, attributes: ['status_talon'], required: false },
                { model: User, attributes: ['name_users'], required: false },
            ],
        });
        return transaction;
    }catch(err){
        console.error('Error fetching transaction by ID:', err);
        throw err;
    }
}

//Function to update a transaction
async function editTransaction(transactionId, transactionType, transactionDate, userId, talonQuantity) {
    try{
        const transaction = await Transaction.update(
            {
                type_transaction: transactionType,
                date_transaction: transactionDate,
                user_transaction: userId,
                quantity_talon_transaction: talonQuantity,
            },
            {
                where: { id_transaction: transactionId },
                returning: true,
            }
        );
        return transaction[1][0];
    }catch(err){
        console.error('Error updating transaction:', err);
        throw err;
    }
}

//Function to delete a transaction
async function removeTransaction(transactionId) {
    try{
        const transaction = await Transaction.destroy({
            where: { id_transaction: transactionId },
        });
        return transaction;
    }catch(err){
        console.error('Error deleting transaction:', err);
        throw err;
    }
}

module.exports = {
    insertTransaction,
    searchTransactions,
    searchTransactionId,
    editTransaction,
    removeTransaction,
};
