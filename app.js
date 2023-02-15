
import express from 'express'
import { PORT, TOKEN } from './config.js'
import {Telegraf} from 'telegraf'

import fs from 'fs'
// try {
//     var data = fs.readFileSync('file.txt', 'utf8');
//     console.log(data.toString());
// } catch(e) {
//     console.log('Error:', e.stack);
// }

const app = express()

const bot = new Telegraf(TOKEN)
const regex = new RegExp('^(http(s):\\/\\/.)[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&\\/\\/=]*)[\\r\\n][\\+\\d]?(?:[\\d\\-\\.\\s()]*)$')
const linkRegex = new RegExp('.*(\\r\\n|\\r|\\n)')
const phoneRegex = new RegExp('(\\r\\n|\\r|\\n).*')

let count = 0
// const parseString = (str) => {
//     const link = linkRegex.test(str)
//     if (linkRegex.test(str)) {
//         console.log('link valid')
//     } else {
//         console.log('link is no valid')
//     }
//
//     if (phoneRegex.test(str)) {
//         console.log('phone valid')
//     } else {
//         console.log('phone is no valid')
//     }
//
// }

bot.start(ctx => {
    ctx.reply('Welcome, bro')
})

// bot.on('text', ctx => {
//     ctx.reply('just text')
// })
let linkText = '';
let phoneText = '';

bot.hears(regex, ctx => {
    count++

    if (linkRegex.test(ctx.message.text)) {
        linkText = ctx.message.text.match(linkRegex).toString().replace(/,/g, "").trim()
    } else {
        console.log('link is no valid:\n'+ctx.message.text)
    }

    if (phoneRegex.test(ctx.message.text)) {
        phoneText = ctx.message.text.match(phoneRegex).toString().replace(/,/g, "").replace(/ /g, "").trim()
    } else {
        ctx.reply('Телефон указано не верно'+ctx.message.text)
    }

    const msgArray = ['Здрасте+еще+продаете?','Доброгро времени суток, еще продается?','добрый день продается??','еще актуально здравствуйте']

    const msgText = msgArray[Math.floor(Math.random()*msgArray.length)];


    const message = `${count}\r\n${linkText}\r\n<a href="https://api.whatsapp.com/send?phone=${phoneText}&text=${msgText}+${linkText}">Написать в WhatsApp</a>\r\n<a href="https://web.whatsapp.com/send?phone=${phoneText}&text=${msgText}+${linkText}">Написать в WhatsApp WEB</a>\r\n<a href="https://t.me/${phoneText}">Написать в Telegram</a>\r\n<a href="viber://chat?number=${phoneText}">Написать в Viber</a>`



    bot.telegram.sendMessage('-840690525', message ,{parse_mode: 'HTML',disable_web_page_preview:true})

    // bot.telegram.sendMessage('-840690525', 'ссылка: '+linkText+'\nНомер: '+phoneText)
})



bot.launch()
app.get('/', (req, res) => {
    res.send('Hello debug_Yourself1234123')
})



app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))
