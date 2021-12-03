const http = require('http');
const express = require('express');
const logger = require('morgan');
const debug = require('debug')('test:server');
const { graphqlHTTP } = require('express-graphql');
const { connect } = require('./database/index');
const { schema } = require('./graphQL/index')


const port = 3000;

const app = express();
app.set(port);

app.use(logger('dev'));
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

connect().then(console.log);

/**
 * Listen on provided port, on all network interfaces.
 */
const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${addr}` : `Port ${addr}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug('Listening on ' + bind);
}