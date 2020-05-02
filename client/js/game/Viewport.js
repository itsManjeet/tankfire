const Constants = require('../../../lib/Constants')
const Entity = require('../../../lib/Entity')
const Vector = require('../../../lib/Vector')


class Viewport extends Entity {

  constructor(position, velocity, canvasWidth, canvasHeight) {
    super(position, velocity)

    this.playerPosition = null
    this.canvasOffset = new Vector(canvasWidth / 2, canvasHeight / 2)
  }

  static create(canvas) {
    return new Viewport(
      Vector.zero(), Vector.zero(), canvas.width, canvas.height)
  }

  updateTrackingPosition(player) {
    this.playerPosition = Vector.sub(player.position, this.canvasOffset)
  }

  update(deltaTime) {
    this.velocity = Vector.sub(this.playerPosition, this.position).scale(
      Constants.VIEWPORT_STICKINESS * deltaTime)
    this.position.add(this.velocity)
  }

  toCanvas(position) {
    return Vector.sub(position, this.position)
  }


  toWorld(position) {
    return Vector.add(position, this.position)
  }
}

module.exports = Viewport
