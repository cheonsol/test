let account = [];

const savedData = localStorage.getItem('accountDate');
if (savedData) {
    account = JSON.parse(savedData);
}

const saveButton = document.querySelector('#addButton');
const listElement = document.getElementById('list');
const inputName = document.querySelector('#inputName');
const inputPrice = document.querySelector('#inputPrice');

function saveData() {
    localStorage.setItem('accountDate', JSON.stringify(account));
}

function add() {
    const nameValue = inputName.value;
    const priceValue = inputPrice.value;
    const price = parseInt(priceValue, 10);

    if (document.querySelector('.tagButton.tagActive') === null) {
        alert('수입/지출을 먼저 선택해주세요.');
        return;
    }
    if (nameValue.trim() === '' || priceValue.trim() === '') {
        alert('내용과 금액을 모두 입력해주세요.');
        return;
    }
    if (isNaN(price)) {
        alert('금액에는 숫자만 입력할 수 있습니다.');
        inputPrice.value = '';
        return;
    }

    const isExpense = document.getElementById('use').classList.contains('tagActive');
    const finalPrice = isExpense ? price * -1 : price;

    const newItem = {
        id: Date.now(),
        name: nameValue,
        price: finalPrice,
        registDate: new Date().toLocaleString('ko-KR')
    };

    account.push(newItem);

    inputName.value = '';
    inputPrice.value = '';

    updateUI();
    saveData();
}

function del(id) {
    account = account.filter(item => item.id !== id);
    updateUI();
    saveData();
}

function show() {
    const activeFilter = document.querySelector('.historyButton.historyActive');
    let filteredAccount = account;

    if (activeFilter) {
        if (activeFilter.id === 'getHistory') {
            filteredAccount = account.filter(item => item.price > 0);
        } else if (activeFilter.id === 'spentHistory') {
            filteredAccount = account.filter(item => item.price < 0);
        }
    }

    let listHTML = '';
    filteredAccount.forEach(item => {
        const isIncome = item.price > 0;
        const idValue = isIncome ? 'getColor' : 'spentColor';
        const sign = isIncome ? '+' : '-';
        
        listHTML += `
            <div class="list-all">
                <div class="inline">
                    <div class="front">
                        <div class="date">${item.registDate}</div>
                        <div class="list-name">${item.name}</div>
                    </div>
                    <div class="list-price" id="${idValue}">
                        ${sign} ${Math.abs(item.price).toLocaleString()}
                    </div>
                </div>
                <div class="delButton"><button data-id="${item.id}">삭제</button></div>
            </div>`;
    });

    listElement.innerHTML = listHTML;
}

function updateTotalIncome() {
    const totalIncomeElement = document.querySelector('#allMoney');
    const total = account
        .filter(item => item.price > 0)
        .reduce((sum, item) => sum + item.price, 0);
    totalIncomeElement.textContent = total.toLocaleString();
}

function updateTotalExpense() {
    const totalExpenseElement = document.querySelector('#spentMoney');
    const total = account
        .filter(item => item.price < 0)
        .reduce((sum, item) => sum + item.price, 0);
    totalExpenseElement.textContent = Math.abs(total).toLocaleString();
}

function updateBalance() {
    const balanceElement = document.querySelector('#balance');
    const moneyElement = document.querySelector('#money');
    const total = account.reduce((sum, item) => sum + item.price, 0);

    balanceElement.textContent = total.toLocaleString();
    moneyElement.textContent = total.toLocaleString();

    if (total > 0) {
        balanceElement.className = 'plus';
        moneyElement.className = 'plus';
    } else if (total < 0) {
        balanceElement.className = 'minus';
        moneyElement.className = 'minus';
    } else {
        balanceElement.className = '';
        moneyElement.className = '';
    }
}

function updateUI() {
    show();
    updateTotalIncome();
    updateTotalExpense();
    updateBalance();
}

function setupToggleButtons(selector, activeClass) {
    const buttons = document.querySelectorAll(selector);
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            buttons.forEach(btn => btn.classList.remove(activeClass));
            event.currentTarget.classList.add(activeClass);
            
            if (activeClass === 'historyActive') {
                show();
            }
        });
    });
}

function initializeEventListeners() {
    saveButton.addEventListener('click', add);

    listElement.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.closest('.delButton')) {
            const idToDelete = parseInt(event.target.dataset.id, 10);
            del(idToDelete);
        }
    });

    setupToggleButtons(".tagButton", "tagActive");
    setupToggleButtons(".historyButton", "historyActive");
}

initializeEventListeners();
updateUI();