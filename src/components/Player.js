import React, { Component } from "react";
import PlayerSubmissions from "./PlayerSubmissions";
import PlayerVoting from "./PlayerVoting";

export default class Player extends Component {
  constructor() {
    super();
    this.state = {
      message: "Waiting for game to begin",
      prompt: "",
    };
  }

  componentDidMount() {
    this.props.getPlayerData(window.location.href.match(/\d+$/)[0]);
    this.props.cableApp.room = this.props.cableApp.cable.subscriptions.create(
      {
        channel: "PlayersChannel",
        player: window.location.href.match(/\d+$/)[0],
      },
      {
        received: (data) => {
          // this.props.updateApp(updatedPlayer);
          console.log(data);
          this.setState(data);
        },
      }
    );
  }

  componentWillUnmount() {
    this.props.cableApp.room = null;
  }

  renderPlayer = () => {
    console.log("render:", this.state)
    switch (this.state.active_phase) {
      case "submissions":
        return (
          <PlayerSubmissions
            prompt={this.state.prompt}
            matchup={this.state.matchup}
            player_number={this.state.player_number}
          />
        );
      case "recap":
          return (
            <PlayerVoting
              matchup={this.state.matchup}
              voter_id={this.state.voter_id}
            />
          )
      default:
        return this.state.message
    }
  };

  render() {
    return (
      <div>
        <h1>{this.props.currentUser.username}</h1>

        <div>
          {this.renderPlayer()}
        </div>
      </div>
    );
  }
}
