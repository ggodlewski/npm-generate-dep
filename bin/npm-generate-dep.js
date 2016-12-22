#!/usr/bin/env node
'use strict';

var args = process.argv.slice(2);
var npm = require('npm');

var managed = {};
var packages = [];
for (var i = 0; i < args.length; i++) {
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync(args[i], 'utf8'));
    if (obj.dependencies)
    for (var packageName in obj.dependencies) {
        packages.push(packageName+'@'+obj.dependencies[packageName]);
        managed[packageName] = true;
    }
}
var packagesDev = [];
for (var i = 0; i < args.length; i++) {
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync(args[i], 'utf8'));
    if (obj.devDependencies)
    for (var packageName in obj.devDependencies) {
        packagesDev.push(packageName+'@'+obj.devDependencies[packageName]);
        managed[packageName] = true;
    }
}


function install(params, packages, cb) {
    npm.load(params, function(err) {
        if (err) {
            console.error(err);
            return;
        }

        npm.commands.install(packages, function(err, data) {
            if (err) {
                console.error(err);
                return;
            }
            cb(data);
        });

        npm.on('log', function(message) {
            console.log(message);
        });
    });
}

install({ 'save-dev': true }, packagesDev, function () {
    install({ 'save': true }, packages, function () {
        var json = JSON.parse(fs.readFileSync('package.json', 'utf8'))
        var devDependencies = json.devDependencies || {};
        var dependencies = json.dependencies || {};

        var unmanaged = {};
        for (var k in dependencies) {
            if (!managed[k]) unmanaged[k] = dependencies[k];
        }
        var devUnmanaged = {};
        for (var k in devDependencies) {
            if (!managed[k]) devUnmanaged[k] = devDependencies[k];
        }

        console.warn('unmanaged dependencies:', unmanaged);
        console.warn('unmanaged devDependencies:', devUnmanaged);
    })
});
