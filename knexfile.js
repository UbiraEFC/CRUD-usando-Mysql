module.exports = {
    client: "mysql2", //npm install mysql2 CABAÇOOOO    
    connection: {
        database: "apinode",
        user: "root",
        password: "123456"
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: "knex_migrations"
    }
}