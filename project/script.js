const account = [];

const saveButton = document.querySelector('#addButton');


saveButton.addEventListener('click', add);

function show(){
    const list = document.getElementById('list');

    list.innerHTML='';


    account.forEach(item => {
        const idValue = item.price > 0 ? 'getColor' : 'spentColor';
        const sign = item.price > 0 ? '+' : '-'
        const itemHTML=
        `<div class="list-all">
            <div class = inline>
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
            
            <div class ="delButton"><button>삭제</button></div>
        
            </div>
            
        </div>`;
        list.innerHTML += itemHTML;
    })
}

function add() {
    const inputName = document.querySelector('#inputName');
    const inputPrice = document.querySelector('#inputPrice');

    
    const check = document.getElementById('use').classList.contains('tagActive');

    const name = inputName.value;
    let price = parseInt(inputPrice.value);

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

   if(total > 0){
    balance.classList = 'plus';
   }else if(total<0){
    balance.classList = 'minus';
   }
}




clickButton();
clickHistory();
show();
allGet();
spentMoney();
balance();
 