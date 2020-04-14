![Amatch login](https://i.imgur.com/M9Owwmv.png)

# :purple_heart: Amatch Dating App
*Find a date that likes the same things you like*

## Table of contents
* [About the project](#about-the-project)
  * [Built with](#built-with)
* [Getting started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [How to use](#how-to-use)
* [Contributing](#contributing)
* [Sources](#sources)
* [License](#license)

## About the project
Amatch is a dating app for anyone who wants to find a date that is interested in the same things they are interested in. You're matched with other Amatch users based on the hobbies you have and you can start chatting with someone if you both like each other.

### Built with
Amatch is built with NodeJS and uses the following techniques:
* [MongoDB database](https://github.com/StanBankras/amatch/wiki/Database-Structure)
* [EJS templating](https://github.com/StanBankras/amatch/wiki/Templating)
* [NPM packages](https://github.com/StanBankras/amatch/wiki/NPM-Packages)

## Getting started
If you want to install Amatch on your own workstation, please follow the following chapters.

### Prerequisites
You'll need the following tools to start the installation of Amatch:
* [NodeJS](https://nodejs.org/en/) installed on your workstation
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) database

### Installation
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

## How to use
If the installation process was followed, you can run the Amatch project by the command:

`npm run dev`

The project will be hosted on **port 3000** if you didn't change this.

## Contributing
You are allowed to fork this repository and contribute any changes using a pull request. We will then review your contribution and allow the changes to be merged into the real project if we think they're a valuable addition.

## Sources


## License
MIT
