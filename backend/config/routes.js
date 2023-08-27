module.exports = app => {
    app.route('/users')
        .post(app.api.user.save) // consign se encarrega de carregar os imports para dentro de app
       
}