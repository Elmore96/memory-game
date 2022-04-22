let numberOfcard;
    openCards = [];
    sameCards = 0;
    cards = []
const cardsOptions = ["A","B","C","D","E","F","G","H","I","J"];
gameStart()
function gameStart(){
    numberOfcard = Number(prompt("how many diffrent cards types?\n*btween 2 to 10"));
numberOfcards()

shufel(cards);
const board = document.getElementById("board");
    while(board.firstChild){
    board.removeChild(board.firstChild);
}
for(i in cards){
    const element = createCard(i)
    board.appendChild(element);
}
const allCards = document.getElementsByClassName('card')
}
function numberOfcards() {
    while(isNaN(numberOfcard) || numberOfcard <2 || numberOfcard >10){
        numberOfcard = Number(prompt("enter valid number"))
    }
    let temp = cardsOptions.slice(0,(numberOfcard))
    return cards = temp.concat(temp)
}

function shufel(arr) {
    for(i in arr){
        let card = arr[i]
        arr.splice(i,1)
        arr.splice(Math.floor(Math.random() * cards.length),0,card)
    }
}
function createCard(idx){
    const cardEL = document.createElement("div");
    cardEL.innerHTML = cards[idx];
    cardEL.id = idx
    cardEL.className = cardEL.innerHTML + " card " + "back" 
    return cardEL
}
board.addEventListener('click', () =>{
    if(openCards.length == 2){
        for(i of openCards){
            i.className = i.innerHTML + " card " + "back" 
        }
        openCards = []
    }
})

board.addEventListener('click',(i)=>{
    if(i.target == document.getElementById('board') || i.target == openCards[0] || i.target.className.includes('flip')){
    }else{
    let target = i.target;
    target.className = "card flip " + target.innerHTML;
    openCards.push(target)
}

    if(openCards.length == 2){
        if(openCards[0].innerHTML == openCards[1].innerHTML){
            sameCards += 2
            openCards = []
        }
    }
})
