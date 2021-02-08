const ADJECTIVES = ['Красивый', 'Умный', 'Красный', 'Большой', 'Маленький'];
const NOUNS = ['пес', 'стол', 'диван', 'чемодан', 'человек'];
const VERBS = ['стоит', 'лежит', 'висит', 'находится', 'зашел'];

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

function send(e) {
    e.preventDefault();

    let botMessageText = ADJECTIVES.random() + ' ' + NOUNS.random() + ' ' + VERBS.random();

    sendMessage(botMessageText);
}


function calculate() {
    let expression = messageValue.value;

    let botMessageText;

    try {
        botMessageText = eval(expression);
    } catch (e) {
        sendMessage('Wrong expression');

        return;
    }

    sendMessage("Answer: " + botMessageText.toString());
}

function sendMessage(botMessageText) {

    if (messageValue.value !== '') {
        let message = createDefaultMessage(messageValue.value);
        createDeleteSymbol(message);
        message.style.alignSelf = 'flex-end';
        chatWindow.append(message);

        createBotMessage(botMessageText);

        messageValue.value = '';
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function createBotMessage(botMessageText) {
        let botMessage = createDefaultMessage('...');
        chatWindow.append(botMessage);

        setTimeout(updateBotMessage, 500, botMessage, botMessageText);
    }

    function updateBotMessage(botMessage, botTextMessage) {
        botMessage.innerText = botTextMessage;

        createDeleteSymbol(botMessage);

        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function createDefaultMessage(value) {
        let message = document.createElement('div');
        message.className = 'user-message';

        message.innerText = value;

        return message;
    }

    function createDeleteSymbol(message) {
        let deleteSymbol = document.createElement('div');
        deleteSymbol.className = 'delete-symbol';
        deleteSymbol.innerText = "✖";
        deleteSymbol.addEventListener('click', deleteMessage);

        message.insertAdjacentElement('afterbegin', deleteSymbol);

    }

    function deleteMessage(event) {
        event.target.parentElement.remove();
    }
}

function dropdown() {
    calculateButton.hidden = !calculateButton.hidden ?? calculateButton.hidden;
}

let chatWindow = document.querySelector('.chat-window');
let chatForm = document.querySelector('#chatFrom');
let messageValue = document.querySelector('#message');
let calculateButton = document.querySelector('.calculate-button');
let dropdownButton = document.querySelector('.dropdown-button');

window.onclick = function (event) {
    if (calculateButton.hidden === false && event.target !== dropdownButton) {
        calculateButton.hidden = true;
    }
}

chatForm.addEventListener('submit', send);
