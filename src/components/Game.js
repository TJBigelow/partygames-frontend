import React, { Component } from "react";
import GameSubmissions from "./GameSubmissions";
import GameRecap from "./GameRecap";
import GameVoting from "./GameVoting";
import GameScoreRecap from "./GameScoreRecap";
import URL from "../url";
import { Table, Button, Jumbotron } from "react-bootstrap";

export default class Game extends Component {
  componentDidMount() {
    this.props.getGameData();
    this.props.cableApp.room = this.props.cableApp.cable.subscriptions.create(
      {
        channel: "GamesChannel",
        game: this.props.gameData.id,
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
    fetch(`${URL}/games/${this.props.gameData.id}`, {
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
          <Table className="table-striped">
            <thead>
              <tr>
                <th>Players</th>
              </tr>
            </thead>
            <tbody>{this.renderPlayers()}</tbody>
            Starting in {this.props.gameData.timer} seconds;
          </Table>
        );
      case "submissions":
        return <GameSubmissions gameData={this.props.gameData} />;
      case "voting":
        return <GameVoting gameData={this.props.gameData} />;
      case "recap":
        return <GameRecap gameData={this.props.gameData} />;
      case "score":
        return <GameScoreRecap gameData={this.props.gameData} setScreen={this.props.setScreen} />
      default:
        return (
          <Table className="table-striped">
            <thead>
              <tr>
                <th>Players</th>
              </tr>
            </thead>
            <tbody>{this.renderPlayers()}</tbody>
          </Table>
        );
    }
  };

  render() {
    return (
      <div className="container">
        <Jumbotron><h1>{this.props.gameData.code}</h1></Jumbotron>
        {this.props.gameData.started ? (
          this.renderGame()
        ) : (
          <div>
            <Table className="table-striped">
              <thead>
                <tr>
                  <th>Players</th>
                </tr>
              </thead>
              <tbody>{this.renderPlayers()}</tbody>
            </Table>
            <Button onClick={this.startGame}>Start Game</Button>
          </div>
        )}
      </div>
    );
  }
}
