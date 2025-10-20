export async function loadPuzzle() {
  const res = await fetch('./src/data/puzzle.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('No se pudo cargar el puzzle');
  const data = await res.json();
  return data;
}

