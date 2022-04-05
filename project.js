const cards = ["A","B","C","D","F","A","B","C","D","F"];
shufel(cards);
const board = document.getElementById("board")
for(i in cards){
    const element = createCard(i)
    board.appendChild(element);
}

function shufel(cards) {
    cards = cards.sort(() => Math.random() - 0.5)}
//     for(i in cards){
//         let card = cards[i]
//         cards.splice(i,1)
//         cards.splice(Math.floor(Math.random() * (i + 1)),0,card)
//     }
// }
function createCard(idx){
    const cardEL = document.createElement("div");
    cardEL.innerHTML = cards[idx];
    cardEL.id = idx
    cardEL.className = "card"
    return cardEL
}