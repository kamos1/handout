# Application Name: Handout
## Overview:
Handout is a slackbot built with Express and Postgresql for my personal project in Module 3 while at Turing School of Software and Design. It allows users on Slack to publicly praise one another and publicly shame one another, because who hasn't taken a couple losses in their day... Users can also check to see how many wins and losses they have.

Slash Commands
- give someone a win or loss
  - /give win/loss @username
- check how many wins or losses you have
  - /count wins/losses
- check how many wins or losses someone else has
  - /check wins/losses @username


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
