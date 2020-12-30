import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";

export default class GameScoreRecap extends Component {
  renderScores = () => {
    return this.props.gameData.players
      .sort((a, b) => {
        return b.score - a.score;
      })
      .map((player) => {
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
    console.log(this.props.gameData);
    return (
      <div>
        <h2>{this.props.gameData.round === 3 ? 'Game Over' : `Score after round ${this.props.gameData.round}`}</h2>
        <Table className="table-striped">
          <thead>
            <tr>
              <th>Players</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{this.renderScores()}</tbody>
        </Table>
        {this.props.gameData.round === 3 ? <Button onClick={() => {this.props.setScreen({screen: "landing"})}}>Return to Home</Button> : null}
      </div>
    );
  }
}
