import { Sequelize } from 'sequelize';


const db = new Sequelize("ts-rest-server", 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
    // logging: false
});


export default db;