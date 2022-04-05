const cards = ["A","B","C","A","B","C"];
for(i of cards){
    let divs  = document.createElement("div");
    divs.innerHTML = i
    const board = document.getElementById("board")
    board.appendChild(divs);
}