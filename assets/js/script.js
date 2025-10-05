'use strict';

//Elementos DOM
let boardContainer = document.getElementById('board-container');
let buttonContainer = document.getElementById('button-container');
let selectedCell = null;

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

// //Función para seleccionar una celda
// function selectCell() {
//   boardContainer.addEventListener("click", (event) => {
//       const selectedCell = event.target.id
//let [r, c] = selectedCell
//       console.log(`Celda seleccionada: ${selectedCell}`)
//   });
// }

//Función para marcar una casilla en el tablero
function highlightCell() {
  const cells = document.querySelectorAll(".cells");
  for (const cell of cells) {
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

window.onload = () => {
  createBoard();
  createButtons();
  highlightCell();
  addNumber();
}
