const usercontroller = require('./../controllers/user.ctrl');

module.exports = (router) => {

    /**
     * get a user
     */
    router
        .route('/user/:id')
        .get(usercontroller.getUser)
}