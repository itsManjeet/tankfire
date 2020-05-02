const Constants = require('../../../lib/Constants')
const Util = require('../../../lib/Util')

class Drawing {

  constructor(context, images, viewport) {
    this.context = context
    this.images = images
    this.viewport = viewport

    this.width = context.canvas.width
    this.height = context.canvas.height
  }

  static create(canvas, viewport) {
    const context = canvas.getContext('2d')
    const images = {}
    for (const key of Constants.DRAWING_IMG_KEYS) {
      images[key] = new Image()
      images[key].src = `${Constants.DRAWING_IMG_BASE_PATH}/${key}.png`
    }
    for (const type of Constants.POWERUP_KEYS) {
      images[type] = new Image()
      images[type].src =
        `${Constants.DRAWING_IMG_BASE_PATH}/${type}_powerup.png`
    }
    return new Drawing(context, images, viewport)
  }


  static translateAngle(angle) {
    return Util.normalizeAngle(angle + Math.PI / 2)
  }


  drawCenteredImage(image) {
    this.context.drawImage(image, -image.width / 2, -image.height / 2)
  }


  clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  }

  drawTank(isSelf, player) {
    this.context.save()
    const canvasCoords = this.viewport.toCanvas(player.position)
    this.context.translate(canvasCoords.x, canvasCoords.y)

    this.context.textAlign = 'center'
    this.context.font = Constants.DRAWING_NAME_FONT
    this.context.fillStyle = Constants.DRAWING_NAME_COLOR
    this.context.fillText(player.name, 0, -50)

    for (let i = 0; i < 10; ++i) {
      if (i < player.health) {
        this.context.fillStyle = Constants.DRAWING_HP_COLOR
      } else {
        this.context.fillStyle = Constants.DRAWING_HP_MISSING_COLOR
      }
      this.context.fillRect(-25 + 5 * i, -40, 5, 4)
    }

    this.context.rotate(Drawing.translateAngle(player.tankAngle))
    this.drawCenteredImage(this.images[
      // eslint-disable-next-line multiline-ternary
      isSelf ? Constants.DRAWING_IMG_SELF_TANK :
        Constants.DRAWING_IMG_OTHER_TANK
    ])
    this.context.rotate(-Drawing.translateAngle(player.tankAngle))

    this.context.rotate(Drawing.translateAngle(player.turretAngle))
    this.drawCenteredImage(this.images[
      // eslint-disable-next-line multiline-ternary
      isSelf ? Constants.DRAWING_IMG_SELF_TURRET :
        Constants.DRAWING_IMG_OTHER_TURRET
    ])

    if (player.powerups[Constants.POWERUP_SHIELD]) {
      this.context.rotate(-Drawing.translateAngle(-player.turretAngle))
      this.drawCenteredImage(this.images[Constants.DRAWING_IMG_SHIELD])
    }

    this.context.restore()
  }

  drawBullet(bullet) {
    this.context.save()
    const canvasCoords = this.viewport.toCanvas(bullet.position)
    this.context.translate(canvasCoords.x, canvasCoords.y)
    this.context.rotate(Drawing.translateAngle(bullet.angle))
    this.drawCenteredImage(this.images[Constants.DRAWING_IMG_BULLET])
    this.context.restore()
  }


  drawPowerup(powerup) {
    this.context.save()
    const canvasCoords = this.viewport.toCanvas(powerup.position)
    this.context.translate(canvasCoords.x, canvasCoords.y)
    this.drawCenteredImage(this.images[powerup.type])
    this.context.restore()
  }


  drawTiles() {
    const start = this.viewport.toCanvas(
      { x: Constants.WORLD_MIN, y: Constants.WORLD_MIN })
    const end = this.viewport.toCanvas(
      { x: Constants.WORLD_MAX, y: Constants.WORLD_MAX })
    for (let x = start.x; x < end.x; x += Constants.DRAWING_TILE_SIZE) {
      for (let y = start.y; y < end.y; y += Constants.DRAWING_TILE_SIZE) {
        this.context.drawImage(this.images[Constants.DRAWING_IMG_TILE], x, y)
      }
    }
  }
}

module.exports = Drawing
