const Constants = require('./Constants')
const Util = require('./Util')
const Vector = require('./Vector')

class Entity {

  constructor(position, velocity, acceleration, hitboxSize) {
    this.position = position || Vector.zero()
    this.velocity = velocity || Vector.zero()
    this.acceleration = acceleration || Vector.zero()
    this.hitboxSize = hitboxSize
  }

  collided(other) {
    const minDistance = this.hitboxSize + other.hitboxSize
    return Vector.sub(this.position, other.position).mag2 <=
      minDistance * minDistance
  }

  inWorld() {
    return Util.inBound(this.x, Constants.WORLD_MIN, Constants.WORLD_MAX) &&
      Util.inBound(this.y, Constants.WORLD_MIN, Constants.WORLD_MAX)
  }

  boundToWorld() {
    this.position.x = Util.bound(
      this.position.x, Constants.WORLD_MIN, Constants.WORLD_MAX)
    this.position.y = Util.bound(
      this.position.y, Constants.WORLD_MIN, Constants.WORLD_MAX)
  }
}

module.exports = Entity
