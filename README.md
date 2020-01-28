# FEEDweave

FEEDweave is a decentralized social media application built on top of the [Arweave](https://www.arweave.org/) blockchain.

It aims to demonstrate of how a completely decentralized, yet performant and scalable social media application can be built and deployed in production today.

You can see it running live and try it out here: [https://social.arweave.co/](https://social.arweave.co/)

![](https://i.imgur.com/VJVrm64.png)

FEEDweave does not use centralized infrastructure to persist its data. The user accounts, posts, and social graph live on Arweave. Arweave functions as a neutral backend that anyone can read and write from.

FEEDweave is also not a federated architecture, meaning there is a single source of truth for all data with strong guarantees of perpetual persistence and accessibility.

`feedweave-ui` is a front-end application contained in this repo. It is an example of one of many user interfaces that can be built on top application data in Arweave. This app is the **view** layer of the application, completely independent from the **data** layer on the blockchain. Anyone can build a their own custom view to any data, implementing different features, interface design, or way of hosting the app. **This is what makes using a blockchain as a datastore disruptive—it guarantees an always open and accessible backend that anyone can reuse and extend, in contrast to today's centralized APIs that constantly restrict or limit developer access.**

_([Arweave App Explorer](http://explorer.arweave.co/)
is another example of a view layer application. It presents data from numerous apps built on Arweave, without needing to get their permission to access it.)_

To offer a performant user experience on par with existing social media applications, the FEEDweave UI is hosted on the [web](https://www.netlify.com/) and communicates with an [intermediary gateway](https://www.netlify.com/). The gateway ingests and caches the app's data from Arweave, exposes an HTTP API, and allows for dynamic queries. Just like anyone can build their own UI, anyone can also run their own gateway.

_(The Arweave community also maintains [openly accessible](https://docs.arweave.org/developers/server/http-api) gateways for developers to use. Developers can host their own by running a full Arweave [node](https://github.com/ArweaveTeam/arweave).)_

![Stack diagram](https://i.imgur.com/7ejyNbr.png)

### What is Arweave?

Arweave is a blockchain-based storage network that enables permanently hosting arbitrary data.

Users pay a one-time fee, proportional to the file size and denominated in AR tokens, to submit a transaction that indefinitely hosts a file on the Arweave network. Anyone can later retrieve the data by querying the network.

Arweave allows tagging its data-carrying transactions with arbitrary key-value pairs. With the use of tags, a standard has emerged for using Arweave as an open, neutral, decentralized, and autonomous backend for Internet-scale social applications.

### How do Arweave apps work?

In order to distinguish one application's data from another, Arweave apps tag their transactions with a common `App-Name`.

FEEDweave uses the `App-Name: FEEDweave` tag to distinguish its posts from other data on Arweave. It also versions the posts, using a version tag in the form of `App-Version: 0.0.1`. This allows for schema updates that don't break legacy UIs.

[Arweave Board](https://bkxqaor2dlei.arweave.net/pvmiu4SZKQGWAYjrLWzE_mI70u1-v8zIzQ8WaxIYURk) is a decentralized forum built on Arweave. It tags all of its transactions with `App-Name: ArBoard`, along with other tags specific to its application. Since its data model is more complex, tags allow it to create a hierarchy between transactions, organizing them by `Categories`, `Posts`, and `Replies`.

Anyone can query the data stored in Arweave by `App-Name` and retrieve all data belonging to a specific application. You can explore the data from different apps on [Arweave App Explorer](https://explorer.arweave.co/).

Transactions grouped by `App-Name` can be thought of like the rows or records in a traditional database backing a centralized internet service. Records organized by `App-Name` can be further organized and filtered using more specifc tags, letting developers emulate database primitives like tables and relationships. Instead of traditional databases in centralized applications functioning as disconnected silos, all the applicatoin data on Arweave shares a single, universally accessible datastore. This has important implications for developer composability and extensibility.

_You can read about how Arweave works in detail in the [whitepaper](https://www.arweave.org/files/arweave-lightpaper.pdf)._

### How are Arweave apps composable and extensible?

Composability in blockchain applications was first observed in the DeFi (decentralized finance) ecosystem on the Ethereum blockchain. Because of the open nature of programs (also known as smart contracts) running on Ethereum, developers choose to reusing existing components launched by others instead of rebuilding their own. And because of the trustworthy nature of a blockchain computational environment, developers could confidently rely on upstream components continuing to exist and remain accessible. This kind of trust was not possible in the previous generation of centralized APIs because developers had no guarantees that the rules won't change or they wouldn't lose access. Ethereum is seeing a boom in applications built from reusable building blocks.

Arweave apps also demonstrate emergent composable behavior. FEEDweave takes advantage of this to leverage the network effects of the existing ecosystem and to make building the application easier. While posts are stored in `App-Name: FEEDweave`, the application taps into an existing identity system for human-readable names called `App-Name: arweave-id` (see its original UI [here](https://alz4bdsrvmoz.arweave.net/fGUdNmXFmflBMGI2f9vD7KzsrAc1s1USQgQLgAVT0W0)). To integrate a social graph, FEEDweave makes use of `App-Name: social-graph`, a social graph shared among multiple applications. FEEDweave also allows linking your Twitter account to your Arweave address using `App-Name: identity-link`. You can explore the raw data for these application in [Arweave App Explorer](https://explorer.arweave.co/). Because anyone can build a UI to any of these applications, you can try your hand at composing a raw transaction with [Arweave Publisher](https://publisher.arweave.co/).

Arweave apps are also extensible. Third-party developers don't need to ask creators of applications to add functionality to them. For example, if someone wanted to add the ability to post comments to FEEDweave, they could create another transaction type tagged `App-Name: post-comments`. They would then fork the FEEDweave UI and add functionality read and post comments. Of course, it would be up to the new developer to convince users to use their new interface, or to have the code merged with the orginal application, for the functionality to gain traction. Since the addition of commenting is superset of functionality of the original FEEDweave, it wouldn't disrupt the original user experience of the application, and users have the choice to use it only if they want to.

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
