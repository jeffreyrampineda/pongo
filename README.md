# Pogno

Activity tracker application used to keep track of my dog’s actions throughout the day

## Installation

```bash
# Installs server and client dependencies then builds the client
# for production to the `client/build` folder
$ npm install
```

## Development

Create .env file with the following:

* MONGODB_URI_development=your_uri_string

```bash
# starts client development server
# starts and monitor for any changes in the backend server
$ npm run dev
```

## Production

Set the following environment variables:

* MONGODB_URI_development=your_uri_string

```bash
# Installs server and client dependencies then builds the client
# for production to the `client/build` folder
$ npm install

# Starts the server to serve both api and html
$ npm start
```
