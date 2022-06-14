const board = document.getElementById("board");
const playing = document.getElementById("players");
const cardsOptions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "V"];
let numberOfcard;
let numberOfplayer;
openCards = [];
cards = [];
players = [];
sameCards = 0;
let playingP = 0;
names = [];
let winner = {player: 'tie', score: 0};
menu();
//////////////////////////////////////////////////
// functions
function gameStart() {
    sameCards = 0;
    playingP = 0;
    openCards = [];
    players = []
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
    cardEL.innerHTML = cards[idx];
    cardEL.id = idx
    cardEL.className = cardEL.innerHTML + " card " + "back"
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
    const delay = document.createElement('div');
    delay.id = id
    delay.innerHTML = players[playingP].player + ' now playing'
    return delay
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

function menu() {
    clean()
    let main = document.createElement('span');
    main.id = 'main';
    main.innerHTML = '<u>main menu</u>'
    let cardsA = document.createElement('div');
    cardsA.id = 'cardsTypes'
    cardsA.className = "menuText"
    cardsAT = document.createElement('label')
    cardsAT.innerHTML = "Cards Tyeps: "
    cardsA.appendChild(cardsAT)
    let cardsAL = document.createElement('select')
    cardsAL.id = 'cardsAmount'
    cardsAL.className = 'block'
    for (i = 2; i <= cardsOptions.length; i++) {
        let op = document.createElement('option');
        op.innerHTML = i
        op.value = i
        cardsAL.appendChild(op)
    }
    cardsA.appendChild(cardsAL)
    let playersA = document.createElement('div');
    playersA.id = 'playersRang'
    playersA.className = "menuText"
    playersAT = document.createElement('label')
    playersAT.innerHTML = "Players Amount: "
    playersA.appendChild(playersAT)
    let playersAL = document.createElement('select')
    playersAL.id = 'playersAmount'
    playersAL.className = 'block'
    for (i = 1; i <= 4; i++) {
        let op = document.createElement('option');
        op.innerHTML = i
        op.value = i
        playersAL.appendChild(op)
    }
    playersA.appendChild(playersAL)
    let playersN = document.createElement('div');
    playersN.id = 'playersNames'
    playersN.innerHTML = "Players Names:"
    playersN.className = "menuText"
    let playerTemp = playerSetup(1)
    playersN.appendChild(playerTemp)
    board.append(logo(), main, logo());
    let start = document.createElement('button');
    start.innerHTML = 'Start Game'
    start.id = 'start'
    main.append(cardsA, playersA, playersN, start)
    /////////// menu event
    playersAL.addEventListener('click', () => {
        while (playersNames.firstChild) {
            playersNames.removeChild(playersNames.firstChild)
        }
        playerTemp.innerHTML = `<label>Players Names:</label>`
        playersNames.appendChild(playerTemp)
        for (i = 1; i <= playersAL.value; i++) {
            let pl = playerSetup(i)
            playersNames.appendChild(pl)
        }
    })
    start.addEventListener('click', () => {
        numberOfcard = Number(cardsAL.value);
        numberOfplayer = Number(playersAL.value);
        let i = 1;
        names = [];
        for (i = 1; i <= numberOfplayer; i++) {
            names.push(document.querySelector(`#palyer${i}`).value)
        }
        gameStart()
    })
}
///////////////////////////////////////////////////////////
// event listenrs
board.addEventListener('click', (i) => {
    if (i.target == document.getElementById('board') || i.target == openCards[0] || i.target.className.includes('flip') ||
        i.target == document.getElementById('daley') || i.target == document.getElementById('Ddaley') ||
        document.getElementById('main') || i.target.id == 'start') {} 
        else {
        i.target.className = "card flip " + i.target.innerHTML;
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
                    let end = document.createElement('div');
                    end.id = 'Ddaley';
                    board.appendChild(end)
                    let Eend = document.createElement('div');
                    Eend.id = 'daley';
                    if(winner.player == 'Tie'){
                        Eend.innerText = `Game Over \n Its A Tie!`
                    }else{
                    Eend.innerText = `Game Over \n The winner is ${winner.player}`
                    }
                    end.appendChild(Eend)
                }
            } else {
                if ((players.length - 1) == playingP) {
                    playingP = 0
                    const Ddaley = Fdaley('Ddaley');
                    board.appendChild(Ddaley)
                    if (numberOfplayer == 1) {} else {
                        setTimeout(() => {
                            const delay = Fdaley('daley')
                            const theDaley = document.getElementById('Ddaley');
                            theDaley.appendChild(delay)
                        }, 800)
                    }
                } else {
                    playingP++
                    const Ddaley = Fdaley('Ddaley');
                    board.appendChild(Ddaley);
                    setTimeout(() => {
                        const delay = Fdaley('daley')
                        const theDaley = document.getElementById('Ddaley');
                        theDaley.appendChild(delay)
                    }, 800)
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
        board.removeChild(document.getElementById('Ddaley'));
        for (i of openCards) {
            i.className = i.innerHTML + " card " + "back"
        }
        openCards = []
    }
})