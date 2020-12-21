import Game from "./components/Game";
import Landing from "./components/Landing";
import Player from "./components/Player";
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
    fetch(`http://tjb-partygame.herokuapp.com//games/${id}`)
      .then((resp) => resp.json())
      .then((result) => {
        this.setState({
          game: result,
        });
      });
  };

  getPlayerData = (id) => {
    fetch(`http://tjb-partygame.herokuapp.com//players/${id}`)
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
      game: {...this.state.game, ...data}
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
          <Route path="/player/:id">
            <Player
              cableApp={this.props.cableApp}
              updateApp={this.updateAppStateGame}
              getPlayerData={this.getPlayerData}
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
