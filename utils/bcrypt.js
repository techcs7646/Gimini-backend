const bcrypt = require("bcryptjs");
const saltRounds = 10;

exports.hashPassword = async function (plainPassword) {
    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
}

exports.checkPassword = async function (plainPassword,hash){
    return await bcrypt.compare(plainPassword,hash);
}
