import React, { Component } from "react";

export default class PlayerSubmissions extends Component {
  constructor() {
    super();
    this.state = {
      submission: "",
      submitted: false,
    };
  }

  handleChange = (e) => {
    this.setState({ submission: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    const response =
      this.props.player_number === "player1"
        ? { player1_response: this.state.submission }
        : { player2_response: this.state.submission };
    console.log("Fetch:", `https://tjb-partygame-api.herokuapp.com/matchups/${this.props.matchup}`, this.props.player_number)
    fetch(`https://tjb-partygame-api.herokuapp.com/matchups/${this.props.matchup}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response),
    });
  };

  render() {
    return (
      <div>
        {console.log('matchup:', this.props.matchup)}
        {this.state.submitted ? null : (
          <div>
            <h2>{this.props.prompt}</h2>
            <form onSubmit={this.handleSubmit}>
              <input
                onChange={this.handleChange}
                value={this.state.submission}
              ></input>
              <input type="submit"></input>
            </form>
          </div>
        )}
      </div>
    );
  }
}
