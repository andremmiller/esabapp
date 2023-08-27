module.exports = app => {
    app.route('/users')
        .post(app.api.user.save) // consign se encarrega de carregar os imports para dentro de app
        .get(app.api.user.get)

    app.route('/users/:id')
        //.all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)
    
    app.route('/games')
        .post(app.api.game.save) // consign se encarrega de carregar os imports para dentro de app
        .get(app.api.game.get)

    app.route('/games/:id')
        //.all(app.config.passport.authenticate())
        .put(app.api.game.save)
        .get(app.api.game.getById)
        .delete(app.api.game.remove)
    
    app.route('/loans')
        .post(app.api.loan.save) // consign se encarrega de carregar os imports para dentro de app
        .get(app.api.loan.get)

    app.route('/loans/:id')
        //.all(app.config.passport.authenticate())
        .put(app.api.loan.save)
        .get(app.api.loan.getById)
        .delete(app.api.loan.remove)
    
    app.route('/fees')
        .post(app.api.fee.save) // consign se encarrega de carregar os imports para dentro de app
        .get(app.api.fee.get)

    app.route('/fees/:id')
        //.all(app.config.passport.authenticate())
        .put(app.api.fee.save)
        .get(app.api.fee.getById)
        .delete(app.api.fee.remove)
}