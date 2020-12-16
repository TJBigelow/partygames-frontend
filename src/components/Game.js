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
        {this.props.gameData.started ? `Game begins in ${this.props.gameData.timer}` : <button onClick={this.startGame}>Start Game</button>}
      </div>
    );
  }
}
