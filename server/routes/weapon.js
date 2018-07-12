const weaponcontroller = require('./../controllers/weapon.ctrl');
const multipart = require('connect-multiparty');
const multipartWare = multipart();

module.exports = (router) => {

    /**
     * get all weapons
     */
    router
        .route('/weapons')
        .get(weaponcontroller.getAll)

    /**
     * add an weapon
     */
    router
        .route('/weapon')
        .post(multipartWare, weaponcontroller.addWeapon)

    /**
     * clap on an weapon
     */
    router
        .route('/weapon/clap')
        .post(weaponcontroller.clapWeapon)

    /**
     * comment on an weapon
     */
    router
        .route('/weapon/comment')
        .post(weaponcontroller.commentWeapon)

    /**
     * get a particlular weapon to view
     */
    router
        .route('/weapon/:id')
        .get(weaponcontroller.getWeapon)
}