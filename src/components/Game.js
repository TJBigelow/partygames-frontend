import React, { Component } from "react";
import GameSubmissions from "./GameSubmissions";
import GameRecap from "./GameRecap";

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
          console.log(data);
          this.props.updateApp(data);
        },
      }
    );
  }

  componentWillUnmount() {
    this.props.cableApp.room.unsubscribe();
  }

  startGame = () => {
    fetch(`http://localhost:3000/games/${this.props.gameData.id}`, {
      method: "POST",
    });
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

  renderGame = () => {
    switch (this.props.gameData.active_phase) {
      case "starting":
        return (
          <table className="center">
            <thead>
              <tr>
                <th>Players</th>
              </tr>
            </thead>
            <tbody>{this.renderPlayers()}</tbody>
            Starting in {this.props.gameData.timer} seconds;
          </table>
        );
      case "submissions":
        return <GameSubmissions gameData={this.props.gameData} />;
      case "recap":
        return <GameRecap gameData={this.props.gameData} />;
      default:
        return (
          <table className="center">
            <thead>
              <tr>
                <th>Players</th>
              </tr>
            </thead>
            <tbody>{this.renderPlayers()}</tbody>
          </table>
        );
    }
  };

  render() {
    return (
      <div>
        <h1>{this.props.gameData.code}</h1>
        {this.props.gameData.started ? (
          this.renderGame()
        ) : (
          <div>
            <table className="center">
              <thead>
                <tr>
                  <th>Players</th>
                </tr>
              </thead>
              <tbody>{this.renderPlayers()}</tbody>
            </table>
            <button onClick={this.startGame}>Start Game</button>
          </div>
        )}
      </div>
    );
  }
}
