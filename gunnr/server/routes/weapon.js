const weaponcontroller = require('./../controllers/weapon.ctrl');

module.exports = (router) => {

    /**
     * get all articles
     */
    router
        .route('/weapons')
        .get(weaponcontroller.getAll)

    /**
     * add an article
     */
    router
        .route('/weapon')
        .post(weaponcontroller.addArticle)

    /**
     * clap on an article
     */
    router
        .route('/weapon/clap')
        .post(weaponcontroller.clapArticle)

    /**
     * comment on an article
     */
    router
        .route('/weapon/comment')
        .post(weaponcontroller.commentArticle)

    /**
     * get a particlular article to view
     */
    router
        .route('/weapon/:id')
        .get(weaponcontroller.getArticle)
}