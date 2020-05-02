
class Input {

  constructor() {
    this.up = false
    this.down = false
    this.left = false
    this.right = false

    this.mouseDown = false
    this.mouseCoords = [0, 0]
  }

  static create(keyElement, mouseMoveElement) {
    const input = new Input()
    input.applyEventHandlers(keyElement, keyElement, mouseMoveElement)
    return input
  }


  onKeyDown(event) {
    /* eslint-disable no-fallthrough */
    switch (event.keyCode) {
    case 37:
    case 65:
    case 97:
      this.left = true
      break
    case 38:
    case 87:
    case 199:
      this.up = true
      break
    case 39:
    case 68:
    case 100:
      this.right = true
      break
    case 40:
    case 83:
    case 115:
      this.down = true
    default:
      break
    }
    /* eslint-enable no-fallthrough */
  }

  onKeyUp(event) {
    /* eslint-disable no-fallthrough */
    switch (event.keyCode) {
    case 37:
    case 65:
    case 97:
      this.left = false
      break
    case 38:
    case 87:
    case 199:
      this.up = false
      break
    case 39:
    case 68:
    case 100:
      this.right = false
      break
    case 40:
    case 83:
    case 115:
      this.down = false
    default:
      break
    }
    /* eslint-enable no-fallthrough */
  }

  onMouseDown(event) {
    if (event.which === 1) {
      this.mouseDown = true
    }
  }

  onMouseUp(event) {
    if (event.which === 1) {
      this.mouseDown = false
    }
  }


  onMouseMove(event) {
    this.mouseCoords = [event.offsetX, event.offsetY]
  }


  applyEventHandlers(keyElement, mouseClickElement, mouseMoveElement) {
    keyElement.addEventListener('keydown', this.onKeyDown.bind(this))
    keyElement.addEventListener('keyup', this.onKeyUp.bind(this))
    mouseClickElement.addEventListener('mousedown', this.onMouseDown.bind(this))
    mouseClickElement.addEventListener('mouseup', this.onMouseUp.bind(this))
    mouseMoveElement.setAttribute('tabindex', 1)
    mouseMoveElement.addEventListener('mousemove', this.onMouseMove.bind(this))
  }
}

module.exports = Input
