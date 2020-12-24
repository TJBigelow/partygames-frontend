import React, { Component } from "react";

export default class GameScoreRecap extends Component {
  renderScores = () => {
    return this.props.gameData.players.sort((a,b) => {return b.score - a.score}).map((player) => {
      return (
        <tr key={player.id}>
          <td style={{ color: player.isbot ? "blue" : "black" }}>
            {player.username}
          </td>
          <td>{player.score}</td>
        </tr>
      );
    });
  };

  render() {
    return (
      <table className="center">
        <thead>
          <tr>
            <th>Players</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>{this.renderScores()}</tbody>
      </table>
    );
  }
}
