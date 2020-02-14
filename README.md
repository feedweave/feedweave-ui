# FEEDweave

FEEDweave is a decentralized social media application built on top of the [Arweave](https://www.arweave.org/) blockchain.

It aims to demonstrate how a completely decentralized, yet performant and scalable social media application can be built and deployed in production today.

You can see it running live and try it out here: [https://feedweave.co/](https://feedweave.co/)

![](https://i.imgur.com/VJVrm64.png)

FEEDweave does not use centralized infrastructure to persist its data. The user accounts, posts, and social graph live on Arweave. Arweave functions as a neutral backend that anyone can read and write from.

FEEDweave is also not a federated architecture, meaning there is a single source of truth for all data with strong guarantees of perpetual persistence and accessibility.

Decentralized applicatons like FEEDweave cleanly separate their view layer from their data layer. The view layer is a visual presentation of the raw data on the blockchain to the user. Views can be implemented as a web, mobile, or desktop applications. Any developer can build a ustom view to any data without permission, implementing different features, interface designs, or ways of hosting the app. **This is what makes using a blockchain as a datastore so powerful—it guarantees an always open and accessible backend for anyone to reuse, extend, and build on—in contrast to today's centralized APIs that lack trust and can change the rules or limit developer access.**

![Stack diagram](https://i.imgur.com/7ejyNbr.png)

_([Arweave App Explorer](http://explorer.arweave.co/)
is another example of a view layer application. It presents data from numerous apps built on Arweave, without requiring their permission to access it.)_

To offer a performant user experience on par with existing social networks, the FEEDweave UI is hosted on the [web](https://www.netlify.com/) and communicates with an [intermediary gateway](https://github.com/denisnazarov/arweave-gateway). The gateway ingests the app's data from Arweave, caches it, exposes an HTTP API, and supports dynamic queries. Just like anyone can build their own UI, anyone can also run their own gateway to provide a snappy UX.

_(The Arweave community also maintains [openly accessible](https://docs.arweave.org/developers/server/http-api) gateways for developers to use. Developers can host their own by running a full Arweave [node](https://github.com/ArweaveTeam/arweave).)_

### What is Arweave?

Arweave is a blockchain-based storage network that enables permanently hosting arbitrary data.

Users pay a one-time fee, proportional to a file's size and denominated in AR tokens, to submit a transaction that indefinitely hosts a file on the Arweave network. Anyone can later retrieve the data by querying the network.

Arweave allows tagging its data-carrying transactions with arbitrary key-value pairs. With the use of tags, a standard has emerged for using Arweave as an open, neutral, decentralized, and autonomous backend for Internet-scale social applications.

_You can read about how Arweave works in detail in the [whitepaper](https://www.arweave.org/files/arweave-lightpaper.pdf)._

### How do Arweave apps work?

In order to distinguish one application's data from another, Arweave apps tag their transactions with a common `App-Name`.

FEEDweave uses the `App-Name: FEEDweave` tag to distinguish its posts from other data on Arweave. It also versions the posts, using a version tag in the form of `App-Version: 0.0.1`. This allows for schema changes that don't break legacy views.

[Arweave Board](https://bkxqaor2dlei.arweave.net/pvmiu4SZKQGWAYjrLWzE_mI70u1-v8zIzQ8WaxIYURk) is another decentralized application built on Arweave. It tags all of its transactions with `App-Name: ArBoard`, along with other tags specific to its application. Since its data model is more complex, tags allow it to create a hierarchy between transactions, organizing them by `Categories`, `Posts`, and `Replies`.

Anyone can query the data stored in Arweave by `App-Name` to retrieve all data belonging to a specific application. You can explore the data from different apps on [Arweave App Explorer](https://explorer.arweave.co/), an app that utilizes querying by multiple `App-Name` tags under the hood.

Transactions grouped by `App-Name` can be thought of like the rows or records in a traditional database backing a centralized internet service. Records organized by `App-Name` can be further organized and then queried using more specifc tags, letting developers emulate database primitives like tables and relationships. Traditional databases backing centralized applications are disconnected silos with closed permission models, so developers cannot reuse functionality or extend the applications. In Arweave, all the application data shares a single, universally accessible datastore. This enables unprecedented developer composability and extensibility.

### How are Arweave apps composable and extensible?

Composability in blockchain applications was first observed in the DeFi (decentralized finance) ecosystem on the Ethereum blockchain. Because of the open nature of programs (AKA smart contracts) running on Ethereum, developers can reuse components already deployed by other developers instead of implementing their own. Some programs are especially valuable to reuse, since they contain accumulated state in the form of financial collateral. Building these from scratch would be the equivalent of every developer bootstrapping a new financial system. There are powerful network effects in sharing previously deployed components. Because of the trustworthy nature of a blockchain computational environment, developers can confidently rely on upstream components continuing to operate and remaining accessible. This kind of trust was not possible with centralized APIs because third-party developers had no enforcable guarantees of the terms or use or access rights. Ethereum is seeing increasing growth in applications built from reusable building blocks.

Arweave apps also demonstrate emergent composable behavior. FEEDweave taps in to the network effects of the existing application ecosystem on Arweave to make building itself easier. While posts are stored in `App-Name: FEEDweave`, the application uses an existing identity system for human-readable names called `App-Name: arweave-id` (see its own UI [here](https://alz4bdsrvmoz.arweave.net/fGUdNmXFmflBMGI2f9vD7KzsrAc1s1USQgQLgAVT0W0)). To integrate a social graph, FEEDweave makes use of `App-Name: social-graph`, a social graph shared among multiple applications. FEEDweave also allows linking your Twitter account to your Arweave address using `App-Name: identity-link`. You can explore the raw data for these application in [Arweave App Explorer](https://explorer.arweave.co/). Because anyone can build a UI to any of these applications, you can try your hand at composing a raw transaction with [Arweave Publisher](https://publisher.arweave.co/).

Arweave apps are also extensible. Third-party developers don't need to ask creators of applications to add functionality to them. For example, if someone wanted to add support for posting comments to FEEDweave, they could create another transaction type tagged `App-Name: post-comments`. They would then fork the FEEDweave UI and add functionality to read and post comments. Of course, it would be up to the new developer to convince users to use their version of the app. Or they could submit the feature as a pull request to the FEEDweave repo and hope that the project maintainers merge it in. Since the addition of commenting is a superset of functionality of the original FEEDweave app, it wouldn't disrupt the old user experience. Users have the choice to use FEEDweave with comments only if they want to.

## feedweave-ui

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
