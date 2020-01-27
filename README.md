# FEEDweave

FEEDweave is a decentralized social media application built on top of the [Arweave](https://www.arweave.org/) blockchain.

![](https://i.imgur.com/VJVrm64.png)

It is a demonstration of how a completely decentralized, yet performant and scalable social media application can be built and deployed to production today.

You can see it running live and try it out here: [http://social.arweave.co/](http://social.arweave.co/)

FEEDweave does not use centralized infrastructure to persist its core data. The user accounts, posts, and social graph live on Arweave. Arweave functions as a neutral backend that anyone can read and write from.

The application contained in this repo is a basic React app, and functions as a _view_ of the data. In other words, it is one example of the user interfaces that can be built on top of shared data. The view is completely separate from the canonical _data_, which lives on the Arweave blockchain. Anyone can built a their own custom UI, implementing different features, design, etc. This is a unique property of using a blockchain as a data backend—the blockchain is a guaranteed open and available database anyone can reuse and extend.

_([Arweave App Explorer](http://explorer.arweave.co/)
is another example of this kind of "view" app.
It presents data from numerous apps built on Arweave, without needing to get their permission.)_

To offer a performant user experience on par with existing social media applications, FEEDweave is hosted on the web and communicates with an intermediary gateway that ingests data from Arweave and caches it, exposes an HTTP API, and allows dynamic queries. Just like anyone can build their own UI on top of Arweave data, anyone can also run their own gateway. You can see the code for the gateway backing FEEDweave [here](https://github.com/denisnazarov/arweave-gateway). The Arweave community also maintains openly accessible gateways for developers to use, and anyone can run their own by running a full Arweave [node](https://github.com/ArweaveTeam/arweave).

## FAQ

### What is Arweave?

Arweave is a new blockchain that enables permanent hosting of files in a decentralized network. Users pay a one-time fee, denominated in AR tokens, to permanently host their files on the blockchain. Anyone can later retrieve the data through Arweave gateways.

## Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
