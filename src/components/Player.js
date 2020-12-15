import React, { Component } from 'react'

export default class Player extends Component {
    componentDidMount() {
        this.props.getPlayerData(window.location.href.match(/\d+$/)[0]);
        this.props.cableApp.room = this.props.cableApp.cable.subscriptions.create(
          {
            channel: "PlayersChannel",
            player: window.location.href.match(/\d+$/)[0],
          },
          {
            received: (updatedPlayer) => {
              this.props.updateApp(updatedPlayer);
            },
          }
        );
      }

    render() {
        return (
            <div>
                <h1>{this.props.currentUser.username}</h1>
                <p>Waiting for game to begin</p>
            </div>
        )
    }
}
