const Constants = require('../lib/Constants')
const Entity = require('../lib/Entity')
const Util = require('../lib/Util')
const Vector = require('../lib/Vector')

class Powerup extends Entity {

  constructor(position, type, data, duration) {
    super(position, null, null, Constants.POWERUP_HITBOX_SIZE)

    this.type = type
    this.data = data
    this.duration = duration
    this.expirationTime = 0

    this.destroyed = false
  }

  static create() {
    const position = new Vector(
      Util.randRange(Constants.WORLD_MIN + Constants.WORLD_PADDING,
        Constants.WORLD_MAX - Constants.WORLD_PADDING),
      Util.randRange(Constants.WORLD_MIN + Constants.WORLD_PADDING,
        Constants.WORLD_MAX - Constants.WORLD_PADDING))
    const type = Util.choiceArray(Constants.POWERUP_KEYS)
    const dataRanges = Constants.POWERUP_DATA[type]
    let data = null
    switch (type) {
    case Constants.POWERUP_HEALTHPACK:
      data = Util.randRangeInt(dataRanges.MIN, dataRanges.MAX + 1)
      break
    case Constants.POWERUP_SHOTGUN:
      data = Util.randRangeInt(dataRanges.MIN, dataRanges.MAX + 1)
      break
    case Constants.POWERUP_RAPIDFIRE:
      data = Util.randRange(dataRanges.MIN, dataRanges.MAX)
      break
    case Constants.POWERUP_SPEEDBOOST:
      data = Util.randRange(dataRanges.MIN, dataRanges.MAX)
      break
    case Constants.POWERUP_SHIELD:
      data = Util.randRangeInt(dataRanges.MIN, dataRanges.MAX + 1)
      break
    }
    const duration = Util.randRange(
      Constants.POWERUP_MIN_DURATION, Constants.POWERUP_MAX_DURATION)
    return new Powerup(position, type, data, duration)
  }

  update(lastUpdateTime) {
    this.expirationTime = lastUpdateTime + this.duration
  }
}

module.exports = Powerup
