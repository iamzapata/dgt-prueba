import "./game.scss"

const SLOW = 2
const FAST = 4
const MAX_ROUNDS = 6

export class Game {
  frame: ReturnType<typeof requestAnimationFrame> | null
  car!: HTMLDivElement
  tunnel!: HTMLDivElement
  timer!: HTMLSpanElement
  restart!: HTMLDivElement
  carPosition: number = 0
  documentBodyWidth: number
  speed: number = SLOW
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

          <div class="Highway">
            <div class="Road">
              <span class="Car" id='car'>
              🚓
              </span>
            </div>
          </div>
          
          <div class="Tunnel" id='tunnel'></div>
          
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

    this.tunnel = <HTMLDivElement>document.querySelector("#tunnel")
    if (!this.tunnel) throw Error("element with id 'tunnel' not found")

    this.car = <HTMLDivElement>document.querySelector("#car")
    if (!this.car) throw Error("element with id 'car' not found")

    this.timer = <HTMLSpanElement>document.querySelector("#timer-value")
    if (!this.timer) throw Error("element with id 'timer-value' not found")

    this.restart = <HTMLDivElement>document.querySelector("#restart")
    if (!this.restart) throw Error("element with id 'restart' not found")

    const stop = <HTMLButtonElement>document.querySelector("#stop")
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

    const [carLeftPosition] = this.car.style.left.split("px")

    if (parseInt(carLeftPosition) > this.documentBodyWidth) {
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
      this.timer.innerHTML = second.toString()
      await this.sleep(1000)
    }
  }

  handleStopWithSpacebar(event: KeyboardEvent) {
    if (event.code === "Space") {
      this.handleStop()
    }
  }
}
