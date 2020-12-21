import React, { Component } from "react";

export default class GameSubmissions extends Component {
  render() {
    return (
      <div>
        <h1>Fill out the form on your device</h1>
        <p>{this.props.gameData.timer} seconds remaining in Round{" "}
        {this.props.gameData.round}</p>
      </div>
    );
  }
}
