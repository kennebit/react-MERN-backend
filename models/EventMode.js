const { Schema, model } = require("mongoose");

const EventSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// uso 'function' y no una funcion de flecha porque necesito que el 'this' apunte al objeto y no al contexto global
// cambio de propiedades
EventSchema.method('toJSON', function () {
    const { _id, __v, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Event', EventSchema);