const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds); // Tạo salt
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        console.error("Error hashing password:", err);
        throw err;
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword); // So sánh mật khẩu với hash
        return match;
    } catch (err) {
        console.error("Error comparing password:", err);
        throw err;
    }
};

module.exports = { hash: hashPassword, compare: comparePassword };
