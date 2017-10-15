# node-esnext-boilerplate
[![Dependencies](https://david-dm.org/marshallford/node-esnext-boilerplate.svg)](https://david-dm.org/marshallford/node-esnext-boilerplate)
[![Dev Dependencies](https://david-dm.org/marshallford/node-esnext-boilerplate/dev-status.svg)](https://david-dm.org/marshallford/node-esnext-boilerplate#info=devDependencies)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

An opinionated, but ideally up to date NodeJS project boilerplate with ESnext support

|`npm run <script>`|Description|
|------------------|-----------|
|`start`|Starts transpiled app (production use)|
|`dev`|Starts app and transpiles on the fly, automatic reloads|
|`lint`|Lint all `.js` files in `/src`|


## TODO & up in the air ideas

* Testing framework

## Getting started

### Download dependencies
`npm install`

### Generate keypair
`node_modules/web-push/src/cli.js generate-vapid-keys >> keypair`

Open src/config.js, change dev.vapid.publicKey and dev.vapid.privateKey to values from keypair file.
