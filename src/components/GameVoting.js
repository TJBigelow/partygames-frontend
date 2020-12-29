import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class GameRecap extends Component {
  render() {
    return (
      <div>
        <h2>Round {this.props.gameData.round}:</h2>
        <h1>{this.props.gameData.matchup.prompt}</h1>
        <Table>
          <tbody>
            <tr>
              <td style={{ width: "40%", color: "steelblue" }}>
                <h2>{this.props.gameData.matchup.player1_response}</h2>
              </td>
              <td style={{ width: "20%" }}>
                <h4>vs.</h4>
              </td>
              <td style={{ width: "40%", color: "tomato" }}>
                <h2>{this.props.gameData.matchup.player2_response}</h2>
              </td>
            </tr>
          </tbody>
        </Table>
        {this.props.gameData.timer} seconds left to vote
      </div>
    );
  }
}
