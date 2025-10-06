'use strict';

//Elementos DOM
let boardContainer = document.getElementById('board-container');
let buttonContainer = document.getElementById('button-container');
let selectedCell = null;

let board = ["--74916-5",
            "2---6-3-9",
            "-----7-1-",
            "-586----4",
            "--3----9-",
            "--62--187",
            "9-4-7---2",
            "67-83----",
            "81--45---"]

let solution = ["387491625",
                "241568379",
                "569327418",
                "758619234",
                "123784596",
                "496253187",
                "934176852",
                "675832941",
                "812945763"]

//Función para elaboración del tablero en tiempo de ejecución
function createBoard() {
  for (let i = 1; i <= 9; i++) {
    const row = document.createElement("tr");
    if(i === 3 || i === 6) {
        row.style.borderBottom = "4px solid";
      }

    for (let j = 1; j <= 9; j++) {
      const cell = document.createElement("th");
      cell.id = `${i}-${j}`;
      cell.classList.add("cells");
      cell.tabIndex = 0;
      let numbers = board[i-1][j-1] === '-' ? '' : board[i-1][j-1];
      cell.setAttribute("value", board[i-1][j-1]);
      cell.value = numbers;
      cell.textContent = numbers
      if(j === 3 || j === 6) {
        cell.style.borderRight = "4px solid";
      }
      row.appendChild(cell);
    }
    boardContainer.appendChild(row);
  }
}

//Función para elaboración de botones en tiempo de ejecución
function createButtons() {
  for (let i = 1; i <= 9; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.value = i;
    button.id = `button-${i}`;
    button.classList.add("buttons");
    button.classList.add("btn", "btn-outline-primary", "w-25", "d-flex", "justify-content-center", "align-items-center");
    buttonContainer.appendChild(button);
  }
}

//Función para marcar una casilla en el tablero
function highlightCell() {
  const cells = document.querySelectorAll(".cells");
  for (const cell of cells) {
    if(cell.value !== '') continue;
    cell.addEventListener("focus", () => {
      cell.style.backgroundColor = "rgba(211, 211, 211, 0.2)";
      selectedCell = cell;
    });

    cell.addEventListener("blur", () => {
      cell.style.backgroundColor = "";
    });
  }
}

//Función para agregar números al tablero
function addNumber() {
  const buttons = document.querySelectorAll(".buttons");
  for (const button of buttons) {
    button.addEventListener("click", () => {
      let buttonValue = button.value;
      if (selectedCell) {
        selectedCell.textContent = buttonValue;
        selectedCell.setAttribute("value", buttonValue);
        selectedCell = null;
      }
    });
  }
}

//Función para validar solución
function validateSolution(selectedCell) {
  let cells = document.querySelectorAll(".cells");
  for (let i = 0; i < cells.length; i++) {
    for (let j = 0; j < cells[i].length; j++) {
      if(cells[i][j].value === solution[i][j]) {
        return false;
      }
        return false;
    }
  }
}


window.onload = () => {
  createBoard();
  createButtons();
  highlightCell();
  addNumber();
}
