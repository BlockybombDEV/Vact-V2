const mongoose = require("mongoose")

const User = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    wallet: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    inventory: {type: String},
    cooldowns: {
        work: { type: Date },
        beg: { type: Date },
        daily: { type: Date },
        fish: { type: Date },
        steal: { type: Date }
    }
})

module.exports = { User: mongoose.model("User", User) }
