const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    // mesmo metodo para novo usuario e update (com parametro id definido)
    const save = async (req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id

        // if(!req.originalUrl.startsWith('/users')) user.admin = false
        // if(!req.user || !req.user.admin) user.admin = false

        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'E-mail não informado')
            existsOrError(user.phone, 'Telefone não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
            equalsOrError(user.password, user.confirmPassword,
                'Senhas não conferem')

            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()
            if(!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.confirmPassword

        if(user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                //.whereNull('deletedAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'phone')
            //.whereNull('deletedAt')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = async (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'phone')
            .where({ id: req.params.id })
            //.whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const games = await app.db('games')
                .where({ userId: req.params.id })
            notExistsOrError(games, 'Usuário possui jogos.')

            const rowsDeleted = await app.db('users')
                .where({ id: req.params.id }).del()
                
            existsOrError(rowsDeleted, 'Usuário não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    const getUserByGameId = async (gameId) => {
        return app.db('games')
            .where({ id: gameId })
            .select('userId')
            .then(async (rows) => {
                const userId = rows[0].userId;
                // Now, fetch the user's email using the userId
                return getByUserId(userId)
            });
    }

    const getByUserId = async (userId) => {
        return app.db('users')
            .select('id', 'name', 'email', 'phone')
            .where({ id: userId })
            .first()
            .then(user => user)
    }

    return { save, get, getById, remove, getUserByGameId, getByUserId }
}