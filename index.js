
const TelegramAPI = require("node-telegram-bot-api");
const {gameOptions, gameAgainOptions} = require ('./options');
const token = "7138031275:AAEvbyLyYl6MCxwt9DclB3aCJcC1LEyGpTk";

const bot = new TelegramAPI(token, {polling: true});

const cats = {
    '1': 'https://yandex.ru/images/search?pos=11&from=tabbar&img_url=https%3A%2F%2Fi.artfile.ru%2F3626x2416_605819_%5Bwww.ArtFile.ru%5D.jpg&text=коты&rpt=simage&lr=136774',
    '2': 'https://avatars.mds.yandex.net/i?id=ce063291a84e6d5107c1be70420f609038c178ca-5260040-images-thumbs&n=13',
    '3': 'https://avatars.mds.yandex.net/i?id=11795f7dd85d485a4c8506a893386462207a75e0-12639726-images-thumbs&n=13'
    };

const chats = {};


const startGame =  async (chatID) => {
    await bot.sendMessage(chatID, 'Сейчас я загадаю цифру от 1 до 3, если ты угадаешь что я загадал, в награду получишь котика!');
    const randomNumber = Math.floor(Math.random() * (4 - 1) + 1)
    chats[chatID] = randomNumber;
    await bot.sendMessage(chatID, 'Отгадывай', gameOptions)
}


//Старт бота
const start = () => {
    
    bot.setMyCommands([
        {command: '/start', description: 'Приветствие пользователя'},
        {command: '/info', description: 'Основная информация'},
        {command: '/game', description: 'Игра "Угадай цифру, получи кота!"'},
    ])

    bot.on('message', async msg => {
        const userName = msg.from.username;
        const text = msg.text;
        const chatID = msg.chat.id;
        
        if(text === '/start'){
            await bot.sendPhoto(chatID, 'https://www.meme-arsenal.com/memes/d0282b3d6bf11f8b8f8d9bcd8f5ecc49.jpg')
            return bot.sendMessage(chatID, `${userName}! Приветствую тебя в своём боте!`);
        };
        if(text === '/info')
            return bot.sendMessage(chatID, `${userName}, данный бот предназначен для показа способностей автора в программировании на js`);
        
        if(text === '/game'){
            return startGame(chatID);
        }

        return bot.sendMessage(chatID, 'Такой команды нет, попробуй другую!');
    });

    bot.on('callback_query',  async msg => {
        const data = msg.data;
        const chatID = msg.message.chat.id;
        
        if(data === '/again')
        return startGame(chatID);

    bot.sendMessage(chatID, `Твой выбор цифра ${data}`);
    
    if(data == chats[chatID]){
        bot.sendPhoto(chatID, cats[data])
        return await bot.sendMessage(chatID, `Поздравляю! Держи кота!`, gameAgainOptions)
    } else {
        return bot.sendMessage(chatID, `Увы, бот загадал ${chats[chatID]}. Попробуй снова`, gameAgainOptions)
    }

    })
}
start();