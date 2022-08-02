import "./style.css"
import { setupJuego } from "./start"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/rafa_y_papa.jpg" class="logo" alt="Vite logo" />
    </a>
    <h1>El Juego de Papá e Hijo</h1>
    <h3 class="ComenzarJuego">
    Comenzar a jugar 🚓!
  </h3>
    <div class="card">
      <button id="comenzar" type="button"></button>
    </div>

  </div>
`

setupJuego(document.querySelector<HTMLButtonElement>("#comenzar")!)
