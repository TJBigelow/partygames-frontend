import React, { Component } from "react";

export default class Player extends Component {
  constructor() {
    super();
    this.state = {
      message: "Waiting for game to begin",
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
          this.setState({ message: data.message });
        },
      }
    );
  }

  render() {
    return (
      <div>
        <h1>{this.props.currentUser.username}</h1>
        <p>{this.state.message}</p>
      </div>
    );
  }
}
