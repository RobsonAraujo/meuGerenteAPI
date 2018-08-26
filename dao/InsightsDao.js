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



    }
}