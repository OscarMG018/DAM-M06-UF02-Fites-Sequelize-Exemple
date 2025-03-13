const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Video = require('./Video');
const User = require('./User');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    tableName: 'comments'
});


module.exports = Comment;