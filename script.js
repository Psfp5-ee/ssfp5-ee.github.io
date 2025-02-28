import { products, redemptionCodes, userData } from './config.js';

// DOM Elements
const catalogSection = document.getElementById('catalog');
const cartSection = document.getElementById('cart');
const profileSection = document.getElementById('profile');
const catalogItems = document.getElementById('catalog-items');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const navCatalog = document.getElementById('nav-catalog');
const navCart = document.getElementById('nav-cart');
const navProfile = document.getElementById('nav-profile');
const userUsername = document.getElementById('user-username');
const userId = document.getElementById('user-id');
const userBalance = document.getElementById('user-balance');
const addBalanceBtn = document.getElementById('add-balance-btn');
const balanceForm = document.getElementById('balance-form');
const balanceAmount = document.getElementById('balance-amount');
const submitBalance = document.getElementById('submit-balance');
const paymentOptions = document.getElementById('payment-options');

let cart = [];

// Initialize User Data
userUsername.textContent = userData.username;
userId.textContent = userData.userId;
userBalance.textContent = `${userData.balance.toFixed(2)} ₽`;

// Render Catalog
function renderCatalog() {
    catalogItems.innerHTML = '';
    products.forEach(product => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name}</p>
            <p class="price">${product.price} ₽</p>
            <button onclick="addToCart(${product.id})">В Корзину</button>
        `;
        catalogItems.appendChild(item);
    });
}

// Add to Cart
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    updateCart();
};

// Update Cart Display
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `
            ${item.name} - ${item.price} ₽
            <button onclick="removeFromCart(${index})">Удалить</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price;
    });
    cartTotal.textContent = `К оплате: ${total.toFixed(2)} ₽`;
}

// Remove from Cart
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCart();
};

// Checkout
checkoutBtn.addEventListener('click', () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    if (paymentMethod === 'balance' && userData.balance >= total) {
        userData.balance -= total;
        userBalance.textContent = `${userData.balance.toFixed(2)} ₽`;
        processPurchase();
    } else if (paymentMethod === 'external') {
        alert('Переход к внешней платежной системе (интеграция требуется)');
        // Here, integrate with your payment system (e.g., Qiwi, Yandex.Kassa, etc.)
        processPurchase();
    } else {
        alert('Недостаточно средств на балансе.');
    }
});

// Process Purchase (Generate and Send Redemption Code via Telegram)
function processPurchase() {
    cart.forEach(item => {
        const codes = redemptionCodes[item.id];
        if (codes && codes.length > 0) {
            const code = codes.pop(); // Remove and get the last code
            alert(`Ваш код для ${item.name}: ${code}\nИспользуйте /redeem ${code} в Telegram боте.`);
            // Here, you would send the code via the Telegram bot to the user's chat
        }
    });
    cart = [];
    updateCart();
}

// Balance Management
addBalanceBtn.addEventListener('click', () => {
    balanceForm.classList.toggle('hidden');
});

submitBalance.addEventListener('click', () => {
    const amount = parseFloat(balanceAmount.value);
    if (amount > 0) {
        userData.balance += amount;
        userBalance.textContent = `${userData.balance.toFixed(2)} ₽`;
        balanceForm.classList.add('hidden');
        balanceAmount.value = '';
        alert('Баланс успешно пополнен!');
    } else {
        alert('Введите корректную сумму.');
    }
});

// Navigation
navCatalog.addEventListener('click', () => {
    catalogSection.style.display = 'block';
    cartSection.style.display = 'none';
    profileSection.style.display = 'none';
    navCatalog.classList.add('active');
    navCart.classList.remove('active');
    navProfile.classList.remove('active');
});

navCart.addEventListener('click', () => {
    catalogSection.style.display = 'none';
    cartSection.style.display = 'block';
    profileSection.style.display = 'none';
    navCatalog.classList.remove('active');
    navCart.classList.add('active');
    navProfile.classList.remove('active');
    updateCart();
});

navProfile.addEventListener('click', () => {
    catalogSection.style.display = 'none';
    cartSection.style.display = 'none';
    profileSection.style.display = 'block';
    navCatalog.classList.remove('active');
    navCart.classList.remove('active');
    navProfile.classList.add('active');
});

// Initialize
renderCatalog();
navCatalog.click(); // Default to Catalog view