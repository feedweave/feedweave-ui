# FEEDweave

FEEDweave is a decentralized social media application built on top of the [Arweave](https://www.arweave.org/) blockchain.

It is a demonstration of how a completely decentralized, yet performant and scalable social media application can be built and deployed to production today.

You can see it running live and try it out here: [http://social.arweave.co/](http://social.arweave.co/)

![](https://i.imgur.com/VJVrm64.png)

FEEDweave does not use centralized infrastructure to persist its data. The user accounts, posts, and social graph live on Arweave. Arweave functions as a neutral backend that anyone can read and write from.

The Arweave blockchain is the backend, and `feedweave-ui` is just one example of a user interface that can be built on top. This app represents the **view** layer, completely independent from the **data** layer that is the blockchain. Anyone can built a their own custom UI, implementing different features, interface design, or hosting strategy. This is the disruptive property of using a blockchain as a datastore—it guarantees an always open and accessible backend anyone can reuse and extend, unlike today's centralized APIs that rely on the goodwill of their operators.

_([Arweave App Explorer](http://explorer.arweave.co/)
is another example of this kind of "view" app.
It presents data from numerous apps built on Arweave, without needing to get their permission.)_

To offer a performant user experience on par with existing social media applications, the FEEDweave UI is hosted on the [web](https://www.netlify.com/) and communicates with an [intermediary gateway](https://www.netlify.com/) that ingests and caches data from Arweave, exposes an HTTP API, and allows dynamic queries. Just like anyone can build their own UI on top of Arweave data, anyone can also run their own gateway.

_(The Arweave community maintains [openly accessible](https://docs.arweave.org/developers/server/http-api) gateways for developers to use. Anyone can run their own by running a full Arweave [node](https://github.com/ArweaveTeam/arweave).)_

![Stack diagram](https://i.imgur.com/7ejyNbr.png)

### What is Arweave?

Arweave is a blockchain-based storage network that enables permanently hosting arbitrary data.

Users pay a one-time fee, denominated in AR tokens, to submit a transaction that permanently hosts a file on the blockchain. Anyone can later retrieve the data by querying the network.

Arweave allows tagging its data-carrying transactions with arbitrary key-value pairs. Leveraging the tags feature, a standard has emerged in the Arweave community for using Arweave as an open, neutral, decentralized, and autonomous backend for Internet-scale social applications.

### How do Arweave apps work?

In order to distinguish one app's data from another app's, Arweave apps tag their transactions with a common `App-Name`.

FEEDweave uses the `App-Name: FEEDweave` tag to distinguish it's post. It also versions the posts, starting with `App-Version: 0.0.1` to allow for schema changes that don't break UIs.

[Arweave Board](https://bkxqaor2dlei.arweave.net/pvmiu4SZKQGWAYjrLWzE_mI70u1-v8zIzQ8WaxIYURk), a decentralized forum, is another application built on Arweave. It tags all of its transactions with `App-Name: ArBoard`, along with other application-specific tags. Because its data model is more complex, tags allow it to create a hierarchy between transactions, grouping them by `Categories`, `Posts`, and `Replies`.

Anyone can query the data stored in Arweave by `App-Name` to retrieve all of the data that belongs to a specific application.

Similar to traditional database management systems, transactions grouped by `App-Name` can be thought of as all the records in the canonical database of an internet service. Records organized by `App-Name` can be further grouped using more specifc tags, letting developers emulate database like tables and relationships.

### Are Arweave apps composable?

## arweave-ui

### Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
