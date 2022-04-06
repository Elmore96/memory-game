const cardsOptions = ["A","B","C","D","E","F","G","H","I","J"];
let numberOfcard = Number(prompt("how many diffrent cards types?\n*btween 2 to 10"));
let cards = []
numberOfcards()

shufel(cards);
const board = document.getElementById("board")
for(i in cards){
    const element = createCard(i)
    board.appendChild(element);
}
function numberOfcards() {
    while(isNaN(numberOfcard) || numberOfcard <2 || numberOfcard >10){
        numberOfcard = Number(prompt("enter valid number"))
    }
    let temp = cardsOptions.slice(0,(numberOfcard))
    return cards = temp.concat(temp)
}

function shufel(arr) {
    // cards = cards.sort(() => Math.random() - 0.5)}
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
    cardEL.className = "card"
    return cardEL
}