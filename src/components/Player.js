import React, { Component } from "react";
import PlayerSubmissions from "./PlayerSubmissions";
import PlayerVoting from "./PlayerVoting";
import PlayerRecap from "./PlayerRecap";
import PlayerScoreRecap from "./PlayerScoreRecap";

export default class Player extends Component {
  constructor() {
    super();
    this.state = {
      message: "Waiting for game to begin",
      prompt: "",
    };
  }

  componentDidMount() {
    this.props.getPlayerData();
    this.props.cableApp.room = this.props.cableApp.cable.subscriptions.create(
      {
        channel: "PlayersChannel",
        player: this.props.currentUser.id,
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
      case "voting":
          return (
            <PlayerVoting
              matchup={this.state.matchup}
              voter_id={this.state.voter_id}
            />
          )
      case "recap":
        return <PlayerRecap />
      case "score":
        return <PlayerScoreRecap setScreen={this.props.setScreen} gameData={this.state} />
      default:
        return this.state.message
    }
  };

  render() {
    return (
      <div className='container'>
        <h1>{this.props.currentUser.username}</h1>

        <div style={{width: '100%'}} className='justify-content-center'>
          {this.renderPlayer()}
        </div>
      </div>
    );
  }
}
