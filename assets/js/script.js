'use strict';

// Elementos del DOM
let boardContainer = document.getElementById('board-container');
let buttonContainer = document.getElementById('button-container');

// Variables globales
let selectedCell = null;

// Tablero inicial y solución
let board = [
  "--74916-5",
  "2---6-3-9",
  "-----7-1-",
  "-586----4",
  "--3----9-",
  "--62--187",
  "9-4-7---2",
  "67-83----",
  "81--45---"
];

let solution = [
  "387491625",
  "241568379",
  "569327418",
  "758619234",
  "123784596",
  "496253187",
  "934176852",
  "675832941",
  "812945763"
];

// -------------------------------
// Crear tablero dinámicamente
// -------------------------------
function createBoard() {
  for (let i = 1; i <= 9; i++) {
    const row = document.createElement("tr");
    if (i === 3 || i === 6) row.style.borderBottom = "4px solid #444";

    for (let j = 1; j <= 9; j++) {
      const cell = document.createElement("th");
      cell.id = `${i}-${j}`;
      cell.classList.add("cells");
      cell.tabIndex = 0;

      // Mostrar número o dejar vacío
      let num = board[i - 1][j - 1] === '-' ? '' : board[i - 1][j - 1];
      cell.textContent = num;
      cell.setAttribute("value", num);

      // Si la celda tiene número inicial → bloqueada
      if (num !== '') {
        cell.classList.add("prefilled");
        cell.tabIndex = -1; // No se puede seleccionar
      }

      // Líneas gruesas verticales
      if (j === 3 || j === 6) cell.style.borderRight = "4px solid #444";

      row.appendChild(cell);
    }
    boardContainer.appendChild(row);
  }
}

// -------------------------------
// Crear botones del 1 al 9
// -------------------------------
function createButtons() {
  for (let i = 1; i <= 9; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.value = i;
    button.id = `button-${i}`;
    button.classList.add(
      "buttons",
      "btn",
      "btn-outline-primary",
      "d-flex",
      "justify-content-center",
      "align-items-center"
    );
    buttonContainer.appendChild(button);
  }
}

// -------------------------------
// Marcar celda seleccionada
// -------------------------------
function highlightCell() {
  const cells = document.querySelectorAll(".cells");
  for (const cell of cells) {
    // Solo las vacías son seleccionables
    if (cell.textContent !== '') continue;

    cell.addEventListener("focus", () => {
      cell.style.backgroundColor = "rgba(211, 211, 211, 0.2)";
      selectedCell = cell;
    });

    cell.addEventListener("blur", () => {
      cell.style.backgroundColor = "";
    });
  }
}

// -------------------------------
// Validar una celda
// -------------------------------
function validateSolution(selectedCell) {
  const [row, col] = selectedCell.id.split('-');
  return selectedCell.textContent === solution[row - 1][col - 1];
}

// -------------------------------
// Comprobar si se ha ganado
// -------------------------------
function hasWon() {
  const cells = document.querySelectorAll(".cells");
  for (const cell of cells) {
    const [row, col] = cell.id.split('-');
    if (cell.textContent !== solution[row - 1][col - 1]) {
      return false;
    }
  }
  return true;
}

// -------------------------------
// Agregar número al tablero
// -------------------------------
function addNumber() {
  const buttons = document.querySelectorAll(".buttons");
  for (const button of buttons) {
    button.addEventListener("click", () => {
      // Si no hay celda seleccionada, no hacer nada
      if (!selectedCell) return;

      const value = button.value;
      selectedCell.textContent = value;
      selectedCell.setAttribute("value", value);

      if (validateSolution(selectedCell)) {
        // Correcto
        selectedCell.style.backgroundColor = "rgba(0, 128, 0, 0.3)";
        selectedCell.removeAttribute("tabIndex");
        selectedCell = null;

        // Comprobar victoria
        if (hasWon()) {
          alert("¡Has ganado el Sudoku! ");
        }
      } else {
        // Incorrecto
        selectedCell.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
      }
    });
  }
}

// -------------------------------
// Inicialización del juego
// -------------------------------
window.onload = () => {
  createBoard();
  createButtons();
  highlightCell();
  addNumber();
};
