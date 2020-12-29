import React, { Component } from "react";
import { Table } from "react-bootstrap";

export default class GameRecap extends Component {
  p1winner = () => {
    return (
      this.props.gameData.player1_votes > this.props.gameData.player2_votes
    );
  };
  p2winner = () => {
    return (
      this.props.gameData.player1_votes < this.props.gameData.player2_votes
    );
  };

  render() {
    return (
      <div>
        <h2>Round {this.props.gameData.round}:</h2>
        <h1>{this.props.gameData.matchup.prompt}</h1>
        <Table>
          <tbody>
            <tr>
              <td
                style={{
                  width: "40%",
                  color: `${this.p1winner() ? "blue" : "steelblue"}`,
                }}
              >
                <h2
                  className={
                    this.p1winner() ? "font-weight-bold" : "font-weight-light"
                  }
                >
                  {this.props.gameData.matchup.player1_response}
                </h2>
                <h5>
                  {
                    this.props.gameData.players.find(
                      (player) =>
                        player.id === this.props.gameData.matchup.player1_id
                    ).username
                  }
                </h5>
                <h5>{this.props.gameData.player1_votes} Votes</h5>
              </td>
              <td style={{ width: "20%" }}>
                <h4>vs.</h4>
              </td>
              <td
                style={{
                  width: "40%",
                  color: `${this.p2winner() ? "red" : "tomato"}`,
                }}
              >
                <h2
                  className={
                    this.p2winner() ? "font-weight-bold" : "font-weight-light"
                  }
                >
                  {this.props.gameData.matchup.player2_response}
                </h2>
                <h5>
                  {
                    this.props.gameData.players.find(
                      (player) =>
                        player.id === this.props.gameData.matchup.player2_id
                    ).username
                  }
                </h5>
                <h5>{this.props.gameData.player2_votes} Votes</h5>
              </td>
            </tr>
          </tbody>
        </Table>
        {this.props.gameData.timer} seconds until next matchup
      </div>
    );
  }
}
