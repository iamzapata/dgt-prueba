import { Game } from "./game"

export function setupGame(element: HTMLButtonElement) {
  const dibujarBoton = () => {
    element.innerHTML = `Go!`
  }
  const game = new Game()

  dibujarBoton();
  
  element.addEventListener("click", () => game.start())
}
