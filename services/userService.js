const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

const UsersService = {
    register: async (registerForm) => {
        const { username } = registerForm;
        try {
            const existedUser = await Users.findOne({ username: username });
            if (existedUser) {
                return { success: false, message: "User already exists" };
            }
            const newUser = new Users(registerForm);
            await newUser.save();
            return { success: true, message: "User registered successfully", newUser };
        } catch (error) {
            return { success: false, message: "Error registering user", error };
        }
    },

    login: async (username, password) => {
        try {
            const user = await Users.findOne({ username });

            if (!user) {
                return { success: false, message: "User not found" };
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                return { success: true, message: "Login successful", user };
            } else {
                return { success: false, message: "Incorrect password" };
            }
        } catch (error) {
            return { success: false, message: "Login error", error };
        }
    },
};

module.exports = UsersService;
