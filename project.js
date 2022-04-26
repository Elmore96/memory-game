const board = document.getElementById("board");
const playing = document.getElementById("players");
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
const cardsOptions = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "V"];
menu()
//////////////////////////////////////////////////
// functions
function gameStart() {
    const playerOpstions = [{
            player: pl1,
            score: 0
        },
        {
            player: pl2,
            score: 0
        },
        {
            player: pl3,
            score: 0
        },
        {
            player: pl4,
            score: 0
        },
    ];
    playingP = 0;
    players = [];
    numberOfcards()
    numberOfplayers(playerOpstions)
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

function numberOfcards() {
    let temp = cardsOptions.slice(0, (numberOfcard))
    return cards = temp.concat(temp)
}

function numberOfplayers(arr) {
    let temp = arr.slice(0, (numberOfplayer))
    return players = temp
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

function menu() {
    clean()
    let main = document.createElement('span');
    main.id = 'main';
    main.innerHTML = '<u>main menu</u>'
    let cardsA = document.createElement('div');
    cardsA.id = 'cardsTypes'
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
    playersN.id = "playersNames"
    let playerTemp = document.createElement('div')
    playerTemp.innerHTML = `<label>Player 1</label>
             <input type='text' name=player1 class='block' id=palyer1 value='Player 1'>`
    playersN.appendChild(playerTemp)
    board.append(logo(), main, logo());
    let start = document.createElement('button');
    start.innerHTML = 'Start Game'
    start.id = 'start'
    main.append(cardsA, playersA, playersN, start)
    // menu event
    playersAL.addEventListener('click', () => {
        while (playersNames.firstChild) {
            playersNames.removeChild(playersNames.firstChild)
        }
        playerTemp.innerHTML = `<label>Players Names:</label>`
        playersNames.appendChild(playerTemp)

        function playerSetup(i) {
            let p = document.createElement('div')
            p.innerHTML = `<label>Player ${i}</label>
        <input type='text' name='player${i}' class='block' id='palyer${i}' value='Player ${i}'>`
            return p
        }
        for (i = 1; i <= playersAL.value; i++) {
            let pl = playerSetup(i)
            playersNames.appendChild(pl)
        }
    })
    start.addEventListener('click', () => {
        numberOfcard = Number(cardsAL.value);
        numberOfplayer = Number(playersAL.value);
        let i = 1
        if (i <= numberOfplayer) {
            pl1 = document.querySelector("#palyer1").value
            i++
            if (i <= numberOfplayer) {
                pl2 = document.querySelector("#palyer2").value
                i++
                if (i <= numberOfplayer) {
                    pl3 = document.querySelector("#palyer3").value
                    i++
                    if (i <= numberOfplayer) {
                        pl4 = document.querySelector("#palyer4").value
                        i++
                    }
                }
            }
        }
    })
    gameStart()
}
///////////////////////////////////////////////////////////
// event listenrs
let target;
board.addEventListener('click', (i) => {
    target = i.target
})
board.addEventListener('click', () => {
    const playing = document.getElementById("players");
    if (target == document.getElementById('board') || target == openCards[0] || target.className.includes('flip') ||
        target == document.getElementById('daley') || target == document.getElementById('Ddaley') ||
        document.getElementById('main') || target.id == 'start') {} else {
        target.className = "card flip " + target.innerHTML;
        openCards.push(target);
        if (openCards.length == 2) {
            if (openCards[0].innerHTML == openCards[1].innerHTML) {
                sameCards += 2;
                openCards = [];
                players[playingP].score += 1;
                let element = document.getElementById("player-" + playingP);
                element.innerHTML = players[playingP].player + " score: " + players[playingP].score;
            } else {
                if ((players.length - 1) == playingP) {
                    playingP = 0
                    const Ddaley = Fdaley('Ddaley');
                    board.appendChild(Ddaley)
                    setTimeout(() => {
                        const delay = Fdaley('daley')
                        const theDaley = document.getElementById('Ddaley');
                        theDaley.appendChild(delay)
                    }, 1100)
                } else {
                    playingP++
                    const Ddaley = Fdaley('Ddaley');
                    board.appendChild(Ddaley)
                    setTimeout(() => {
                        const delay = Fdaley('daley')
                        const theDaley = document.getElementById('Ddaley');
                        theDaley.appendChild(delay)
                    }, 1100)
                }
            }
        }
    }
})
board.addEventListener('click', (i) => {
    if (target == document.getElementById('daley')) {
        board.removeChild(document.getElementById('Ddaley'));
        for (i of openCards) {
            i.className = i.innerHTML + " card " + "back"
        }
        openCards = []
    }
})