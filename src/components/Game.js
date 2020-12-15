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
        received: (updatedGame) => {
          this.props.updateApp(updatedGame);
        },
      }
    );
  }

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
        {console.log(this.props.gameData.players)}
        {this.props.gameData.code}
        <table>{this.renderPlayers()}</table>
      </div>
    );
  }
}
