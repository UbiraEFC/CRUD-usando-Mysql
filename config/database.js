const config = require('../knexFile.js');
const knex = require("knex")(config); // usando as configurações criadas em knexFile.js dentro do knex que foi instalado
module.exports = knex;

// NO TERMINAL: knex migrate:make create_table_categories 
// cria uma migration na pasta migrations 