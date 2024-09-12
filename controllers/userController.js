const UsersService = require("../services/userService");

const Users = {
    register: async (req, res) => {
        const { registerForm } = req.body;

        const result = await UsersService.register(registerForm);
        res.json(result);
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        const result = await UsersService.login(username, password);
        res.json(result);
    },
};

module.exports = Users;
