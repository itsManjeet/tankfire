class Leaderboard {

  constructor(container) {
    this.container = container
  }

  static create(containerElementID) {
    return new Leaderboard(document.getElementById(containerElementID))
  }

  update(players) {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild)
    }
    players.sort((a, b) => { return b.kills - a.kills })

    players.slice(0, 10).forEach(player => {

        const containercontainer = document.createElement('li')
        const text = 
          `${player.name} - Kills: ${player.kills} Deaths: ${player.deaths}`
        containercontainer.appendChild(document.createTextNode(text))
        this.container.appendChild(containercontainer)
    })
  }
}

module.exports = Leaderboard
