import React, { Component } from "react";
import URL from "../url";

export default class PlayerVoting extends Component {
  constructor() {
    super();
    this.state = {
      voted: false,
    };
  }

  handleVote = (e) => {
    console.log({
      voter_id: this.props.voter_id,
      matchup_id: this.props.matchup.id,
      recipient_id: parseInt(e.target.dataset.id),
    });
    fetch(`${URL}/votes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        voter_id: this.props.voter_id,
        matchup_id: this.props.matchup.id,
        recipient_id: parseInt(e.target.dataset.id),
      }),
    })
      .then((resp) => resp.json())
      .then(this.setState({ voted: true }));
  };

  renderBallot = () => {
    return (
      <div>
        <h3>Vote:</h3>
        <button
          data-id={this.props.matchup.player1_id}
          onClick={this.handleVote}
        >
          {this.props.matchup.player1_response}
        </button>
        <br />
        <button
          data-id={this.props.matchup.player2_id}
          onClick={this.handleVote}
        >
          {this.props.matchup.player2_response}
        </button>
      </div>
    );
  };

  render() {
    return this.state.voted ? (
      <div>You have already voted</div>
    ) : (
      this.renderBallot()
    );
  }
}
