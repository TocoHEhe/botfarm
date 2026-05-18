const mineflayer = require('mineflayer')
const express = require('express')

const app = express()

// Web server cho Render
app.get('/', (req, res) => {
  res.send('Bot online')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Web server running on port ${PORT}`)
})

// ===== CONFIG =====
const config = {
  host: '193.56.156.28', // IP server
  port: 29024,           // Port server
  username: 'AFK_Bot',   // Tên bot
  auth: 'offline',      // offline = cracked
  version: false
}

// ===== BOT =====
function createBot() {
  console.log('Connecting...')

  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username,
    auth: config.auth,
    version: config.version,
    connectTimeout: 30000
  })

  bot.on('login', () => {
    console.log('Logged in!')
  })

  bot.on('spawn', () => {
    console.log('Bot joined server!')
  })

  bot.on('chat', (username, message) => {
    if (username === bot.username) return

    console.log(`<${username}> ${message}`)

    // test reply
    if (message === 'ping') {
      bot.chat('pong')
    }
  })

  bot.on('kicked', reason => {
    console.log('Kicked:', reason)
  })

  bot.on('end', () => {
    console.log('Disconnected! Reconnecting in 15s...')
    setTimeout(createBot, 15000)
  })

  bot.on('error', err => {
    console.log('Error:', err)
  })
}

createBot()
