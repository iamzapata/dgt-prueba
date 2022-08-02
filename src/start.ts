import { Juego } from './juego';
export function setupJuego(element: HTMLButtonElement) {
  const dibujarBoton = () => {
    element.innerHTML = `Arrancar!`
  }
  const juego = new Juego()

  juego.start()
  
  //element.addEventListener('click', Juego().start)
  dibujarBoton()
}
