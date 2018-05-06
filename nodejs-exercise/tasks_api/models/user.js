const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ]
});

// encrypt password field
userSchema.pre("save", async function(next) {
    try {
        if( !this.isModified("password")) {
            return next();
        }

        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    }
    catch(err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(anotherPassword, next) {
    try {
        let matched = await bcrypt.compare(anotherPassword, this.password);
        return matched;
    }
    catch(err) {
        next(err);
    }
}

// model
const User = mongoose.model("User", userSchema);
module.exports = User;
