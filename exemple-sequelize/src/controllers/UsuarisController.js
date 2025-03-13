const { User,Comment,Video,Youtuber } = require('../models');
const { logger } = require('../config/logger');

const createUser = async (req, res, next) => {
  try {
    username = req.body.username;
    email = req.body.email;
    password = req.body.password;
    nom = req.body.nom;
    idioma = req.body.idioma;

    const user = await User.create({
      username,
      email,
      password,
      nom,
      idioma
    });
    if (!user) {
      res.status(404).json({
        ok: false,
        codi: "ERROR_NO_USER",
        missatge: 'No s\'ha trobat el usuari'
      })
    }

    res.status(201).json({
        ok: true,
        missatge: 'Usuari creat amb èxit',
        resultat: user
    })
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(409).json({
        ok: false,
        codi: "ERROR_DUPLICAT",
        missatge: 'Ja existeix un usuari amb aquest nom d\'usuari o email'
      })
    } else {
      res.status(400).json({
        ok: false,
        codi: "ERROR_VALIDACIO",
        missatge: 'Les dades proporcionades no compleixen els requisits'
      })
    }
    logger.error('Error creant usuari: ', error);
  }
};

const commentsOfUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id_usuari);
    const comments = await Comment.findAll({
      include: [{
        model: Video,
        include: [{
          model: Youtuber,
          as: 'youtuber'
        }],
        as: 'video'
      }],
      where: {
        user_id: user.id
      }
    });
    res.status(200).json({
        ok: true,
        missatge: 'Comentaris de l\'usuari obtinguts amb èxit',
        resultat: comments
    });
  } catch (error) {
    logger.error('Error obtenint comentaris de usuari: ', error);
    res.status(400).json({
      ok: false,
      codi: "ERROR_VALIDACIO",
      missatge: 'Les dades proporcionades no compleixen els requisits'
    })
  }
};
  
module.exports = {
  createUser,
  commentsOfUser
};