import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimit: 25,
    start: false,
    seconds: 0,
    reset: true,
    limitValue: 25,
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  startOrPause = async () => {
    await this.setState(prev => ({start: !prev.start, reset: false}))
    const {start} = this.state
    if (start) {
      this.timerId = setInterval(this.tick, 1000)
    } else {
      clearInterval(this.timerId)
    }
  }

  tick = () => {
    const {timerLimit, seconds} = this.state
    if (timerLimit === 0 && seconds === 0) {
      clearInterval(this.timerId)
      this.setState({
        timerLimit: 25,
        start: false,
        seconds: 0,
        reset: true,
        limitValue: 25,
      })
    } else if (seconds === 0) {
      this.setState(prev => ({timerLimit: prev.timerLimit - 1, seconds: 59}))
    } else {
      this.setState(prev => ({seconds: prev.seconds - 1}))
    }
  }

  resetTimer = () => {
    clearInterval(this.timerId)
    this.setState({
      timerLimit: 25,
      start: false,
      seconds: 0,
      reset: true,
      limitValue: 25,
    })
  }

  minus = () => {
    const {timerLimit, reset} = this.state
    if (reset && timerLimit > 0) {
      this.setState(prev => ({
        timerLimit: prev.timerLimit - 1,
        limitValue: prev.limitValue - 1,
      }))
    }
  }

  plus = () => {
    const {reset} = this.state
    if (reset) {
      this.setState(prev => ({
        timerLimit: prev.timerLimit + 1,
        limitValue: prev.limitValue + 1,
      }))
    }
  }

  render() {
    const {timerLimit, start, seconds, limitValue} = this.state
    return (
      <div className="page-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="card-container">
            <div className="container">
              <h1 className="time">{`${
                timerLimit < 10 ? `0${timerLimit}` : timerLimit
              }:${seconds < 10 ? `0${seconds}` : seconds}`}</h1>
              <p className="status">{start ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="box-container">
            <div className="buttons-container">
              <button
                onClick={this.startOrPause}
                type="button"
                className="status-button"
              >
                <img
                  className="status-image"
                  src={
                    start
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                  alt={start ? 'pause icon' : 'play icon'}
                />
                <p className="status-heading">{start ? 'Pause' : 'Start'}</p>
              </button>
              <button
                onClick={this.resetTimer}
                type="button"
                className="status-button"
              >
                <img
                  className="status-image"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <p className="status-heading">Reset</p>
              </button>
            </div>
            <p className="description">Set Timer limit</p>
            <div className="limit-container">
              <button
                onClick={this.minus}
                type="button"
                className="status-button minus"
              >
                -
              </button>
              <p className="limit-value">
                {limitValue < 10 ? `0${limitValue}` : limitValue}
              </p>
              <button
                onClick={this.plus}
                type="button"
                className="status-button plus"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
