let account = [];
const saveData = localStorage.getItem('accountDate');

if(saveData){
    account = JSON.parse(saveData);
}

const saveButton = document.querySelector('#addButton');



saveButton.addEventListener('click', add);

function saveData(){
    localStorage.setItem('accountDate', JSON.stringify(account));
    
}
function show(){
    const list = document.getElementById('list');
    

    list.innerHTML='';
    const choice = document.querySelector('.historyButton.historyActive');
    let fieldAccount = account;

    if(choice){
        if (choice.id === 'getHistory') {
            fieldAccount = account.filter(item => item.price > 0);
        } else if (choice.id === 'spentHistory') {
            fieldAccount = account.filter(item => item.price < 0);
        }
    }
    
    fieldAccount.forEach(item => {
        const idValue = item.price > 0 ? 'getColor' : 'spentColor';
        const sign = item.price > 0 ? '+' : '-'
        let itemHTML=
        `<div class="list-all">
            <div class = "inline">
            <div class ="front">
            <div class="date">${item.registDate}</div>
            <div class="list-check">
            
                <div class="list-name">
                    ${item.name}
                    </div>
                </div>
                </div>
                <div class="list-price" id="${idValue}">
                   ${sign} ${Math.abs(item.price)}
                
                </div>
                </div>
            
            <div class ="delButton"><button data-id ="${item.id}">삭제</button></div>
        
            </div>
            
        </div>`;

    
        list.innerHTML += itemHTML;
    })

    const deleteButton = document.querySelectorAll('.delButton button');

    deleteButton.forEach(button =>{
    button.addEventListener('click', (event) => {
        const idToDelete = parseInt(event.currentTarget.dataset.id);

        del(idToDelete);
    })
})

    
}


function add() {

    
    const inputName = document.querySelector('#inputName');
    const inputPrice = document.querySelector('#inputPrice');

    
    const check = document.getElementById('use').classList.contains('tagActive');

    const name = inputName  .value;
    let price = parseInt(inputPrice.value);

    if(inputName.value.trim() === ''){
        alert('이름을 입력해주십시오.');
        return;
    }else if(inputPrice.value.trim() === ''){
        alert('값을 입력해주십시오.');
        return;
    }

    if(document.querySelector('.tagActive') === null){
         alert('수입/지출을 선택해주십시오.');
        return;
    }

    if(isNaN(inputPrice.value)){
        alert('숫자만 입력할 수 있습니다.');
        return;
    }

    if(check){
    price *= -1;
    }

    const newItem = {
      id: Date.now(),
      name:name,
      price:price,
      registDate : new Date().toLocaleString('ko-KR')
    };
    
    account.push(newItem);

    show();
    console.log(account);
    allGet();
    spentMoney();
    balance();
    saveData();
}

function clickButton(){
    var buttons = document.querySelectorAll(".tagButton");
        buttons.forEach(function(button){
            button.addEventListener('click', function(event){
                buttons.forEach(function(btn){
                    btn.classList.remove("tagActive");
            });

            event.currentTarget.classList.add("tagActive");

            console.log("클릭된 버튼:", event.currentTarget);
            
        });
    });
}

function clickHistory(){
    var buttons = document.querySelectorAll(".historyButton");
        buttons.forEach(function(button){
            button.addEventListener('click', function(event){
                buttons.forEach(function(btn){
                    btn.classList.remove("historyActive");
            });

            event.currentTarget.classList.add("historyActive");

            console.log("클릭된 버튼:", event.currentTarget);

            show();
        });

    });

  
}

function allGet(){
    const allMoney = document.querySelector('#allMoney')
   let total = 0;
   for(let i = 0; i< account.length; i++){
        if(account[i].price > 0){
        total += account[i].price;
        }
   }

   console.log("총 합계:", total.toLocaleString());
   allMoney.textContent = `${total.toLocaleString()}`
   return total;
}

function spentMoney(){
    const allMoney = document.querySelector('#spentMoney')
   let total = 0;
   for(let i = 0; i< account.length; i++){
        if(account[i].price < 0){
        total += account[i].price;
        }
   }

   total = Math.abs(total);

   console.log("총 합계:", total.toLocaleString());
   allMoney.textContent = `${total.toLocaleString()}`
   return total;
}

function balance(){
    const getMoney = document.querySelector('#allMoney')
    const spentMoney = document.querySelector('#spentMoney')
    const balance = document.querySelector('#balance')
    const money = document.querySelector('#money')
   let total = 0;
   for(let i = 0; i< account.length; i++){
        if(account[i].price < 0){
            total += account[i].price;
        }else if(account[i].price > 0){
            total +=account[i].price;
        }
         console.log("계산 : ", account[i].price);
   }

   total = total;

  
   console.log("총 합계:", total.toLocaleString());
   balance.textContent = `${total.toLocaleString()}`
   money.textContent = `${total.toLocaleString()}`

   if(total > 0){
    balance.classList = 'plus';
    money.classList = 'plus';
   }else if(total<0){
    balance.classList = 'minus';
    money.classList = 'minus';
   }
}

function del(id){
    account =account.filter(item => item.id !== id);

        update();
    saveData();
   
}

function update(){
    show();
    allGet();
    spentMoney();
    balance();
}




clickButton();
clickHistory();
show();
allGet();
spentMoney();
balance();
 