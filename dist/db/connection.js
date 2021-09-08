"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var db = new sequelize_1.Sequelize("ts-rest-server", 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307
    // logging: false
});
exports.default = db;
//# sourceMappingURL=connection.js.map