import "./juego.scss"

const SLOW = 2
const FAST = 4;
const MAX_ROUNDS = 2

export class Juego {
  frame: ReturnType<typeof requestAnimationFrame> | null
  car: HTMLDivElement | null = null
  tunnel: HTMLDivElement | null = null
  timer: HTMLSpanElement | null = null
  restart: HTMLDivElement | null = null
  carPosition: number = 0
  documentBodyWidth: number
  speed: number = SLOW;
  rounds = 0

  constructor() {
    this.frame = null
    this.carPosition = 0
    this.documentBodyWidth = document.body.clientWidth
  }

  async start() {
    const body = document.body

    body.innerHTML = `
      <div class="Contenedor">
        <div>

          <div class="Autopista">
            <div class="Carril">
              <span class="Coche" id='coche'>
              🚓
              </span>
            </div>
          </div>
          
          <div class="Tunel" id='tunel'></div>
          
        </div>

        <div class='Controles'>
          <button id='stop'>⏱️</button>
          <div id='restart'></div>
        </div>

        <div class='Timer' id='timer'>
          <span id='timer-value'></span>
        </div>

      </div>
    `

    this.tunnel = document.querySelector<HTMLDivElement>("#tunel")
    if (!this.tunnel) throw Error("element with id 'tunel' not found")

    this.car = document.querySelector<HTMLDivElement>("#coche")
    if (!this.car) throw Error("element with id 'coche' not found")

    this.timer = document.querySelector<HTMLSpanElement>("#timer-value")
    if (!this.timer) throw Error("element with id 'timer-value' not found")

    this.restart = document.querySelector<HTMLDivElement>("#restart")
    if (!this.restart) throw Error("element with id 'restart' not found")

    const stop = document.querySelector<HTMLButtonElement>("#stop")
    if (!stop) throw Error("element with id 'stop' not found")

    stop.addEventListener("click", this.handleStop.bind(this))

    document.body.addEventListener(
      "keydown",
      this.handleStopWithSpacebar.bind(this)
    )

    this.restart.addEventListener("click", () => {
      this.rounds = 0
      this.start()
    })

    await this.sleep(1000)

    this.move()
  }

  move() {
    if (this.rounds === MAX_ROUNDS) {
      this.restart.innerHTML = `
      <button id='restart'>🔄</button>
    `
      return
    }

    if (this.car.style.left.split("px").shift() > this.documentBodyWidth) {
      this.carPosition = 0
    }

    this.car.style.zIndex = "0"
    this.car.style.opacity = "1"

    if (
      this.carPosition >= this.tunnel.offsetLeft &&
      this.carPosition <= this.documentBodyWidth
    ) {
      this.car.style.visibility = "hidden"
    } else {
      this.car.style.visibility = "visible"
    }

    this.car.style.left = `${this.carPosition}px`
    this.carPosition += this.speed

    this.frame = requestAnimationFrame(this.move.bind(this))
  }

  async handleStop() {
    if (this.frame) {
      this.rounds += 1
      this.pushTimeEntry()
      this.speed = this.speed === SLOW ? FAST : SLOW
      this.car.style.visibility = "visible"
      this.car.style.opacity = "0.6"
      this.car.style.zIndex = "1000"

      cancelAnimationFrame(this.frame)
      this.frame = null

      this.carPosition = 0

      await this.showTimer()

      this.move()
    }
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async showTimer() {
    if (this.rounds === MAX_ROUNDS) return

    for (const second of [3, 2, 1, 0, ""]) {
      this.timer.innerHTML = second
      await this.sleep(1000)
    }
  }

  handleStopWithSpacebar(event: KeyboardEvent) {
    if (event.code === "Space") {
      this.handleStop()
    }
  }
}
