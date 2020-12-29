import React, { useState } from "react";
import { Button, Jumbotron , Form, Col, InputGroup } from "react-bootstrap";
import URL from "../url";

export default function Landing(props) {
  const [userName, setUserName] = useState("");
  const [gameCode, setGameCode] = useState("");
  const [error, setError] = useState("");

  const createGame = () => {
    fetch(`${URL}/games`, {
      method: "POST",
    })
      .then((resp) => resp.json())
      .then((resp) => props.history.push(`/game/${resp.id}`));
  };

  const watchGame = (e) => {
    e.preventDefault();
    fetch(`${URL}/watch/${gameCode}`, {
      method: "POST",
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp) {
          props.history.push(`/game/${resp.id}`);
        } else {
          setError("Game does not exist");
        }
      });
  };

  const joinGame = (e) => {
    e.preventDefault();
    if (userName.length < 1) {
      setError("Username is too short");
    } else {
      fetch(`${URL}/players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          game: gameCode,
        }),
      })
        .then((resp) => resp.json())
        .then((resp) => {
          switch (resp.exception) {
            case "#<NoMethodError: undefined method `started' for nil:NilClass>":
              setError("Game does not exist");
              break;
            case "#<NoMethodError: undefined method `save' for nil:NilClass>":
              setError("Game has already started");
              break;
            default:
              props.history.push(`/player/${resp.id}`);
          }
        });
    }
  };

  return (
    <div className="container h-100 align-items-center">
      <Jumbotron><h1>Welcome to Quips against Humanity</h1></Jumbotron>
      <Button onClick={createGame}>
        <h3>Create Game</h3>
      </Button>
      <h3>or</h3>
      <Form onSubmit={joinGame}>
        <Form.Row>
          <Col>
            <InputGroup className="input-group-sm">
              <Form.Control
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                value={gameCode}
                placeholder="Game Code"
                maxLength="4"
              ></Form.Control>
              <Form.Control
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                maxLength="15"
                placeholder="Your Name"
              ></Form.Control>
              <InputGroup.Append>
                <Button type="submit">Join Game</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Form.Row>
      </Form>
      <h3>or</h3>
      <Form onSubmit={watchGame}>
        <Form.Row>
          <Col>
            <InputGroup className="input-group-sm">
              <Form.Control
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                value={gameCode}
                placeholder="Game Code"
                maxLength="4"
              ></Form.Control>
              <InputGroup.Append>
                <Button type="submit">Watch Game</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Form.Row>
      </Form>
      {error ? <h3 style={{ color: "red" }}>{error}</h3> : null}
    </div>
  );
}
