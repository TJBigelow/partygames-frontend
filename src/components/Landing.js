import React, { useState } from "react";

export default function Landing(props) {
  const [userName, setUserName] = useState("");
  const [gameCode, setGameCode] = useState("");

  const createGame = () => {
    fetch("http://localhost:3000/games", {
      method: "POST",
    })
      .then((resp) => resp.json())
      .then(resp => props.history.push(`/game/${resp.id}`));
  };

  const joinGame = (e) => {
    e.preventDefault();
    fetch(
      `http://localhost:3000/players?username=${userName}&game=${gameCode}`,
      {
        method: "POST",
      }
    )
      .then((resp) => resp.json())
      .then(resp => props.history.push(`/game/${resp.game_id}`))
  };

  return (
    <div>
      Welcome to Quips against Humanity
      <div>
          <button onClick={createGame}><h3>Create Game</h3></button>
      </div>
      <h3>or</h3>
      <form onSubmit={joinGame}>
        <input
          onChange={(e) => setGameCode(e.target.value.toUpperCase())}
          value={gameCode}
          placeholder="Game Code"
          maxLength="4"
          size='6'
        ></input>
        <input
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          maxLength="15"
          placeholder="Your Name"
        ></input>
        <button>Join Game</button>
      </form>
    </div>
  );
}
