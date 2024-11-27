//const { Pool } = require('pg');

/*
//Connection pool configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

//test the database connection
pool.connect((err, client, release) => {
    if(err) {
        return console.error('Error connecting to database');
    }
    console.log('Connection successful!');
    release(); 
})

module.exports = pool;
*/

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