const mongoose = require('mongoose');
const findOrCreate = require('mongoose-find-or-create');

let UserSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        provider: String,
        provider_id: String,
        token: String,
        provider_pic: String        
    }
)

UserSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);