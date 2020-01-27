# FEEDweave

FEEDweave is a decentralzied social media application built on top of the [Arweave](https://www.arweave.org/) blockchain.

It is an attempt to demonstrate how a completely decentralized, yet performant and scalable, social media application can be built and deployed to production today.

You can see it running live and try it out here: [http://social.arweave.co/](http://social.arweave.co/)

FEEDweave does not use centralized infrastructure to persist its core data. The user accounts, posts, and social graph live on Arweave, a neutral backend that anyone can read and write from.

The application contained in this repo is a basic React app, and functions as a _view_ of the data. In other words, it is an example of one user interface that can be built, separate from the canonical _data_, which lives on the Arweave blockchain. Anyone can built a their own custom UI, with a different features, design, etc. This is a unique property of using a blockchain as a data backend—the blockchain serves as a guaranteed open API anyone can reuse and extend. ([Arweave App Explorer](http://explorer.arweave.co/) is another example of "view" application.)

For performance, and to offer a user experience on par with existing social media applications, FEEDweave is hosted on the web and communicates with an intermediary gateway that caches data the data, expose an HTTP API, and allow dynamic queries. Just like anyone can build their own UI on top of Arweave data, anyone can also run their own gateway. You can see the code for the gateway backing FEEDweave [here](https://github.com/denisnazarov/arweave-gateway). The Arweave community also maintains openly accessible gateways, and anyone can run their own by running a full Arweave [node](https://github.com/ArweaveTeam/arweave).

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
