const { Sequelize } = require('sequelize');

// Sequelize Configuration
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

// Test the database connection using Sequelize
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection successful!');
    } catch (error) {
        console.error('Error connecting to database:', error.message);
    }
})();

module.exports = sequelize;