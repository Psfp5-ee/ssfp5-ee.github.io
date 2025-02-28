import TelegramBot from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN, ADMIN_CHAT_ID, products, redemptionCodes, userData } from './config.js';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });

// Admin Commands
bot.onText(/\/addcode/, (msg) => {
    const chatId = msg.chat.id;
    if (chatId.toString() !== ADMIN_CHAT_ID) {
        bot.sendMessage(chatId, 'У вас нет прав для этой команды.');
        return;
    }

    bot.sendMessage(chatId, 'Введите ID товара и код (например, "1 CODE_8_001"):');
    bot.once('text', (codeMsg) => {
        const [productId, code] = codeMsg.text.split(' ');
        const id = parseInt(productId);
        if (products.some(p => p.id === id) && code) {
            redemptionCodes[id] = redemptionCodes[id] || [];
            redemptionCodes[id].push(code);
            bot.sendMessage(chatId, `Код ${code} добавлен для товара ID ${id}.`);
        } else {
            bot.sendMessage(chatId, 'Неверный ID товара или формат кода.');
        }
    });
});

// User Redemption
bot.onText(/\/redeem (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const code = match[1].trim();

    for (const [productId, codes] of Object.entries(redemptionCodes)) {
        if (codes.includes(code)) {
            const product = products.find(p => p.id === parseInt(productId));
            codes.splice(codes.indexOf(code), 1); // Remove used code
            bot.sendMessage(chatId, `Вы получили ${product.diamonds} + ${product.bonus} алмазов!`);
            return;
        }
    }
    bot.sendMessage(chatId, 'Неверный код или код уже использован.');
});

// Start Command
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Добро пожаловать в VenomShop! Используйте /redeem [код] для активации алмазов.');
});

console.log('Bot started...');