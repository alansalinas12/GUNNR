const Weapon = require('./../models/Weapon');
const User = require('./../models/User');
const fs = require('fs');
const cloudinary = require('cloudinary');

module.exports = {
    addWeapon: (req, res, next) => {
        let { text, title, claps, description } = req.body
        
        if (req.files.image) {
            cloudinary.uploader.upload(req.files.image.path, (result) => {
                let obj = { text, title, claps, description, feature_img: result.url != null ? result.url : '' }
                saveWeapon(obj)
            }, {
                    resource_type: 'image',
                    eager: [
                        { effect: 'sepia' }
                    ]
                })
        } else {
            saveWeapon({ text, title, claps, description, feature_img: '' })
        }
        function saveWeapon(obj) {
            new Weapon(obj).save((err, weapon) => {
                if (err)
                    res.send(err)
                else if (!weapon)
                    res.send(400)
                else {
                    return weapon.addAuthor(req.body.author_id).then((_weapon) => {
                        return res.send(_weapon)
                    })
                }
                next()
            })
        }

    },
    getAll: (req, res, next) => {
        Weapon.find(req.params.id)
            .populate('author')
            .populate('comments.author').exec((err, weapon) => {
                if (err)
                    res.send(err)
                else if (!weapon)
                    res.send(404)
                else
                    res.send(weapon)
                next()
            })
    },

    /**
     * weapon_id
     */
    clapWeapon: (req, res, next) => {
        Weapon.findById(req.body.weapon_id).then((weapon) => {
            return weapon.clap().then(() => {
                return res.json({ msg: "Done" })
            })
        }).catch(next)
    },

    /**
     * comment, author_id, weapon_id
     */
    commentWeapon: (req, res, next) => {
        Weapon.findById(req.body.weapon_id).then((weapon) => {
            return weapon.comment({
                author: req.body.author_id,
                text: req.body.comment
            }).then(() => {
                return res.json({ msg: "Done" })
            })
        }).catch(next)
    },

    /**
     * weapon_id
     */
    getWeapon: (req, res, next) => {
        Weapon.findById(req.params.id)
            .populate('author')
            .populate('comments.author').exec((err, weapon) => {
                if (err)
                    res.send(err)
                else if (!weapon)
                    res.send(404)
                else
                    res.send(weapon)
                next()
            })
    }
}