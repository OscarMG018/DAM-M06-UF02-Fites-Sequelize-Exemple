/**
 * index.js de models
 * Configuració de les relacions entre els models
 */

const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');
const Youtuber = require('./Youtuber');
const PerfilYoutuber = require('./PerfilYoutuber');
const Video = require('./Video');
const Categoria = require('./Categoria');
const Comment = require('./Comment');
const Valoration = require('./Valoration');
const User = require('./User');

// Definir el model VideosCategories que servirà com a taula d'unió
const VideosCategories = sequelize.define('VideosCategories', {
  video_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Video,
      key: 'id'
    }
  },
  categoria_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Categoria,
      key: 'id'
    }
  }
}, {
  tableName: 'videos_categories',
  timestamps: false
});

// Relació 1:1 entre Youtuber i PerfilYoutuber
Youtuber.hasOne(PerfilYoutuber, { foreignKey: 'youtuber_id' });
PerfilYoutuber.belongsTo(Youtuber, { foreignKey: 'youtuber_id' });

// Relació 1:N entre Youtuber i Video
Youtuber.hasMany(Video, {
  foreignKey: 'youtuber_id',
  as: "youtuber"
});
Video.belongsTo(Youtuber, { foreignKey: 'youtuber_id', as: "youtuber"});

// Relació N:M entre Video i Categoria
Video.belongsToMany(Categoria, { through: VideosCategories, foreignKey: 'video_id' });
Categoria.belongsToMany(Video, { through: VideosCategories, foreignKey: 'categoria_id' });

Valoration.belongsTo(User, { foreignKey: 'user_id' });
Valoration.belongsTo(Video, { foreignKey: 'video_id' });

User.hasMany(Comment, {
  foreignKey: 'user_id'
});
User.hasMany(Valoration,{
  foreignKey: 'user_id'
});

Video.hasMany(Comment, {
  as: "video",
  foreignKey: 'video_id'
});
Video.hasMany(Valoration,{
  foreignKey: 'video_id'
});

Comment.belongsTo(Video, {
  foreignKey: 'video_id',
  as: "video"
});
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = {
  Youtuber,
  PerfilYoutuber,
  Video,
  Categoria,
  VideosCategories,
  User,
  Comment,
  Valoration
};