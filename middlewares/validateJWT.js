const express = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = express.response, next) => {

    // manejo de errores
    const token = req.header('x-token');
    // console.log(token);
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'x-token missing'
        })
    }
    try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        req.uid = payload.uid;
        req.name = payload.name;
        console.log('validateJWT > payload > ', payload);
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'x-token invalid'
        })
    }

    next();
}

module.exports = {
    validateJWT,
}