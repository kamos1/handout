import React, { Component } from 'react';
import Input from './Input'

export default class App extends Component {
  constructor() {
    super(),
    this.state = {
      wins: '',
      losses: ''
    }
  }

  fetchWins(username){
    fetch(`/getWins?username=${username}`, {
            method: 'GET',
          })
          .then(resp => (resp.json()))
          .then(output => this.setState({wins: output.text}))
          .catch(console.log('something did not happen wins'))
  }

  fetchLosses(username){
    fetch(`/getLosses?username=${username}`, {
            method: 'GET',
          })
          .then(resp => (resp.json()))
          .then(output => this.setState({losses: output.text}))
          .catch(console.log('something did not happen losses'))
  }

  render() {
    return (
      <section className='main'>
        <div>handOUT</div>
        <Input fetchWins={this.fetchWins.bind(this)} fetchLosses={this.fetchLosses.bind(this)}/>
        <h1>{this.state.wins}</h1>
        <h1>{this.state.losses}</h1>
      </section>
    );
  }
}
