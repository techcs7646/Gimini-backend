var jwt = require("jsonwebtoken");

exports.createToken = function (payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }); 
    return token;
}
