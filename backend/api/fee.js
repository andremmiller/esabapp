const bcrypt = require('bcrypt-nodejs')
const mail = require('../config/mail')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validation

    // mesmo metodo para novo usuario e update (com parametro id definido)
    const save = async (req, res) => {
        const fee = { ...req.body }
        if(req.params.id) fee.id = req.params.id

        try {
            existsOrError(fee.value, 'Valor não informado')
            existsOrError(fee.status, 'Status não informado')
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(fee.id) {
            app.db('fees')
                .update(fee)
                .where({ id: fee.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('fees')
                .insert(fee)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const confirmPayment = (req, res) => {
        const loan = { ...req.body }

        app.db('fees')
            .update({status: 'Pago'})
            .where({ loanId: loan.id })
            .then(_ => {
                app.db('loans')
                    .update({status: 'Finalizado'})
                    .where({ id: loan.id })
                    .then(async _ => {
                        const loanUser = await app.api.user.getByUserId(loan.userId)
                        await mail.send('Multa - pagamento confirmado', `Seu emprestimo pendente foi finalizado pelo proprietario`, loanUser.email);
                        res.status(204).send()
                    })
                    .catch(err => res.status(500).send(err))
            })
            .catch(err => res.status(500).send(err))     
    }

    const get = (req, res) => {
        app.db('fees')
            .select('id', 'loanId', 'value', 'status')
            .then(fees => res.json(fees))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('fees')
            .select('id', 'loanId', 'value', 'status')
            .where({ id: req.params.id })
            .first()
            .then(fee => res.json(fee))
            .catch(err => res.status(500).send(err))
    }

    const getByLoanId = (req, res) => {
        app.db('fees')
            .select('id', 'loanId', 'value', 'status')
            .where({ loanId: req.params.loanId })
            .then(fees => res.json(fees))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('fees')
                .where({ id: req.params.id }).del()
                
            existsOrError(rowsDeleted, 'Multa não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove, confirmPayment, getByLoanId }
}