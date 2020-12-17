import React, { Component } from "react";

export default class Game extends Component {
  componentDidMount() {
    this.props.getGameData(window.location.href.match(/\d+$/)[0]);
    this.props.cableApp.room = this.props.cableApp.cable.subscriptions.create(
      {
        channel: "GamesChannel",
        game: window.location.href.match(/\d+$/)[0],
      },
      {
        received: (data) => {
          this.props.updateApp(data);
        },
      }
    );
  }

  componentWillUnmount() {
    this.props.cableApp.room.unsubscribe()
  }

  startGame = () => {
    fetch(`http://localhost:3000/games/${this.props.gameData.id}`, {
      method: "POST",
    })
  };

  renderPlayers = () => {
    return this.props.gameData.players.map((player) => {
      return (
        <tr key={player.id}>
          <td style={{ color: player.isbot ? "blue" : "black" }}>
            {player.username}
          </td>
        </tr>
      );
    });
  };

  renderTimer = () => {
    switch(this.props.gameData.active_phase) {
      case 'starting':
        return `Starting in ${this.props.gameData.timer} seconds`
      case 'round 1':
        return `${this.props.gameData.timer} seconds remaining in Round 1`
      case 'round 2':
        return `${this.props.gameData.timer} seconds remaining in Round 2`
      case 'round 3':
        return `${this.props.gameData.timer} seconds remaining in Round 3`
      default:
        return ''
    }
  }

  render() {
    return (
      <div>
        <h1>{this.props.gameData.code}</h1>
        <table className="center">
          <thead>
            <tr>
              <th>Players</th>
            </tr>
          </thead>
          <tbody>{this.renderPlayers()}</tbody>
        </table>
        {this.props.gameData.started ? this.renderTimer() : <button onClick={this.startGame}>Start Game</button>}
      </div>
    );
  }
}
