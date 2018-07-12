const User = require('./../models/User');
const Weapon = require('./../models/Weapon');

module.exports = {

    getUser: (req, res, next) => {
        User.findOrCreate( req.params.id, {
            name: req.body.name,
            email: req.body.email,
            provider: req.body.provider,
            provider_id: req.body.provider_id,
            token: req.body.token,
            provider_pic: req.body.provider_pic
        }, (err, user) => {
            res.send(user)
        });

    }
}