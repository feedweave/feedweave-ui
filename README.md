# FEEDweave

FEEDweave is a decentralized social media application built on top of the [Arweave](https://www.arweave.org/) blockchain. This repo contains the code for its front-end UI.

It is a demonstration of how a completely decentralized, yet performant and scalable social media application can be built and deployed in production today.

You can see it running live and try it out here: [https://social.arweave.co/](https://social.arweave.co/)

![](https://i.imgur.com/VJVrm64.png)

FEEDweave does not use centralized infrastructure to persist its data. The user accounts, posts, and social graph live on Arweave. Arweave functions as a neutral backend that anyone can read and write from.

FEEDweave is also _not_ a federated architecture, meaning there is a single source of truth for all data, with strong guarantees of perpetual persistence and accessibility.

The Arweave blockchain is the backend, and `feedweave-ui` is an example of one of many user interfaces that can be built on top. This app is the **view** layer of the application, completely independent from the **data** layer on the blockchain. Anyone can build a their own custom view, implementing different features, interface design, or hosting strategy. **This is the disruptive property of using a blockchain as your datastore—it guarantees an always open and accessible backend anyone can reuse and extend, unlike today's centralized APIs that rely on the goodwill of their operators.**

_([Arweave App Explorer](http://explorer.arweave.co/)
is another example of a "view". It presents data from numerous apps built on Arweave, without needing to get their permission to build it.)_

To offer a performant user experience on par with existing social media applications, the FEEDweave UI is hosted on the [web](https://www.netlify.com/) and communicates with an [intermediary gateway](https://www.netlify.com/). The gateway ingests and caches the app's data from Arweave, exposes an HTTP API, and allows for dynamic queries. Just like anyone can build their own UI, anyone can also run their own gateway.

_(The Arweave community maintains [openly accessible](https://docs.arweave.org/developers/server/http-api) gateways for developers to use. Developers can also host their own by running a full Arweave [node](https://github.com/ArweaveTeam/arweave).)_

![Stack diagram](https://i.imgur.com/7ejyNbr.png)

### What is Arweave?

Arweave is a blockchain-based storage network that enables permanently hosting arbitrary data.

Users pay a one-time fee, denominated in AR tokens, to submit a transaction that indefinitely hosts a file on this blockchain. Anyone can later retrieve the data by querying the network.

Arweave allows tagging its data-carrying transactions with arbitrary key-value pairs. By using the tags feature, the Arweave community created a standard for using Arweave as an open, neutral, decentralized, and autonomous backend for Internet-scale social applications.

### How do Arweave apps work?

In order to distinguish one application's data from another, Arweave apps tag their transactions with a common `App-Name`.

FEEDweave uses the `App-Name: FEEDweave` tag to distinguish its posts. It also versions the posts, using a tag in the form of `App-Version: 0.0.1` to allow for schema changes that don't break UIs.

[Arweave Board](https://bkxqaor2dlei.arweave.net/pvmiu4SZKQGWAYjrLWzE_mI70u1-v8zIzQ8WaxIYURk) is a decentralized forum built on Arweave. It tags all of its transactions with `App-Name: ArBoard`, along with other tags specific to its application. Since its data model is more complex, tags allow it to create a hierarchy between transactions, organizing them by `Categories`, `Posts`, and `Replies`.

Anyone can query the data stored in Arweave by `App-Name` to retrieve all data belonging to a specific application.

Transactions grouped by `App-Name` can be thought of like all the rows or records in a traditional database of an centralized internet service. Records organized by `App-Name` can be further organized using more specifc tags, letting developers emulate database primitives like tables and relationships. Instead of traditional databases existing as disconnected silos, all the data on Arweave shares a single, universally accessible datastore. This has important implications for developer composability and extensibility.

_You can read about how Arweave works in detail in the [whitepaper](https://www.arweave.org/files/arweave-lightpaper.pdf)._

### Are Arweave apps composable and extensible?

Composability in blockchain applications was first observed in the DeFi (decentralized finance) ecosystem on the Ethereum blockchain. Because of the open nature of programs running on Ethereum (known as smart contracts), developers identified immense benefit in reusing existing components deployed by others instead of rebuilding their own. And because of the trustworthy nature of a blockchain as a computational environment, developers could confidently rely on upstream APIs continuing to exist and remain accessible. For example, a user can lock up ETH in MakerDAO to mint DAI, then locking up DAI in Compound to get leverage on a bet placed in Augur.

Arweave apps also demonstrate emergent composable behavior. FEEDweave is actually composed of multiple applications. While posts are stored in `App-Name: FEEDweave`, the application tapped into an existing identity system for human-readable names called `App-Name: arweave-id`. To add a social graph, FEEDweave taps into `App-Name: social-graph`, which is a shared social graph among multiple applications. FEEDweave also allows linking your Twitter account to your Arweave address using `App-Name: identity-link`. You can see the raw data for all of these apps in [Arweave App Explorer](https://explorer.arweave.co/).

Arweave apps are also extensible. This means that third-party developers don't need to ask the initial creators of applications to add functionality. For example, if someone wanted to add the ability to post comments to FEEDweave, they could create another transaction type tagged `App-Name: post-comments`. They would then create a fork of the FEEDweave UI that implements the ability to read and write comments. Of course, it would be up to the new developer to convince users to use the new interface. Since it is a superset of functionality of the original FEEDweave, it wouldn't disrupt the original user experience of data.

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
