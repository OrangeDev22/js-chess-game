let board = document.getElementById("board");
var selectedPiece = "";
let highlighted = [];
let prefix = 8;
function drawBoard() {
  for (let i = 0; i < 8; i++) {
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

function Piece(position, img, captured, moved, type) {
  this.position = position;
  this.img = img;
  this.captured = captured;
  this.moved = moved;
  this.type = type;
}
let pieces = [];

//kings

let b_king = new Piece("0_4", "images/black_king.png", false, false, "b_king");
pieces.push(b_king);

let w_king = new Piece("7_4", "images/white_king.png", false, false, "w_king");
pieces.push(w_king);

//queens

let b_queen = new Piece(
  "0_3",
  "images/black_queen.png",
  false,
  false,
  "b_queen"
);
let w_queen = new Piece(
  "7_3",
  "images/white_queen.png",
  false,
  false,
  "w_queen"
);

pieces.push(w_queen, b_queen);

//rooks

let b_rook1 = new Piece("0_0", "images/black_rook.png", false, false, "b_rook");
let b_rook2 = new Piece("0_7", "images/black_rook.png", false, false, "b_rook");

let w_rook1 = new Piece("7_0", "images/white_rook.png", false, false, "w_rook");
let w_rook2 = new Piece("7_7", "images/white_rook.png", false, false, "w_rook");

pieces.push(b_rook1, b_rook2, w_rook1, w_rook2);

//knights

let b_knight1 = new Piece(
  "0_1",
  "images/black_knight.png",
  false,
  false,
  "b_knight"
);
let b_knight2 = new Piece(
  "0_6",
  "images/black_knight.png",
  false,
  false,
  "b_knight"
);

let w_knight1 = new Piece(
  "7_1",
  "images/white_knight.png",
  false,
  false,
  "w_knight"
);
let w_knight2 = new Piece(
  "7_6",
  "images/white_knight.png",
  false,
  false,
  "w_knight"
);

pieces.push(b_knight1, b_knight2, w_knight1, w_knight2);

//bishops

let b_bishop1 = new Piece(
  "0_2",
  "images/black_bishop.png",
  false,
  false,
  "b_bishop"
);
let b_bishop2 = new Piece(
  "0_5",
  "images/black_bishop.png",
  false,
  false,
  "b_bishop"
);

let w_bishop1 = new Piece(
  "7_2",
  "images/white_bishop.png",
  false,
  false,
  "w_bishop"
);
let w_bishop2 = new Piece(
  "7_5",
  "images/white_bishop.png",
  false,
  false,
  "w_bishop"
);

pieces.push(b_bishop1, b_bishop2, w_bishop1, w_bishop2);

//pawns

const createPawns = () => {
  for (let i = 0; i < 16; i++) {
    let pawn =
      i < 8
        ? new Piece(`1_${i}`, "images/black_pawn.png", false, false, "b_pawn")
        : new Piece(
            `6_${i - 8}`,
            "images/white_pawn.png",
            false,
            false,
            "w_pawn"
          );
    console.log(pawn);
    pieces.push(pawn);
  }
};

function gameSetUp() {
  console.log(pieces);
  $(".position").attr("chess", null);
  $(".position").attr("index", null);
  pieces.forEach((piece, index) => {
    $(`#${piece.position}`).prepend(
      `<img class="chess-piece" src="${piece.img}" />`
    );
    $(`#${piece.position}`).attr("chess", piece.type);
    $(`#${piece.position}`).attr("index", index);
  });
}
function validateMove(id) {
  let isValidated = false;
  highlighted.forEach((element) => {
    if (id == element) {
      isValidated = true;
    }
  });
  return isValidated;
}
function move(target) {
  if (validateMove(target.id)) {
    let pieceSelected = $("#" + selectedPiece).attr("index");
    //console.log("selected piece on move",pieces[pieceSelected]);
    // new position

    $("#" + target.id).prepend(
      '<img class="chess-piece" src="' + pieces[pieceSelected].img + '"/>'
    );
    $("#" + target.id).attr("chess", pieces[pieceSelected].type);
    $("#" + target.id).attr("index", pieceSelected);
    // old position
    $("#" + selectedPiece).empty();
    $("#" + selectedPiece).removeAttr("chess");
    $("#" + selectedPiece).removeAttr("index");

    pieces[pieceSelected].moved = true;
    pieces[pieceSelected].position = target.id;
  }
}
function capture(target) {
  if (validateMove(target.id)) {
    let capturedIndex = $("#" + target.id).attr("index");
    let pieceSelected = {
      name: $("#" + selectedPiece).attr("chess"),
      index: $("#" + selectedPiece).attr("index"),
      id: selectedPiece,
    };
    //console.log("target id",target.id);
    //new position
    $("#" + target.id).empty();
    $("#" + target.id).prepend(
      '<img class="chess-piece" src="' + pieces[pieceSelected.index].img + '"/>'
    );
    $("#" + target.id).attr("chess", pieceSelected.name);
    $("#" + target.id).attr("index", pieceSelected.index);
    //old position
    $("#" + selectedPiece).empty();
    $("#" + selectedPiece).removeAttr("chess");
    $("#" + selectedPiece).removeAttr("index");
    //moved piece
    pieces[pieceSelected.index].position = target.id;
    pieces[pieceSelected.index].moved = true;
    //captured piece
    pieces[capturedIndex].captured = true;
  }
}

function endTurn() {
  toggleHighlightedSelected(selectedPiece);
  selectedPiece = "";
  toggleHighlight(highlighted);
  highlighted = [];
}
function validateMoves() {
  let posibleMoves = [];
  let selectedIndex = $("#" + selectedPiece).attr("index");
  let position = pieces[selectedIndex].position;
  let x = position.split("_")[0],
    y = position.split("_")[1];
  let pieceSelected = pieces[selectedIndex];
  var coordinates = [];
  var options = [];
  var startPoint = pieceSelected.position;

  toggleHighlightedSelected(startPoint);
  let i = getBoardIndexPosition(startPoint);
  switch (pieceSelected.type) {
    case "w_king":
      coordinates = kingOptions(i, coordinates, pieceSelected.type);
      options = moveOptions(startPoint, coordinates, pieceSelected.type).slice(
        0
      );
      highlighted = options.slice(0);
      coordinates = toggleHighlight(options);
      break;
    case "w_queen":
      coordinates = queenOptions(i, coordinates, pieceSelected.type);
      options = moveOptions(startPoint, coordinates, pieceSelected.type).slice(
        0
      );
      highlighted = options.slice(0);
      coordinates = toggleHighlight(options);
      break;
    case "w_pawn":
      if (!pieceSelected.moved) {
        coordinates = [
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: -1 },
        ].map(function (val) {
          return (
            parseInt(x) -
            parseInt(val.x) +
            "_" +
            (parseInt(y) - parseInt(val.y))
          );
        });
      } else {
        coordinates = [
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: -1 },
        ].map(function (val) {
          return (
            parseInt(x) -
            parseInt(val.x) +
            "_" +
            (parseInt(y) - parseInt(val.y))
          );
        });
      }
      options = moveOptions(startPoint, coordinates, pieceSelected.type).slice(
        0
      );
      highlighted = options.slice(0);
      toggleHighlight(options);
      break;
    case "w_bishop":
      coordinates = bishopOptions(i, coordinates, pieceSelected.type);
      options = moveOptions(startPoint, coordinates, pieceSelected.type).slice(
        0
      );
      highlighted = options.slice(0);
      toggleHighlight(options);
      break;
    case "w_knight":
      //let i = (parseInt(startPoint.split('_')[0])+1);
      coordinates = knightOptions(i, coordinates, pieceSelected.type);
      options = moveOptions(startPoint, coordinates, pieceSelected.type).slice(
        0
      );
      highlighted = options.slice(0);
      toggleHighlight(options);
      break;
    case "w_rook":
      coordinates = rookOptions(i, coordinates, pieceSelected.type);
      options = moveOptions(startPoint, coordinates, pieceSelected.type).slice(
        0
      );
      highlighted = options.slice(0);
      toggleHighlight(options);
      break;
    case "b_king":
      coordinates = kingOptions(i, coordinates, pieceSelected.type);
      options = moveOptions(startPoint, coordinates, pieceSelected.type).slice(
        0
      );
      highlighted = options.slice(0);
      coordinates = toggleHighlight(options);
      break;
    case "b_pawn":
      if (!pieceSelected.moved) {
        coordinates = [
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: -1 },
        ].map(function (val) {
          return (
            parseInt(x) +
            parseInt(val.x) +
            "_" +
            (parseInt(y) + parseInt(val.y))
          );
        });
      } else {
        coordinates = [
          { x: 1, y: 0 },
          { x: 1, y: 1 },
          { x: 1, y: -1 },
        ].map(function (val) {
          return (
            parseInt(x) +
            parseInt(val.x) +
            "_" +
            (parseInt(y) + parseInt(val.y))
          );
        });
      }
      options = moveOptions(startPoint, coordinates, pieceSelected.type).slice(
        0
      );
      highlighted = options.slice(0);
      toggleHighlight(options);
      break;
    case "b_knight":
      coordinates = knightOptions(i, coordinates, pieceSelected.type);
      options = moveOptions(startPoint, coordinates, pieceSelected.type).slice(
        0
      );
      highlighted = options.slice(0);
      toggleHighlight(options);
      break;

    case "b_queen":
      coordinates = queenOptions(i, coordinates, pieceSelected.type);
      options = moveOptions(startPoint, coordinates, pieceSelected.type).slice(
        0
      );
      highlighted = options.slice(0);
      coordinates = toggleHighlight(options);
      break;
    case "b_rook":
      coordinates = rookOptions(i, coordinates, pieceSelected.type);
      options = moveOptions(startPoint, coordinates, pieceSelected.type).slice(
        0
      );
      highlighted = options.slice(0);
      toggleHighlight(options);
      break;
    case "b_bishop":
      coordinates = bishopOptions(i, coordinates, pieceSelected.type);
      options = moveOptions(startPoint, coordinates, pieceSelected.type).slice(
        0
      );
      highlighted = options.slice(0);
      toggleHighlight(options);
      break;
  }
}

function knightOptions(i, coordinates, type) {
  let r = Math.floor(i / 8),
    c = i % 8;

  for (let j = -1; j <= 1; j += 2) {
    for (let k = -1; k <= 1; k += 2) {
      let x = r + j;
      let y = c + k * 2;
      if (hasPiece(x, y, type)) {
        if (hasEnemy(x, y, type)) {
          coordinates.push(x + "_" + y);
        }
      } else {
        coordinates.push(x + "_" + y);
      }
      x = r + j * 2;
      y = c + k;
      if (hasPiece(x, y, type)) {
        if (hasEnemy(x, y, type)) {
          coordinates.push(x + "_" + y);
        }
      } else {
        coordinates.push(x + "_" + y);
      }
    }
  }
  return coordinates;
}
function kingOptions(i, coordinates, type) {
  let r = Math.floor(i / 8),
    c = i % 8;
  //equals(tableroAjedrez[r - 1 + j / 3][c - 1 + j % 3]
  for (let j = 0; j < 9; j++) {
    let x = Math.floor(r - 1 + j / 3);
    let y = Math.floor(c - 1 + (j % 3));
    if (j != 4) {
      if (hasPiece(x, y, type) == true) {
        if (hasEnemy(x, y, type)) {
          coordinates.push(x + "_" + y);
        }
      } else {
        coordinates.push(x + "_" + y);
      }
    }
  }
  return coordinates;
}
function queenOptions(i, coordinates, type) {
  let r = Math.floor(i / 8),
    c = i % 8;
  let counter = 1;
  for (let j = -1; j <= 1; j++) {
    for (let k = -1; k <= 1; k++) {
      let x = r + counter * j;
      let y = c + counter * k;

      while (
        $("#" + (r + counter * j) + "_" + (c + counter * k)).attr("chess") ==
          null &&
        $("#" + (r + counter * j) + "_" + (c + counter * k)).prop("tagName") !=
          null
      ) {
        coordinates.push(r + counter * j + "_" + (c + counter * k));
        counter++;
      }

      if (hasPiece(r + counter * j, c + counter * k, type)) {
        let pieceIndex = $(
          "#" + (r + counter * j) + "_" + (c + counter * k)
        ).attr("index");
        if (hasEnemy(r + counter * j, c + counter * k, type)) {
          coordinates.push(r + counter * j + "_" + (c + counter * k));
        }
      }
      counter = 1;
    }
  }
  return coordinates;
}
function bishopOptions(i, coordinates, type) {
  let r = Math.floor(i / 8),
    c = i % 8;
  let counter = 1;
  for (let j = -1; j <= 1; j += 2) {
    for (let k = -1; k <= 1; k += 2) {
      if (j != 0 || k != 0) {
        while (
          $("#" + (r + counter * j) + "_" + (c + counter * k)).attr("chess") ==
            null &&
          $("#" + (r + counter * j) + "_" + (c + counter * k)).prop(
            "tagName"
          ) != null
        ) {
          coordinates.push(r + counter * j + "_" + (c + counter * k));
          counter++;
        }
        if (hasPiece(r + counter * j, c + counter * k, type)) {
          if (hasEnemy(r + counter * j, c + counter * k, type)) {
            coordinates.push(r + counter * j + "_" + (c + counter * k));
          }
        }
        counter = 1;
      }
    }
  }
  return coordinates;
}
function rookOptions(i, coordinates, type) {
  let r = Math.floor(i / 8),
    c = i % 8;
  let counter = 1;
  for (let j = -1; j <= 1; j += 2) {
    while (
      $("#" + r + "_" + (c + counter * j)).attr("chess") == null &&
      $("#" + r + "_" + (c + counter * j)).prop("tagName") != null
    ) {
      coordinates.push(r + "_" + (c + counter * j));
      counter++;
    }
    if (hasPiece(r, c + counter * j, type)) {
      if (hasEnemy(r, c + counter * j, type)) {
        coordinates.push(r + "_" + (c + counter * j));
      }
    }
    counter = 1;
    while (
      $("#" + (r + counter * j) + "_" + c).attr("chess") == null &&
      $("#" + (r + counter * j) + "_" + c).prop("tagName") != null
    ) {
      coordinates.push(r + counter * j + "_" + c);
      counter++;
    }
    if (hasPiece(r + counter * j, c, type)) {
      if (hasEnemy(r + counter * j, c, type)) {
        coordinates.push(r + counter * j + "_" + c);
      }
    }
    counter = 1;
  }
  return coordinates;
}

function moveOptions(startPoint, coordinates, type) {
  coordinates = coordinates.filter((val) => {
    let x = parseInt(val.split("_")[0]);
    let y = parseInt(val.split("_")[1]);
    if (!(x < 0) && !(x > 7) && !(y < 0) && !(y > 7)) {
      return val;
    }
  });
  switch (type) {
    case "w_pawn":
      coordinates = coordinates.filter((val) => {
        let coordinate = val.split("_");
        let x = startPoint.split("_")[0];
        let y = startPoint.split("_")[1];
        if (coordinate[1] < y || coordinate[1] > y) {
          if (
            $("#" + val).attr("chess") != null &&
            $("#" + val)
              .attr("chess")
              .slice(0, 1) == "b"
          ) {
            return val;
          }
        } else {
          if (
            coordinate[2] == parseInt(x) + 2 &&
            $("#" + y + "_" + (parseInt(x) + 1)).attr("chess")
          ) {
          } else {
            return $("#" + val).attr("chess") == null;
          }
        }
      });
      break;
    case "b_pawn":
      coordinates = coordinates.filter((val) => {
        let coordinate = val.split("_");
        let x = startPoint.split("_")[0];
        let y = startPoint.split("_")[1];
        if (coordinate[1] < y || coordinate[1] > y) {
          if (
            $("#" + val).attr("chess") != null &&
            $("#" + val)
              .attr("chess")
              .slice(0, 1) == "w"
          ) {
            return val;
          }
        } else {
          if (
            coordinate[2] == parseInt(x) - 2 &&
            $("#" + y + "_" + (parseInt(x) - 1)).attr("chess")
          ) {
          } else {
            return $("#" + val).attr("chess") == null;
          }
        }
      });
      break;
  }
  return coordinates;
}
function hasPiece(x, y, type) {
  if ($("#" + x + "_" + y).attr("chess") == null) {
    return false;
  } else {
    return true;
  }
}
function hasEnemy(x, y, type) {
  enemyPieceIndex = $("#" + x + "_" + y).attr("index");
  if (pieces[enemyPieceIndex].type.slice(0, 1) != type.slice(0, 1)) {
    return true;
  } else {
    return false;
  }
}
function getBoardIndexPosition(startPoint) {
  let i;
  for (i = 0; i < 64; i++) {
    if (
      Math.floor(i / 8) == startPoint.split("_")[0] &&
      i % 8 == startPoint.split("_")[1]
    )
      break;
  }
  return i;
}
function toggleHighlight(options) {
  options.forEach((element, index, array) => {
    $("#" + element).toggleClass("highlighted");
  });
}
function toggleHighlightedSelected(position) {
  let coordinate = position.split("_");

  $("#" + coordinate[0] + "_" + coordinate[1]).toggleClass(
    "highlightedSelected"
  );
}

$(document).ready(function () {
  createPawns();
  drawBoard();
  gameSetUp();
  $(".position", "div").click(function (e) {
    var id = e.target.id;
    var pieceSelected = {
      name: "",
      id: selectedPiece,
    };

    if (selectedPiece == "") {
      pieceSelected.name = $("#" + e.target.id).attr("chess");
    } else {
      pieceSelected.name = $("#" + selectedPiece).attr("chess");
    }
    let target = {
      name: $(this).attr("chess"),
      id: e.target.id,
    };
    //pieceSelected.name = $('#'+e.target.id).attr('chess');
    //need to add move options later
    //set selected piece
    if (selectedPiece == "" && target.name != null) {
      selectedPiece = e.target.id;
      validateMoves();
    } else if (selectedPiece != "" && target.name == null) {
      // Move piece
      move(target);
      endTurn();
    } else if (
      selectedPiece != "" &&
      target.name != null &&
      target.id != pieceSelected.id &&
      pieceSelected.name.slice(0, 1) != target.name.slice(0, 1)
    ) {
      capture(target);
      endTurn();
    } else if (
      selectedPiece != "" &&
      target.name != null &&
      target.id != pieceSelected.id &&
      pieceSelected.name.slice(0, 1) == target.name.slice(0, 1)
    ) {
      toggleHighlight(highlighted);
      toggleHighlightedSelected(selectedPiece);
      highlighted = [];
      selectedPiece = target.id;
      validateMoves();
    }
  });
});
