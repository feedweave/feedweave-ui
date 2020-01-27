# FEEDweave

FEEDweave is a decentralzied social media application built on top of the [Arweave](https://www.arweave.org/) blockchain.

FEEDweave is a proof-of-concept to illustrate that a completely decentralized, yet performant, social media application can be built and deployed to production today.

You can see it running live and try it out here: [http://social.arweave.co/](http://social.arweave.co/)

FeedWEAVE does not use any centralized infrastructure to store its data, user accounts, or the social graph. Everything lives on Arweave, a neutral backend that anyone has permission to read and write from.

This application doesn not implement any proprietary functionality, but rather is just a _view_ of the decentralized data on Arweave. In other words, it is an example of how anyone can build a UI on top of shared and open data on Arweave. FEEDweave uses an intermediary gateway to cache data the data, expose an http API, and allow dynamic queries. Just like anyone can build their own UI, anyone can run their own gateway. You can see the code for the gateway backing FEEDweave [here](https://github.com/denisnazarov/arweave-gateway). The Arweave community also maintains openly accessible gateways, and anyone can run their own by running a full Arweave [node](https://github.com/ArweaveTeam/arweave).

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
