require('dotenv').config();
const jwt = require('jsonwebtoken');


const checkLogin = (req, res, next) => {
    try {
        const token = req.cookies.token_coded;
        req.token_data = jwt.verify(token, process.env.SECRET_KEY);


        next();
    } catch(err) {
        res.redirect('/usuarios/login');
    }
}


module.exports = { checkLogin };
