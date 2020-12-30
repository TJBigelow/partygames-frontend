import Game from "./components/Game";
import Landing from "./components/Landing";
import Player from "./components/Player";
import Watch from "./components/Watch";
import "./App.css";
import React, { Component } from "react";
import { Container } from "react-bootstrap";
import URL from "./url";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      game: { code: 0, players: [] },
      currentUser: {},
      screen: "landing",
    };
  }

  getGameData = () => {
    fetch(`${URL}/games/${this.state.game.id}`)
      .then((resp) => resp.json())
      .then((result) => {
        this.setState({
          game: result,
        });
      });
  };

  getPlayerData = () => {
    fetch(`${URL}/players/${this.state.currentUser.id}`)
      .then((resp) => resp.json())
      .then((result) => {
        this.setState({
          game: result.game,
          currentUser: result,
        });
      });
  };

  updateAppStateGame = (data) => {
    this.setState({
      game: { ...this.state.game, ...data },
    });
  };

  setScreen = ({
    game = this.state.game,
    player = this.state.player,
    screen,
  }) => {
    console.log(game, screen);
    this.setState({ game: game, currentUser: player, screen: screen });
  };

  renderScreen = () => {
    switch (this.state.screen) {
      case "landing":
        return <Landing setScreen={this.setScreen} />;
      case "game":
        return (
          <Game
            cableApp={this.props.cableApp}
            updateApp={this.updateAppStateGame}
            getGameData={this.getGameData}
            gameData={this.state.game}
            currentUser={this.state.currentUser}
            setScreen={this.setScreen}
          />
        );
      case "player":
        return (
          <Player
            cableApp={this.props.cableApp}
            updateApp={this.updateAppStateGame}
            getPlayerData={this.getPlayerData}
            gameData={this.state.game}
            currentUser={this.state.currentUser}
          />
        );
      case "watch":
        return (
          <Watch
            cableApp={this.props.cableApp}
            updateApp={this.updateAppStateGame}
            getGameData={this.getGameData}
            gameData={this.state.game}
            currentUser={this.state.currentUser}
            setScreen={this.setScreen}
          />
        );
    }
  };

  render() {
    return (
      <Container>
        <div className="App d-flex justify-content-center align-self-center">
          {this.renderScreen()}
        </div>
      </Container>
    );
  }
}
