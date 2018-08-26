
const insightDao = require('../../dao/InsightsDao')
const winston = require('winston')




// Example get
exports.compareExponencialGrowth = function (req, res) {

    const id = req.params.id



    return insightDao.compareByMonth(id).then(result => {

        if (!result || result.length <= 0) {

            winston.info('InsightsDao-> compareByMonth *Successfully -  not result*')
            return res.status(200).json({
                status: 200,
                message: "Successfully -  not result"
            })
        } else {
            winston.info('InsightsDao-> compareByMonth *The request is OK*')
            return res.status(200).json({
                status: 200,
                message: "The request is OK ",
                data: result
            })
        }
    }).catch(error => {
        winston.error(`InsightsDao-> compareByMonth *${error}*`)
        return res.status(500).json({
            status: 500,
            message: "Internal Server error - " + error
        })
    })

}