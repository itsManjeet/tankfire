const Constants = require('../lib/Constants')
const Entity = require('../lib/Entity')
const Vector = require('../lib/Vector')

class Bullet extends Entity {

  constructor(position, velocity, angle, source) {
    super(position, velocity, Vector.zero(), Constants.BULLET_HITBOX_SIZE)

    this.angle = angle
    this.source = source

    this.damage = Constants.BULLET_DEFAULT_DAMAGE
    this.distanceTraveled = 0
    this.destroyed = false
  }

  static createFromPlayer(player, angleDeviation = 0) {
    const angle = player.turretAngle + angleDeviation
    return new Bullet(
      player.position.copy(),
      Vector.fromPolar(Constants.BULLET_SPEED, angle),
      angle,
      player
    )
  }

  update(lastUpdateTime, deltaTime) {
    const distanceStep = Vector.scale(this.velocity, deltaTime)
    this.position.add(distanceStep)
    this.distanceTraveled += distanceStep.mag2
    if (this.inWorld() || distanceStep > Bullet.MAX_TRAVEL_DISTANCE_SQ) {
      this.destroyed = true
    }
  }
}

module.exports = Bullet
