const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String, // Corrected type to String
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },

    bio: {
        type: String
    }
});

module.exports = mongoose.model('Users', UserSchema); // Changed to mongoose.model
