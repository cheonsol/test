const account = [];

function add(select, text, price){
    return{
        id:String(Date.now()),
        select:select,
        text:text,
        price:price,
    };
}

function save(){
    account.push(add);
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

clickButton();
clickHistory();
 