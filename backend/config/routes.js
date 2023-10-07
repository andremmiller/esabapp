module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save) // consign se encarrega de carregar os imports para dentro de app
        .get(app.api.user.get)

    app.route('/users/:id')
        //.all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)
    
    app.route('/games')
        //.all(app.config.passport.authenticate())
        .post(app.api.game.save) // consign se encarrega de carregar os imports para dentro de app
        .get(app.api.game.get)

    app.route('/games/:id')
        //.all(app.config.passport.authenticate())
        .put(app.api.game.save)
        .get(app.api.game.getById)
        .delete(app.api.game.remove)
    
    app.route('/owned/games').all(app.config.passport.authenticate()).get(app.api.game.getOwned)
    app.route('/loans/loanedToUser').all(app.config.passport.authenticate()).get(app.api.loan.getLoanedToUser)
    app.route('/loans/loanedByUser').all(app.config.passport.authenticate()).get(app.api.loan.getLoanedByUser)
    
    app.route('/games/:id/uploadImg')
        //.all(app.config.passport.authenticate())
        .post(app.api.game.uploadImg)
    
    app.route('/loans')
        .all(app.config.passport.authenticate())
        .post(app.api.loan.save) // consign se encarrega de carregar os imports para dentro de app
        .get(app.api.loan.get)

    app.route('/loans/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.loan.save)
        .get(app.api.loan.getById)
        .delete(app.api.loan.remove)
    
    app.route('/fees')
        //.all(app.config.passport.authenticate())
        .post(app.api.fee.save) // consign se encarrega de carregar os imports para dentro de app
        .get(app.api.fee.get)

    app.route('/fees/:id')
        //.all(app.config.passport.authenticate())
        .put(app.api.fee.save)
        .get(app.api.fee.getById)
        .delete(app.api.fee.remove)
    
    app.route('/confirmPayment')
        .all(app.config.passport.authenticate())
        .put(app.api.fee.confirmPayment)
}