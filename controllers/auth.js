const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');
const { createToken } = require('../helpers/jwt');

const userCreate = async (req, res = express.response) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }
        const newUser = User(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(newUser.password, salt);

        await newUser.save();

        // Generar token JWT
        const token = await createToken(newUser.id, newUser.name);
        return res.status(200).json({
            ok: true,
            msg: 'registro',
            uid: newUser.id,
            name: newUser.name,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }
}
const userLogin = async (req, res = express.response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Validar la contraseña
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese password'
            });
        }

        // Generar token JWT
        const token = await createToken(user.id, user.name);
        res.status(200).json({
            ok: true,
            msg: 'logged',
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el Administrador'
        })
    }
}
const userRenewToken = async (req, res = express.response) => {
    const { uid, name } = req;
    // Generar token JWT
    const token = await createToken(uid, name);
    res.status(200).json({
        ok: true,
        token
    });
}

module.exports = {
    userCreate,
    userLogin,
    userRenewToken,
}