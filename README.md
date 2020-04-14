![Amatch login](https://i.imgur.com/M9Owwmv.png)

# :purple_heart: Amatch Dating App
*Find a date that likes the same things you like*

## :green_book: Table of contents
* [About the project](#about-the-project)
  * [Built with](#built-with)
* [Getting started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [How to use](#how-to-use)
* [Contributing](#contributing)
* [Sources](#sources)
* [License](#license)

---

## :crystal_ball: About the project
Amatch is a dating app for anyone who wants to find a date that is interested in the same things they are interested in. You're matched with other Amatch users based on the hobbies you have and you can start chatting with someone if you both like each other.

### :nut_and_bolt: Built with
Amatch is built with NodeJS and uses the following techniques:
* [MongoDB database](https://github.com/StanBankras/amatch/wiki/Database-Structure)
* [EJS templating](https://github.com/StanBankras/amatch/wiki/Templating)
* [NPM packages](https://github.com/StanBankras/amatch/wiki/NPM-Packages)

## :mag: Getting started
If you want to install Amatch on your own workstation, please follow the following chapters.

### :wrench: Prerequisites
You'll need the following tools to start the installation of Amatch:
* [NodeJS](https://nodejs.org/en/) installed on your workstation
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database

### :hammer: Installation
#### Node project setup
* Clone the project from the Github repo

`git clone git@github.com:StanBankras/amatch.git`

* Install node modules

`npm install`

#### Database setup
* Create a new database on MongoDB Atlas
* Make the following collections: **users, chats & hobbies**
* In the hobbies collection, [insert this data](https://pastebin.com/Vbh1BAep).
* Create a .env files in the root of the setup
**Use the following setup**
```
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_NAME=
SESSION_SECRET=
```

## :microscope: How to use
If the installation process was followed, you can run the Amatch project by the command:

`npm run dev`

The project will be hosted on **port 3000** if you didn't change this.

---

## :pencil2: Contributing
You are allowed to fork this repository and contribute any changes using a pull request. We will then review your contribution and allow the changes to be merged into the real project if we think they're a valuable addition.

## :bookmark_tabs: Sources
* Clark, B. (2018, June 17). Heroku Alternatives — Top 5 Picks - Brenda Clark. Retrieved April 14, 2020, from https://medium.com/@brenda.clark/heroku-alternatives-top-5-picks-9095cef91d91
* Deezer for developers. (n.d.). Retrieved 10 April 2020, from https://developers.deezer.com/login?redirect=/api
* Heroku. (n.d.). GitHub Integration (Heroku GitHub Deploys) | Heroku Dev Center. Retrieved April 14, 2020, from https://devcenter.heroku.com/articles/github-integration#enabling-github-integration
* Heroku. (n.d.-a). Configuration and Config Vars | Heroku Dev Center. Retrieved April 14, 2020, from https://devcenter.heroku.com/articles/config-vars
* K. (n.d.). kelektiv/node.bcrypt.js. Retrieved April 12, 2020, from https://github.com/kelektiv/node.bcrypt.js#usage
* Mozilla Client Side Web APIs. (2019, December 31). Retrieved 31 April 2020, from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction
* Scott, T. (2016, December 16). TechnoligyAdvice. Retrieved 30 April 2020, from https://technologyadvice.com/blog/information-technology/how-to-use-an-api/
* The Coding Train. (2019, May 17). 1.1: fetch() - Working With Data & APIs in JavaScript. Retrieved 6 May 2020, from https://www.youtube.com/watch?v=tc8DU14qX6I&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=3
* What is the use of password encryption? (2011, November 16). Retrieved April 4, 2020, from https://security.stackexchange.com/questions/8945/what-is-the-use-of-password-encryption/8948
* Wikipedia contributors. (2020a, February 28). Salt (cryptography). Retrieved April 12, 2020, from https://en.wikipedia.org/wiki/Salt_(cryptography)
* Wikipedia contributors. (2020b, April 8). Bcrypt. Retrieved April 12, 2020, from https://en.wikipedia.org/wiki/Bcrypt

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
