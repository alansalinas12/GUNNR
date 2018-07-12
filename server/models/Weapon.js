const mongoose = require('mongoose')

let WeaponSchema = new mongoose.Schema(
    {
        text: String,
        title: String,
        description: String,
        feature_img: String,
        claps: Number,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [
            {
                author: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                },
                text: String
            }
        ]
    }
);
WeaponSchema.methods.clap = function () {
    this.claps++
    return this.save()
}
WeaponSchema.methods.comment = function (c) {
    this.comments.push(c)
    return this.save()
}
WeaponSchema.methods.addAuthor = function (author_id) {
    this.author = author_id
    return this.save()
}
WeaponSchema.methods.getUserWeapon = function (_id) {
    Weapon.find({ 'author': _id }).then((weapon) => {
        return weapon
    })
}
module.exports = mongoose.model('Weapon', WeaponSchema)