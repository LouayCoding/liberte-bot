const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
    symbol: String,
    balance: Number,
});

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 100000000000,
    },
    coins: [coinSchema],
    boosterRoleId: {
        type: String,
        default: null,
    },
});

module.exports = mongoose.model('User', userSchema);
