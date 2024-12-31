/*
    Host + /api/events
*/
const express = require('express');
const router = express.Router();
const { validateJWT } = require('../middlewares/validateJWT');
const { check } = require('express-validator');
const { eventsGet, eventsCreate, eventsUpdate, eventsDelete } = require('../controllers/events');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { isDate } = require('../helpers/isDate');

// esto valida siempre que exista un token valido
router.use(validateJWT);
router.get(
    '/',
    eventsGet
);
router.post(
    '/',
    [
        check('title', 'Title required').not().isEmpty(),
        check('start', 'Start required').custom(isDate),
        check('end', 'End required').custom(isDate),
        fieldsValidator
    ],
    eventsCreate
);
router.put(
    '/:id',
    [
        check('title', 'Title required').not().isEmpty(),
        check('start', 'Start required').custom(isDate),
        check('end', 'End required').custom(isDate),
        fieldsValidator
    ],
    eventsUpdate
);
router.delete(
    '/:id',
    eventsDelete
);

module.exports = router;