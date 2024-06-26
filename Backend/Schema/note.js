const mongoose = require("mongoose")

const NoteSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        
    },
    tag:{
        type: String,
        default: "Tags"
        //required: true
    },
    date:{
        type: Date,
       default: Date.now
    },
})

module.exports = mongoose.model('Notes', NoteSchema);