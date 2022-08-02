import "./style.css"
import { setupGame } from "./start"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/rafa_y_papa.jpg" class="logo" alt="Vite logo" />
    </a>
    <h3 class="StartJuego">
    Start a game 🚓!
  </h3>
    <div class="card">
      <button id="start" type="button"></button>
    </div>

  </div>
`

setupGame(document.querySelector<HTMLButtonElement>("#start")!)
