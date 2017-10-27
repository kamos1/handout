import React, { Component } from 'react';

export default class Input extends Component {
  constructor() {
    super();
    this.state = {
      username: ''
    }
  }

  handleInput(){
    this.props.fetchWins(this.state.username);
    this.props.fetchLosses(this.state.username);
    this.setState({username: ''});
  }

  render() {
    return (
      <section>
        <h3>Enter a username to find the number of wins and losses</h3>
        <input className='text-box'
          type='text'
          value={this.state.username}
          placeholder='Enter a username'
          onChange={(event) => {
            this.setState({username: event.target.value})
          }}/>
        <input className='submit-btn'
          type='submit'
          name='Submit'
          onClick={() => this.handleInput()}
        />
      </section>
    )
  }
}
