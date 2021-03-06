# Application Name: Handout
[![CircleCI](https://circleci.com/gh/kamos1/handout/tree/master.svg?style=svg)](https://circleci.com/gh/kamos1/handout/tree/master)

## Overview:
Handout is a slackbot that I created for my module 3 personal project. It allows users on Slack to jokingly give one another a win or loss for something they have done. The backend is built with Express, Knex, and Postgres. The backend stores the username and the number of wins and losses associated with it. The frontend is built with React. Using the predefined slash commands users can retrieve the number of wins and losses they have. If you would like to test it out for yourself, my username is @keji, the commands are below and the link to join the Slack team is [here](https://join.slack.com/winslow-hq/shared_invite/MjA4MzY1MTQyODgzLTE0OTkyOTQzNjAtMDI2MzE5YjQwYg) and the frontend can be accessed [here](https://secret-oasis-40675.herokuapp.com/)

[A quick demo](http://recordit.co/KN9dLoaANl)

Slash Commands

give someone a win

 - /give win @username

give someone a loss

 - /give loss @username

check how many wins or losses a user has

 - /check wins @username

 - /check losses @username

## Installation and Setup
- git clone
- npm install
- create a new database
  in the terminal with the following commands
  - psql
  - CREATE DATABASE *name of database*;
  - \q
- update knexfile.js
  - under development change connection from
   *postgres://localhost/slack* to *postgres://localhost/'database you just created'*
- knex migrate:latest
- knex seed:run
- npm start
- mocha
(*you will need to have mocha globally installed to run this command*)
