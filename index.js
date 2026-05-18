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
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Bot online')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Web running on ${PORT}`)
})

createBot()
