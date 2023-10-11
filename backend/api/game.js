const bcrypt = require('bcrypt-nodejs')
const multer = require('multer');

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    // mesmo metodo para novo usuario e update (com parametro id definido)
    const save = async (req, res) => {
        const game = { ...req.body }
        if(req.params.id) game.id = req.params.id

        try {
            existsOrError(game.name, 'Nome não informado')
            existsOrError(game.desc, 'Descrição não informada')
            existsOrError(game.userId, 'Usuário não informado') 
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(game.id) {
            delete game.userName
            delete game.userMail
            delete game.userPhone
            
            app.db('games')
                .update(game)
                .where({ id: game.id })
                .then(_ => res.status(204).send())
                .catch(err => {
                    console.error(err)
                    res.status(500).send(err)
                })
        } else {
            app.db('games')
                .insert(game)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('games')
            .select('id', 'name', 'desc', 'userId', 'image')
            .then(games => res.json(games))
            .catch(err => res.status(500).send(err))
    }

    const getOwned = (req, res) => {
        app.db('games')
            .select('id', 'name', 'desc', 'userId')
            .where({ 'games.userId': req.user.id })
            .then(games => res.json(games))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('games')
            .select(
                'games.id', 
                'games.name', 
                'games.desc', 
                'games.userId',
                'games.image',
                'users.name as userName',
                'users.email as userMail',
                'users.phone as userPhone'
            )
            .join('users', 'games.userId', 'users.id')
            .where({ 'games.id': req.params.id })
            .first()
            .then(game => res.json(game))
            .catch(err => {
                console.error(err)
                res.status(500).send(err)
            })
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('games')
                .where({ id: req.params.id }).del()
                
            existsOrError(rowsDeleted, 'Jogo não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const uploadImg = async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        try {    
            await app.db('games')
                .update({ image: req.file.filename })
                .where({ id: req.params.id })
                .then(_ => res.json(req.file.filename))
        } catch (err) {
            res.status(400).send(err);
        }

        if (!req.file) {
            console.log(req)
            return res.status(400).json({ error: 'No file uploaded' });
        }
    }

    return { save, get, getById, getOwned, remove, uploadImg }
}