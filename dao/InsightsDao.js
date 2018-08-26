const connectionFactory = require('../services/connectionFactory')
const knex = connectionFactory.knex;

module.exports = {
    compareByMonth(id) {
        return (async () => {

            const totalActualMonth = await knex.select(`valor`).from('transacoes')
                .where({ id_microempreendedor: id })
                .andWhereRaw(`MONTH(date) = MONTH(CURRENT_DATE())`)

            const totalLastMonth = await knex.select(`valor`).from('transacoes')
                .where({ id_microempreendedor: id })
                .andWhereRaw(`MONTH(date) = (MONTH(CURRENT_DATE()) - 1)`)

            let message;
            if (totalActualMonth < totalLastMonth) {
                message = 'Oh você regrediu! Precisamo mudara isso'
            } else {
                message = 'Yes você progrediu'
            }

            return { message, totalActualMonth, totalLastMonth }
        })()

    },

    compareCompetitive(id, segment) {
        return (async () => {

            const totalActualMonth = await knex.select(`valor`).from('transacoes')
                .where({ id_microempreendedor: id })
                .andWhereRaw(`MONTH(date) = MONTH(CURRENT_DATE())`)


            const usersOfSegment = await knex.select('valor').from('transacoes')
                .where({ categoria: segment , tipo_transacao : 'credito'})
                .andWhereRaw(`MONTH(date) = MONTH(CURRENT_DATE())`)
                .andWhereNot({ id_microempreendedor: id })


            let totalValue = 0;
            usersOfSegment.forEach(item => {
                totalValue = totalValue + Number(item.valor)
            });

            const average = totalValue / usersOfSegment.length


            let message;

            if (parseInt(average) < 50 ) {
                message = "Você está ficando para trás, vamos criar estrategias para o proximo mês!"
            } else {
                message = "Isso ai, você está bem em relação ao seus concorrentes, continue assim!"
            }


            return { percent: parseInt(average) + "%", message }

        })()

    }
}
