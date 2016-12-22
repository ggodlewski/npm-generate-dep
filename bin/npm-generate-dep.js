#!/usr/bin/env node
'use strict';

var args = process.argv.slice(2);

var npm = require('npm');
npm.load({ 'save-dev': true }, function(err) {
    if (err) {
        console.error(err);
        return;
    }

    var packages = [];
    for (var i = 0; i < args.length; i++) {
        var fs = require('fs');
        var obj = JSON.parse(fs.readFileSync(args[i], 'utf8'));
        for (var packageName in obj) {
            // console.log(packageName+'@'+obj[packageName]);
            packages.push(packageName+'@'+obj[packageName]);
        }
    }

    npm.commands.install(packages, function(err, data) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
        // log errors or data
    });

    npm.on('log', function(message) {
        // log installation progress
        console.log(message);
    });
});
