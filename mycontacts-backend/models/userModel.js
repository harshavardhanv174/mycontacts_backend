const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Pls add the user name"],
    },
    email: {
        type: String,
        required: [true, "Pls add the email"],
        uique: [true, "Email address already taken"],
    },
    password:
    {
        type: String,
        required: [true, "Pls add the password"],
    },
},
    
     {   timestamps: true, }
    
);

module.exports = mongoose.model("User", userSchema);