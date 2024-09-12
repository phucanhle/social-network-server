const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        password: { type: String, required: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        dateOfBirth: { type: Date },
        fullName: { type: String, trim: true },
        phone: {
            type: Number,
            validate: {
                validator: function (v) {
                    return /^\d{10}$/.test(v);
                },
                message: (props) => `${props.value} is not a valid phone number!`,
            },
        },
        address: { type: String },
        profilePicture: { type: String },
        bio: { type: String, maxLength: 200 },
    },
    { timestamps: true },
);

// Hash password before save
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
