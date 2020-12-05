let board = document.getElementById("board");
let prefix = 8;
function drawBoard() {
  for (let i = 0; i < 8; i++) {
    // let positionPrefix = document.createElement("div");
    // positionPrefix.className = "positionPrefix";
    // positionPrefix.textContent = prefix;
    // board.appendChild(positionPrefix);
    prefix--;
    for (let j = 0; j < 8; j++) {
      let boardPosition = document.createElement("div");
      if (i % 2 === 0) {
        if (j % 2 === 0) {
          boardPosition.className = "position";
        } else {
          boardPosition.className = "position black";
        }
      } else {
        if (j % 2 === 0) {
          boardPosition.className = "position black";
        } else {
          boardPosition.className = "position";
        }
      }
      boardPosition.id = i + "_" + j;
      board.appendChild(boardPosition);
    }
  }
}
