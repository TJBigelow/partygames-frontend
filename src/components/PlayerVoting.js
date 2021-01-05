import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
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
      <div className="justify-content-center">
        <h3>{this.props.matchup.prompt}</h3>
        <Row className='justify-content-center'>
          <Col className="col-12 col-md-5">
            <button
              data-id={this.props.matchup.player1_id}
              onClick={this.handleVote}
              className="btn btn-primary btn-block my-3"
            >
              {this.props.matchup.player1_response}
            </button>
          </Col>
          <Col className="col-12 col-md-5">
            <button
              data-id={this.props.matchup.player2_id}
              onClick={this.handleVote}
              className="btn btn-danger btn-block my-3"
            >
              {this.props.matchup.player2_response}
            </button>
          </Col>
        </Row>
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
