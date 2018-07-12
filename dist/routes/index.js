const user = require('./user');
const weapon = require('./weapon');

module.exports = (router) => {
    user(router)
    weapon(router)
}