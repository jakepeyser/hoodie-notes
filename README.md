# hoodie-notes

![Build Status](https://travis-ci.org/jakepeyser/hoodie-notes.png)

A simple Markdown notebook application built using [React.js](https://facebook.github.io/react/) for the view layer and [Hoodie](http://hood.ie/) as the backend as a service (BaaS). The app was created as a demonstration of several patterns for using a BaaS tool like Hoodie.

## Running the app

### Prerequisites
- [Node.js](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/en/)

### Install and Build

```sh
git clone git@github.com:jakepeyser/hoodie-notes.git
cd hoodie-notes
yarn
yarn build
```

This will copy the project to your local machine and install all runtime and build dependencies.

After the dependencies are installed, transpile and bundle the front end code into the `/public` folder with webpack.

### Running the app

```sh
$ yarn start
> hoodie-notes@1.0.0 start /hoodie-notes
> hoodie

🐶  Your Hoodie app has started on: http://localhost:8080
Stop server with control + c
```

This command will start the hoodie server. Go to `localhost:8080` in your browser to start playing around with the app!
