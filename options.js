module.exports = {
    //Кнопки для игры
gameOptions: {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}]

        ]
    })
},

//Кнопка "играть заново"
gameAgainOptions: {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Играть заново', callback_data: '/again'}]
        ]
    })
}
}