"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
        console.error(`Failed to connect: ${MONGODB_URI}`);
        throw err;
    }

    // ==> We have a connection to the "test-tweets" db,
    //     starting here.
    console.log(`Connected to mongodb: ${MONGODB_URI}`);

    // ==> In typical node-callback style, any program
    //     logic that needs to use the connection needs
    //     to be invoked from within here.
    //
    // Another way to say: this is an "entry point" for
    // a database-connected application!

    // FIND
    // db.collection("tweets").find({}, (err, results) => {
    // this replaces above with a single call direct to array
    db.collection("tweets").find().toArray((err, results) => {
        // Lazy error handling:
        if (err) throw err;

        // ==> Fair warning: This is going to log a lot of stuff...
        console.log("for each item yielded by the cursor:");

        //    results.each((err, item) => console.log("  ", item));
        // ==> We could instead just slurp the items into an array:
        // a. this next code is replace with the one below it - we are going direct to array
        // now in find.
        // results.toArray((err, resultsArray) => {
        //     if (err) throw err;
        console.log("results.toArray:", results);

        db.close();
    });

});
