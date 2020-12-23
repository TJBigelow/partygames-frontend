import React, { useState } from "react";
import URL from '../url'

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

  const joinGame = (e) => {
    e.preventDefault();
    if (userName.length < 1) {
      setError("Username is too short");
    } else {
      fetch(
        `${URL}/players`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: userName,
            game: gameCode
          })
        }
      )
        .then((resp) => resp.json())
        .then((resp) => {
          switch (resp.exception) {
            case "#<NoMethodError: undefined method `started' for nil:NilClass>":
              setError('Game does not exist')
              break
            case "#<NoMethodError: undefined method `save' for nil:NilClass>":
              setError('Game has already started')
              break
            default:
              props.history.push(`/player/${resp.id}`);
          }
        });
    }
  };

  return (
    <div>
      Welcome to Quips against Humanity
      <div>
        <button onClick={createGame}>
          <h3>Create Game</h3>
        </button>
      </div>
      <h3>or</h3>
      <form onSubmit={joinGame}>
        <input
          onChange={(e) => setGameCode(e.target.value.toUpperCase())}
          value={gameCode}
          placeholder="Game Code"
          maxLength="4"
          size="6"
        ></input>
        <input
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          maxLength="15"
          placeholder="Your Name"
        ></input>
        <button>Join Game</button>
        {error ? <h3 style={{ color: "red" }}>{error}</h3> : null}
      </form>
    </div>
  );
}
