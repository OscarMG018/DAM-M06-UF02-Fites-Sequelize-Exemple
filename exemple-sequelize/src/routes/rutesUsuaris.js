const express = require('express');
const router = express.Router();
const usuariController = require('../controllers/UsuarisController');

/**
 * @swagger
 * /api/usuaris:
 *   post:
 *     summary: Crea un nou usuari
 *     description: Crea un nou usuari amb les dades proporcionades
 *     tags: [Usuaris]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *               - nom
 *               - idioma
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nom d'usuari
 *               email:
 *                 type: string
 *                 description: email de l'usuari
 *               password:
 *                 type: string
 *                 description: Contrasenya de l'usuari
 *               nom:
 *                 type: string
 *                 description: Nom de l'usuari
 *               idioma:
 *                 type: string
 *                 description: Idioma de l'usuari, ha de tenir una moda de 2
 *     responses:
 *       201:
 *         description: Usuari creat amb èxit
 *       400:
 *         description: Dades invàlides
 *       409:
 *         description: nom d'usuari duplicat o email ja utilitzat
 */
router.post('/', usuariController.createUser);

/**
 * @swagger
 * /api/usuaris/comentaris/{id_usuari}:
 *   get:
 *     summary: Obté tots els comentaris d'un usuari
 *     description: Retorna una llista amb tots els comentaris d'un usuari
 *     tags: [Usuaris]
 *     parameters:
 *       - in: path
 *         name: id_usuari
 *         required: true
 *         description: ID del usuari
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comentaris obtinguts amb èxit
 *       400:
 *         description: Dades invàlides
 *       404:
 *         description: Usuari no trobat
 */
router.get('/comentaris/:id_usuari', usuariController.commentsOfUser);

module.exports = router;