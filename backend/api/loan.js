const bcrypt = require('bcrypt-nodejs')
const mail = require('../config/mail')
const moment = require('moment')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError, validateDateRange } = app.api.validation

    // mesmo metodo para novo usuario e update (com parametro id definido)
    const save = async (req, res) => {
        const loan = { ...req.body }
        if(req.params.id) loan.id = req.params.id

        try {
            existsOrError(loan.gameId, 'Jogo não informado')
            existsOrError(loan.endAt, 'Data de término não informada')
            validateDateRange(loan.beginAt, loan.endAt, 'Datas inválidas. Data de término não pode ser inferior a de início.')
            await validateNoOverlappingLoans(loan.gameId, loan.beginAt, loan.endAt, 'Jogo já possui empréstimo vigente no período')
        } catch(msg) {
            console.error(msg)
            return res.status(400).send(msg)
        }

        if(loan.id) {
            delete loan.gameName
            delete loan.userName
            delete loan.gameUserId
            app.db('loans')
                .update(loan)
                .where({ id: loan.id })
                .then(async _ => {
                    const loanUser = await app.api.user.getByUserId(loan.userId)
                    await mail.send('Emprestimo - mudança de status', `Sua solicitacao de emprestimo encontra-se ${loan.status}`, loanUser.email);
                    res.status(204).send()
                })
                .catch(err => {
                    console.error(err)
                    res.status(500).send(err)
                })
        } else {
            app.db('loans')
                .insert(loan)
                .then(async _ => {
                    const gameUser = await app.api.user.getUserByGameId(loan.gameId)
                    await mail.send('Emprestimo solicitado', 'Foi solicitado um emprestimo para seu jogo.', gameUser.email);
                    res.status(204).send()
                })
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('loans')
            .select(
                'loans.id', 
                'loans.gameId', 
                'loans.beginAt', 
                'loans.endAt', 
                'loans.userId', 
                'loans.status',
                'users.name as userName',
                'games.name as gameName',
                'games.userId as gameUserId'
            )
            .join('users', 'loans.userId', 'users.id')
            .join('games', 'loans.gameId', 'games.id')
            .then(loans => res.json(loans))
            .catch(err => {
                console.error(err)
                res.status(500).send(err)
            })
    }

    const getLoanedToUser = (req, res) => {
        app.db('loans')
            .select(
                'loans.id', 
                'loans.gameId', 
                'loans.beginAt', 
                'loans.endAt', 
                'loans.userId', 
                'loans.status',
                'users.name as userName',
                'games.name as gameName',
                'games.userId as gameUserId'
            )
            .join('users', 'loans.userId', 'users.id')
            .join('games', 'loans.gameId', 'games.id')
            .where({ 'loans.userId': req.user.id })
            .then(loans => res.json(loans))
            .catch(err => {
                console.error(err)
                res.status(500).send(err)
            })
    }

    const getLoanedByUser = (req, res) => {
        app.db('loans')
            .select(
                'loans.id', 
                'loans.gameId', 
                'loans.beginAt', 
                'loans.endAt', 
                'loans.userId', 
                'loans.status',
                'users.name as userName',
                'games.name as gameName',
                'games.userId as gameUserId'
            )
            .join('users', 'loans.userId', 'users.id')
            .join('games', 'loans.gameId', 'games.id')
            .where({ 'games.userId': req.user.id })
            .then(loans => res.json(loans))
            .catch(err => {
                console.error(err)
                res.status(500).send(err)
            })
    }

    const getById = (req, res) => {
        app.db('loans')
            .select(
                'loans.id', 
                'loans.gameId', 
                'loans.beginAt', 
                'loans.endAt', 
                'loans.userId', 
                'loans.status',
                'users.name as userName',
                'games.name as gameName',
                'games.userId as gameUserId'
            )
            .join('users', 'loans.userId', 'users.id')
            .join('games', 'loans.gameId', 'games.id')
            .where({ 'loans.id': req.params.id })
            .first()
            .then(loan => res.json(loan))
            .catch(err => {
                console.error(err)
                res.status(500).send(err)
            })
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

    async function validateNoOverlappingLoans(gameId, beginAt, endAt, msg) {
        const now = moment(); // Get the current date and time using moment.js
      
        // Using raw SQL query
        const sqlQuery = `SELECT * FROM loans WHERE gameId = ? AND status = 'Vigente' AND ((beginAt < ? AND endAt > ?) OR (beginAt < ? AND endAt > ?)) LIMIT 1`;

        const bindings = [gameId, endAt, beginAt, endAt, beginAt];

        const [overlappingLoan] = await app.db.raw(sqlQuery, bindings);

        if (overlappingLoan.length > 0) {
            throw msg; // There is an overlapping loan with status 'Vigente'
        }
    }

    return { save, get, getById, remove, getLoanedToUser, getLoanedByUser }
}