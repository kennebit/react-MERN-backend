const express = require('express');
const bcrypt = require('bcryptjs');
const Event = require('../models/EventMode');

const eventsGet = async (req, res = express.response) => {
    const ini = new Date().getTime();
    const eventsList = await Event
        // .find({ user: req.uid })
        .find()
        .populate('user', 'name');
    const inif = new Date().getTime() - ini;
    res.status(200).json({
        ok: true,
        inif,
        eventsList,
    })
}
const eventsCreate = async (req, res = express.response) => {
    const event = new Event(req.body);
    try {
        event.user = req.uid;
        const eventoCreado = await event.save();
        return res.status(200).json({
            ok: true,
            msg: 'eventsCreate',
            eventoCreado
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Hablar con administrador'
        })
    }
}
const eventsUpdate = async (req, res = express.response) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe por ID'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios'
            })
        }

        const eventNew = {
            ...req.body,
            user: uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, eventNew, {
            new: true
        });
        res.status(200).json({
            ok: true,
            msg: 'eventsUpdate',
            event: eventUpdated
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hablar con administrador'
        })
    }
}
const eventsDelete = async (req, res = express.response) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'El evento no existe por ID'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios'
            })
        }

        const eventDeleted = await Event.findByIdAndDelete(eventId);
        console.log(eventDeleted);
        res.status(200).json({
            ok: true,
            eventDeleted
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hablar con administrador'
        })
    }
}
module.exports = {
    eventsGet,
    eventsCreate,
    eventsUpdate,
    eventsDelete,
}