const board = document.getElementById("board");
const playing = document.getElementById("players");
const cardsOptions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "V"];
let numberOfcard, numberOfplayer = 1;
let openCards = [] , cards = [], players = [], names = [];
let sameCards = 0 , playingP = 0;

winner = {player: 'tie', score: 0};
menu();
//////////////////////////////////////////////////
// functions
function gameStart() {
    sameCards = 0;
    playingP = 0;
    openCards = [];
    players = [];
    let button = {button1: document.querySelector("#menu"), button2: document.querySelector("#reset")};
    button.button1.disabled = false
    button.button2.disabled = false 
    for (i = 0; i < names.length; i++) {
        let object = {
            player: names[i],
            score: 0
        }
        players.push(object)
    }
    let temp = cardsOptions.slice(0, (numberOfcard))
    cards = temp.concat(temp)
    shufel(cards);
    clean()
    for (i in cards) {
        const element = createCard(i);
        board.appendChild(element);
    }
    for (i in players) {
        const element = createPlayer(i);
        playing.appendChild(element)
    }
    playingP = 0
}

function shufel(arr) {
    for (i in arr) {
        let card = arr[i]
        arr.splice(i, 1)
        arr.splice(Math.floor(Math.random() * cards.length), 0, card)
    }
}

function createCard(idx) {
    const cardEL = document.createElement("div");
    cardEL.innerText = cards[idx];
    cardEL.id = idx
    cardEL.className = "card "
    return cardEL
}

function createPlayer(idx) {
    const playerEL = document.createElement("span");
    playerEL.innerHTML = players[playingP].player + " score: " + players[playingP].score;
    playerEL.id = "player-" + idx
    playingP++
    return playerEL
}

function Fdaley(id) {
    const element = document.createElement('div');
    element.id = id
    element.innerHTML = players[playingP].player + ' now playing'
    return element
}

function PopupDaley(end) {
    const popupContainer = Fdaley('Ddaley');
    const popupContext = Fdaley('daley')
    board.appendChild(popupContainer);
    if(end){
        if(winner.player == 'Tie'){
        popupContext.innerText = `Game Over \n Its A Tie!`
        }else{
        popupContext.innerText = `Game Over \n The winner is ${winner.player}`
        }
        setTimeout(() => {
            popupContainer.appendChild(popupContext)
            },400)
    }
    else{
    setTimeout(() => {
        popupContainer.appendChild(popupContext)
        }, 800)
    }
}

function clean() {
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    while (playing.firstChild) {
        playing.removeChild(playing.firstChild);
    }
}

function logo() {
    let logo = document.createElement('span')
    logo.className = 'logo'
    return logo
}

function playerSetup(i) {
    let p = document.createElement('div')
    p.innerHTML = `<label>Player ${i}</label>
<input type='text' name='player${i}' class='block' id='palyer${i}' value='Player ${i}'>`
    return p
}

function sectoreCretion(containerName = String, labelText = String, seltorID = String , range = Array){
    let container = document.createElement('div');
    container.id = containerName;
    container.className = "menuText";
    let label = document.createElement('label');
    label.innerText = labelText;
    let selectore = document.createElement('select');
    selectore.id = seltorID;
    selectore.className = "block";
    for(i = range[0]; i <= range[1]; i++){
        let option = document.createElement('option');
        option.innerHTML = i
        option.value = i
        selectore.appendChild(option)
    }
    container.append(label ,selectore)
    return container
}

function menu() {
    clean()
    let main = document.createElement('span');
    main.id = 'main';
    main.innerHTML = '<u>main menu</u>'
    cardsRange = sectoreCretion('cardsTypes', "Cards Tyeps: ", 'cardsAmount', [2, cardsOptions.length])
    playersRange = sectoreCretion('playersRange', "Players Amount: ", 'playersAmountSelector' , [1, 4])
    let playersNames = document.createElement('div');
    playersNames.id = 'playersNames'
    playersNames.innerHTML = "Players Names:"
    playersNames.className = "menuText"
    let playerTemp = playerSetup(1)
    playersNames.appendChild(playerTemp)
    let start = document.createElement('button');
    start.innerHTML = 'Start Game'
    start.id = 'start'
    main.append(cardsRange, playersRange, playersNames, start)
    board.append(logo(), main, logo());
    /////////// menu event
    playersAmountSelector.addEventListener('click', () => {
        if( numberOfplayer < playersAmountSelector.value){
            for (numberOfplayer; numberOfplayer < playersAmountSelector.value; numberOfplayer++) {
                let pl = playerSetup((numberOfplayer + 1))
                playersNames.appendChild(pl)
                }
            }   
            else{
                while(numberOfplayer > playersAmountSelector.value){
                    playersNames.removeChild(playersNames.lastChild)
                    numberOfplayer-- 
                }
            }
        }
    )
    start.addEventListener('click', () => {
        numberOfcard = document.getElementById('cardsAmount').value;
        names = [];
        for (i = 1; i <= numberOfplayer; i++) {
            names.push(document.querySelector(`#palyer${i}`).value)
        }
        gameStart()
    })
}
function cardOpen(target){
    target.className += ' open'
    setTimeout(()=>{
        target.className = 'card opened ' + target.innerText
    }, 500)
}
function cradClose(card){
    card.className = "card "
}

///////////////////////////////////////////////////////////
// event listenrs
board.addEventListener('click', (i) => {
    if (Array(...document.querySelectorAll('.card')).includes(i.target) && !(i.target.className.includes("card openopened"))){
        cardOpen(i.target);
        openCards.push(i.target);
        if (openCards.length == 2) {
            if (openCards[0].innerHTML == openCards[1].innerHTML) {
                sameCards += 2;
                openCards = [];
                players[playingP].score += 1;
                if(players[playingP].score > winner.score && players[playingP].player != winner.player){
                    winner = players[playingP];
                }else if(players[playingP].score == winner.score && players[playingP].player != winner.player){
                    winner.player = 'Tie'
                }
                let element = document.getElementById("player-" + playingP);
                element.innerHTML = players[playingP].player + " score: " + players[playingP].score;
                if (sameCards == cards.length) {
                    PopupDaley(true)
                }
            } else {
                if ((players.length - 1) == playingP) {
                    playingP = 0
                    PopupDaley(false)
                } else {
                    playingP++
                    PopupDaley(false)
                }
            }
        }
    }
})
board.addEventListener('click', (i) => {
    if (i.target == document.getElementById('daley') || i.target == document.getElementById('Ddaley')) {
        if(sameCards == cards.length){
            menu();
        }
        else{
        board.removeChild(document.getElementById('Ddaley'));
        for (i of openCards) {
            i.className = "card"
            }
        openCards = []
        }
    }
})