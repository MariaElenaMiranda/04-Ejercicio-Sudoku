//Fetch para cargar los elementos del board y solución
export async function fetchPuzzle() {
  //Guardamos la respuesta, con fetch busca el archivo
  // y await espera la respuesta del servidor
  const res = await fetch("../src/data/puzzle.json");

  if(!res.ok) {
    //Si hay error, lanza el mensaje por consola (404)
    throw new Error(`Error ${res.status}: Error al cargar el puzzle`)
  }
  //Espera la respuesta y la convierte en objeto, para ser devuelta y usarla
  const data = await res.json();
  return data;
}

/*
obj = {status: 200, code: "ok"}
boj[code] = "ok"
*/

// console.log(await fetchPuzzle())