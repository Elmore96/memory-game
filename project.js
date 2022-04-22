let numberOfcard;
let numberOfplayer;
    openCards = [];
    sameCards = 0;
    cards = [];
    players = []
    playingP = 0;
    pl1 = "player 1";
    pl2 = "player 2";
    pl3 = "player 3";
    pl4 = "player 4";
const cardsOptions = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","V"];
const playerOpstions = [
    {player: pl1,score: 0},
    {player: pl2,score: 0},
    {player: pl3,score: 0},
    {player: pl4,score: 0},
];
gameStart();
////////////////////////////////////
// functions
function gameStart(){
    playingP = 0;
    numberOfcard = Number(prompt("how many diffrent cards types?\n*btween 2 to 10"));
    numberOfcards()
    numberOfplayer = Number(prompt("how many players?\n*up to 4"))
    numberOfplayers()
shufel(cards);
const board = document.getElementById("board");
const playing = document.getElementById("players");
    while(board.firstChild){
    board.removeChild(board.firstChild);
}
    while(playing.firstChild){
    playing.removeChild(playing.firstChild);
}
for(i in cards){
    const element = createCard(i);
    board.appendChild(element);
}
for (i in players){
    const element = createPlayer(i);
    playing.appendChild(element)
}
playingP = 0
playerRotetion(players);
}
function numberOfcards() {
    while(isNaN(numberOfcard) || numberOfcard <2 || numberOfcard > 20){
        numberOfcard = Number(prompt("enter valid number"))
    }
    let temp = cardsOptions.slice(0,(numberOfcard))
    return cards = temp.concat(temp)
}
function numberOfplayers(){
    while(isNaN(numberOfplayer) || numberOfplayer < 1 || numberOfplayer >4){
        numberOfplayer = Number(prompt("enter valid number"))
    }
    let temp = playerOpstions.slice(0,(numberOfplayer))
    return players = temp
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
function createPlayer(idx) {
    const playerEL = document.createElement("span");
    playerEL.innerHTML = players[playingP].player + " score: " + players[playingP].score;
    playerEL.id = "player-" + idx 
    playingP ++
    return playerEL
}
function playerRotetion(players){
    if(players.length == playingP){
            playingP = 0
        alert(players[playingP].player + ' now playing');
    }else{
        alert(players[playingP].player + ' now playing');
    }
}
function scoreUpdate(){
    let Pscore = document.getElementById("player-" + playingP);
    Pscore.innerHTML = players[playingP].player + " score: " + players[playingP].score;
    return Pscore
}
/////////////////////////////////
// event listenrs
board.addEventListener('click', () =>{
    if(openCards.length == 2){
        for(i of openCards){
            i.className = i.innerHTML + " card " + "back" 
        }
        openCards = []
        playerRotetion(players)
    }
})

board.addEventListener('click',(i)=>{
    const playing = document.getElementById("players");
    if(i.target == document.getElementById('board') || i.target == openCards[0] || i.target.className.includes('flip')){
    }else{
        let target = i.target;
        target.className = "card flip " + target.innerHTML;
        openCards.push(target);
    }
    if(openCards.length == 2){
        if(openCards[0].innerHTML == openCards[1].innerHTML){
            sameCards += 2;
            openCards = [];
            players[playingP].score += 1;
            let element = scoreUpdate();
                oldChild = document.getElementById("player-" + playingP)
            playing.replaceChild(element, oldChild)
        }else{
            playingP++
        }
    }
})
