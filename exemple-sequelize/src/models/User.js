const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Comentari = require('./Comment');
const Valoration = require('./Valoration');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data_registre: {
        type: DataTypes.DATE
    },
    idioma: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'es'
    },  
}, {
    tableName: 'users'
});



module.exports = User;