import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class PlayerRecap extends Component {
    render() {
        return (
            <div>
                {this.props.gameData.round_number === 3 ? 'Game Over' : `Waiting for Round ${this.props.gameData.round_number + 1}`}<br />
                {this.props.gameData.round_number === 3 ? <Button onClick={() => {this.props.setScreen({screen: "landing"})}}>Return to Home</Button> : null}
            </div>
        )
    }
}
