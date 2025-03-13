const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Video = require('./Video');
const User = require('./User');

const Valoration = sequelize.define('Valoration', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.ENUM("like", "dislike"),
        allowNull: false
    },
}, {
    tableName: 'valorations'
});



module.exports = Valoration;