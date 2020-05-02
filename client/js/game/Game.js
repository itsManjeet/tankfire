const Drawing = require('./Drawing')
const Input = require('./Input')
const Leaderboard = require('./Leaderboard')
const Viewport = require('./Viewport')

const Constants = require('../../../lib/Constants')
const Vector = require('../../../lib/Vector')
const Util = require('../../../lib/Util')


class Game {

  constructor(socket, viewport, drawing, input, leaderboard) {
    this.socket = socket

    this.viewport = viewport
    this.drawing = drawing
    this.input = input
    this.leaderboard = leaderboard

    this.self = null
    this.players = []
    this.projectiles = []
    this.powerups = []

    this.animationFrameId = null
    this.lastUpdateTime = 0
    this.deltaTime = 0
  }

  static create(socket, canvasElementID, leaderboardElementID) {
    const canvas = document.getElementById(canvasElementID)
    canvas.width = Constants.CANVAS_WIDTH
    canvas.height = Constants.CANVAS_HEIGHT

    const viewport = Viewport.create(canvas)
    const drawing = Drawing.create(canvas, viewport)
    const input = Input.create(document, canvas)

    const leaderboard = Leaderboard.create(leaderboardElementID)

    const game = new Game(socket, viewport, drawing, input, leaderboard)
    game.init()
    return game
  }


  init() {
    this.lastUpdateTime = Date.now()
    this.socket.on(Constants.SOCKET_UPDATE,
      this.onReceiveGameState.bind(this))
  }

  onReceiveGameState(state) {
    this.self = state.self
    this.players = state.players
    this.projectiles = state.projectiles
    this.powerups = state.powerups

    this.viewport.updateTrackingPosition(state.self)
    this.leaderboard.update(state.players)
  }


  run() {
    const currentTime = Date.now()
    this.deltaTime = currentTime - this.lastUpdateTime
    this.lastUpdateTime = currentTime

    this.update()
    this.draw()
    this.animationFrameId = window.requestAnimationFrame(this.run.bind(this))
  }


  stop() {
    window.cancelAnimationFrame(this.animationFrameId)
  }

  update() {
    if (this.self) {
      this.viewport.update(this.deltaTime)

      const absoluteMouseCoords = this.viewport.toWorld(
        Vector.fromArray(this.input.mouseCoords))
      const playerToMouseVector = Vector.sub(this.self.position,
        absoluteMouseCoords)

      this.socket.emit(Constants.SOCKET_PLAYER_ACTION, {
        up: this.input.up,
        down: this.input.down,
        left: this.input.left,
        right: this.input.right,
        shoot: this.input.mouseDown,
        turretAngle: Util.normalizeAngle(playerToMouseVector.angle + Math.PI)
      })
    }
  }


  draw() {
    if (this.self) {
      this.drawing.clear()

      this.drawing.drawTiles()

      this.projectiles.forEach(this.drawing.drawBullet.bind(this.drawing))

      this.powerups.forEach(this.drawing.drawPowerup.bind(this.drawing))

      this.drawing.drawTank(true, this.self)
      this.players.forEach(tank => this.drawing.drawTank(false, tank))
    }
  }
}

module.exports = Game
