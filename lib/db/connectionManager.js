"use strict";

const mongoose = require('mongoose');
const logger = require('bigscreen-logger');
const schemaFactory = require('./schema/schemaFactory');

function connect(options, callback) {
    var connection = mongoose.createConnection(options.connectionString, options.connectionOptions);

    connection.on('error', err => callback(err));
    connection.once('open', () => callback(null, connection));
    var obj = {connection: connection};

    if (Array.isArray(options.schema)) {
        options.schema.forEach(schema => Object.assign(obj, schemaFactory.getSchema(schema, connection)));
    }

    return obj;
}

exports.connect = connect;
exports.generateId = function () {
    return new mongoose.Types.ObjectId();
};