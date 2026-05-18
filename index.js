const mineflayer = require('mineflayer')

function createBot() {

    const bot = mineflayer.createBot({
        host: 'kingfish.aternos.host',
        port: 29024,
        username: 'AFK_Bot'
    })

    bot.on('spawn', () => {
        console.log('Bot online')

        setInterval(() => {

            bot.setControlState('jump', true)

            setTimeout(() => {
                bot.setControlState('jump', false)
            }, 500)

        }, 30000)
    })

    bot.on('end', () => {
        console.log('Reconnect...')
        setTimeout(createBot, 5000)
    })

    bot.on('error', err => {
        console.log(err)
    })
}

createBot()
