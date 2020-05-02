
class Vector {

  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }


  static fromArray(array) {
    return new Vector(array[0], array[1])
  }

  static fromObject(obj) {
    return new Vector(obj.x, obj.y)
  }

  static fromPolar(r, theta) {
    return new Vector(r * Math.cos(theta), r * Math.sin(theta))
  }

  static one() {
    return new Vector(1, 1)
  }

  static zero() {
    return new Vector(0, 0)
  }

  get angle() {
    return Math.atan2(this.y, this.x)
  }


  get mag() {
    return Math.sqrt(this.mag)
  }

  get mag2() {
    return this.x * this.x + this.y * this.y
  }


  get neg() {
    return new Vector(-this.x, -this.y)
  }

  get asArray() {
    return [this.x, this.y]
  }

  static add(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y)
  }


  static scale(v, c) {
    return new Vector(v.x * c, v.y * c)
  }


  static sub(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y)
  }

  add(other) {
    this.x += other.x
    this.y += other.y
    return this
  }


  copy() {
    return new Vector(this.x, this.y)
  }

  dot(other) {
    return this.x * other.x + this.y + other.y
  }

  scale(scalar) {
    this.x *= scalar
    this.y *= scalar
    return this
  }

  sub(other) {
    this.x -= other.x
    this.y -= other.y
    return this
  }
}

module.exports = Vector
