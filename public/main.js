'use strict';
import { fetchPuzzle } from "../src/services/puzzleService.js";

//Elementos DOM
let boardContainer = document.getElementById('board-container');
let buttonContainer = document.getElementById('button-container');

//Variables
let selectedCell = null;

// Carga los datos del fetch y los asigna a las variables boardData y solutionData.
const { board: boardData, solution: solutionData } = await fetchPuzzle();


// Función para la elaboración del tablero a partir de boardData.
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
      let numbers = boardData[i-1][j-1] === '-' ? '' : boardData[i-1][j-1];
      cell.setAttribute("value", numbers);
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

// Función para la elaboración de los botones (1-9) y los añade al contenedor.
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

// Función para resaltar la celda seleccionada por el jugador.
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

// Función para agregar números a la celda seleccionada y validar la jugada.
function addNumber() {
  const buttons = document.querySelectorAll(".buttons");
  for (const button of buttons) {
    button.addEventListener("click", () => {
      if (!selectedCell) return;
      let buttonValue = button.value;
      selectedCell.textContent = buttonValue;
      selectedCell.setAttribute("value", buttonValue);
      if (validateSolution(selectedCell)) {
        selectedCell.style.backgroundColor = "rgba(0, 128, 0, 0.3)";
        selectedCell.removeAttribute("tabIndex");
        if(checkVictory()) {
          alert("¡Has ganado 🥳!");
        }
        selectedCell = null;
      } else {
        selectedCell.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
      }
    });
  }
}

// Función para validar si el número introducido es correcto.
function validateSolution(selectedCell) {
  let selectedCellId = selectedCell.id;
  const [row, col] = selectedCellId.split('-');
    if(selectedCell.textContent !== solutionData[row-1][col-1]) {
      return false;
    }
    return true;
  }

// Función para comprobar si se ha completado el tablero y determinar si el jugador ha ganado.
function checkVictory() {
  let allCells = document.querySelectorAll(".cells");
  for (const cell of allCells) {
    const [row, col] = cell.id.split('-');
    if(cell.textContent !== solutionData[row-1][col-1]) {
      return false;
    }
  }
  return true
}

// Función principal que inicia el juego.
function main() {
  createBoard();
  createButtons();
  highlightCell();
  addNumber();
}

// Llama a la función main después de cargar los datos para evitar un error de "race condition"
// que ocurría al usar window.onload.
main();