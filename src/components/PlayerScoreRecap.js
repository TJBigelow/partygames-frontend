import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class PlayerRecap extends Component {
    render() {
        return (
            <div>
                {this.props.gameData.round_number === 3 ? <h3>Game Over</h3> : `Waiting for Round ${this.props.gameData.round_number + 1}`}
                {this.props.gameData.round_number === 3 ? <Button onClick={() => {this.props.setScreen({screen: "landing"})}}>Return to Home</Button> : null}
            </div>
        )
    }
}
