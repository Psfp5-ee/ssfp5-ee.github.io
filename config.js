// Telegram Bot Configuration
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE'; // Get from BotFather
const ADMIN_CHAT_ID = 'YOUR_ADMIN_CHAT_ID_HERE'; // Your Telegram ID as admin

// Product Catalog (Mobile Legends Diamonds)
const products = [
    { id: 1, name: '8 Diamonds', diamonds: 8, price: 15, bonus: 0, image: 'diamond_small.png' },
    { id: 2, name: '32 + 3 Diamonds', diamonds: 32, price: 55, bonus: 3, image: 'diamond_medium.png' },
    { id: 3, name: '80 + 8 Diamonds', diamonds: 80, price: 125, bonus: 8, image: 'diamond_large.png' },
    { id: 4, name: '120 + 12 Diamonds', diamonds: 120, price: 200, bonus: 12, image: 'diamond_large.png' },
    { id: 5, name: '239 + 25 Diamonds', diamonds: 239, price: 400, bonus: 25, image: 'diamond_chest.png' },
    { id: 6, name: '396 + 44 Diamonds', diamonds: 396, price: 650, bonus: 44, image: 'diamond_chest.png' },
    { id: 7, name: '633 + 101 Diamonds', diamonds: 633, price: 1000, bonus: 101, image: 'diamond_chest.png' },
    { id: 8, name: '791 + 142 Diamonds', diamonds: 791, price: 1300, bonus: 142, image: 'diamond_chest.png' },
    { id: 9, name: '1186 + 224 Diamonds', diamonds: 1186, price: 1800, bonus: 224, image: 'diamond_chest.png' },
    { id: 10, name: '1581 + 300 Diamonds', diamonds: 1581, price: 2500, bonus: 300, image: 'diamond_chest.png' },
    { id: 11, name: '2271 + 474 Diamonds', diamonds: 2271, price: 3600, bonus: 474, image: 'diamond_chest.png' },
    { id: 12, name: '5136 + 1027 Diamonds', diamonds: 5136, price: 8000, bonus: 1027, image: 'diamond_chest.png' }
];

// Redemption Codes (Simulated, replace with database in production)
let redemptionCodes = {
    1: ['CODE_8_001', 'CODE_8_002'], // 8 Diamonds
    2: ['CODE_32_001', 'CODE_32_002'], // 32 + 3 Diamonds
    3: ['CODE_80_001', 'CODE_80_002'], // 80 + 8 Diamonds
    4: ['CODE_120_001', 'CODE_120_002'], // 120 + 12 Diamonds
    5: ['CODE_239_001', 'CODE_239_002'], // 239 + 25 Diamonds
    6: ['CODE_396_001', 'CODE_396_002'], // 396 + 44 Diamonds
    7: ['CODE_633_001', 'CODE_633_002'], // 633 + 101 Diamonds
    8: ['CODE_791_001', 'CODE_791_002'], // 791 + 142 Diamonds
    9: ['CODE_1186_001', 'CODE_1186_002'], // 1186 + 224 Diamonds
    10: ['CODE_1581_001', 'CODE_1581_002'], // 1581 + 300 Diamonds
    11: ['CODE_2271_001', 'CODE_2271_002'], // 2271 + 474 Diamonds
    12: ['CODE_5136_001', 'CODE_5136_002'] // 5136 + 1027 Diamonds
};

// User Data (Simulated, replace with database in production)
let userData = {
    username: '@User',
    userId: '12345',
    balance: 0.00
};

export { TELEGRAM_BOT_TOKEN, ADMIN_CHAT_ID, products, redemptionCodes, userData };