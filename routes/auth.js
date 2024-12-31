/*
    Host + /api/auth
*/

const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { userCreate, userLogin, userRenewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validateJWT');

router.post(
    '/new',
    [
        // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es erroneo').isEmail(),
        check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
        fieldsValidator
    ],
    userCreate
);
router.post(
    '/',
    [
        // middlewares
        check('email', 'El email es erroneo').isEmail(),
        check('password', 'El password debe tener mas de 6 caracteres').isLength({ min: 6 }),
        fieldsValidator
    ],
    userLogin);
router.get(
    '/renew',
    [
        // middlewares
        validateJWT
    ],
    userRenewToken);

module.exports = router;