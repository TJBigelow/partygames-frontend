import React, { Component } from "react";

export default class GameRecap extends Component {
  render() {
    return (
      <div>
        <h2>Round {this.props.gameData.round}:</h2>
        <h1>{this.props.gameData.matchup.prompt}</h1>
        <table className="center" style={{ width: "50%" }}>
          <tbody>
            <tr>
              <td style={{ width: "40%" }}>
                <h2>{this.props.gameData.matchup.player1_response}</h2>
                <h5>{this.props.gameData.players.find(player => player.id === this.props.gameData.matchup.player1_id).username}</h5>
              </td>
              <td style={{ width: "20%" }}>
                <h4>vs.</h4>
              </td>
              <td style={{ width: "40%" }}>
                <h2>{this.props.gameData.matchup.player2_response}</h2>
                <h5>{this.props.gameData.players.find(player => player.id === this.props.gameData.matchup.player2_id).username}</h5>
              </td>
            </tr>
          </tbody>
        </table>
        {this.props.gameData.timer} seconds left to vote
      </div>
    );
  }
}
