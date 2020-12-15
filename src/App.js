import Game from "./components/Game";
import Landing from "./components/Landing";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import React, { Component } from "react";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      game: { code: 0, players: [] },
      currentUser: {},
    };
  }

  getGameData = (id) => {
    fetch(`http://localhost:3000/games/${id}`)
      .then((resp) => resp.json())
      .then((result) => {
        this.setState({
          game: result,
        });
      });
  };

  updateAppStateGame = (newGame) => {
    this.setState({
      game: {
        game: newGame,
      },
    });
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/game/:id">
            <Game
              cableApp={this.props.cableApp}
              updateApp={this.updateAppStateGame}
              getGameData={this.getGameData}
              gameData={this.state.game}
              currentUser={this.state.currentUser}
            />
          </Route>
          <Route component={Landing} path="/" />
        </Switch>
      </div>
    );
  }
}
