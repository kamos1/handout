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
    fetch(`/api/v1/user/${username}/getWins`, {
            method: 'GET',
          })
          .then(resp => (resp.json()))
          .then(output => this.setState({wins: output.text}))
          .catch(console.log('something did not happen wins'))
  }

  fetchLosses(username){
    fetch(`/api/v1/user/${username}/getLosses`, {
            method: 'GET',
          })
          .then(resp => (resp.json()))
          .then(output => this.setState({losses: output.text}))
          .catch(console.log('something did not happen losses'))
  }

  render() {
    return (
      <section className='main'>
        <h1 className='title'>handOUT</h1>
        <Input fetchWins={this.fetchWins.bind(this)} fetchLosses={this.fetchLosses.bind(this)}/>
        <h1 className='output'>{this.state.wins}</h1>
        <h1 className='output'>{this.state.losses}</h1>
      </section>
    );
  }
}
