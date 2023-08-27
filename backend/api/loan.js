const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    // mesmo metodo para novo usuario e update (com parametro id definido)
    const save = async (req, res) => {
        const loan = { ...req.body }
        if(req.params.id) loan.id = req.params.id

        try {
            existsOrError(loan.gameId, 'Jogo não informado')
            existsOrError(loan.endAt, 'Data de término não informada')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(loan.id) {
            app.db('loans')
                .update(loan)
                .where({ id: loan.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('loans')
                .insert(loan)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('loans')
            .select('id', 'gameId', 'endAt', 'userId')
            .then(loans => res.json(loans))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('loans')
            .select('id', 'gameId', 'endAt', 'userId')
            .where({ id: req.params.id })
            .first()
            .then(loan => res.json(loan))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('loans')
                .where({ id: req.params.id }).del()
                
            existsOrError(rowsDeleted, 'Empréstimo não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}