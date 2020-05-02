const Constants = require('../../../lib/Constants')

class Chat {

  constructor(socket, displayElement, inputElement) {
    this.socket = socket
    this.displayElement = displayElement
    this.inputElement = inputElement
  }


  static create(socket, displayElementID, inputElementID) {
    const displayElement = document.getElementById(displayElementID)
    const inputElement = document.getElementById(inputElementID)
    const chat = new Chat(socket, displayElement, inputElement)
    chat.init()
    return chat
  }


  init() {
    this.inputElement.addEventListener('keydown',
      this.onInputKeyDown.bind(this))
    this.socket.on(Constants.SOCKET_CHAT_SERVER_CLIENT,
      this.onChatReceive.bind(this))
  }


  onInputKeyDown(event) {
    if (event.keyCode === 13) {
      const text = this.inputElement.value
      this.inputElement.value = ''
      this.socket.emit(Constants.SOCKET_CHAT_CLIENT_SERVER, text)
    }
  }

  onChatReceive(data) {
    const element = document.createElement('li')
    if (data.isNotification) {
      element.setAttribute('class', 'notification')
    }
    element.appendChild(
      document.createTextNode(`${data.name}: ${data.message}`))
    this.displayElement.appendChild(element)
  }
}

module.exports = Chat
