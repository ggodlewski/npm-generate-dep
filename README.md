# NPM Group Dependency Generator

Generates package.json dependencies from separate files

## Sample Configuration

package.dev.json
```json
{
    "dependencies":
    {
        "babel-runtime": "^6.20.0"
    },
    "devDependencies":
    {
        "babel-core": "^6.13.2",
        "babel-loader": "^6.2.5",
        "babel-plugin-transform-runtime": "^6.15.0",
        "babel-polyfill": "^6.13.0",
        "babel-preset-es2015": "^6.13.2",
        "babel-preset-stage-0": "^6.16.0",
        "webpack": "2.1.0-beta.25",
        "webpack-dev-middleware": "1.8.3",
        "webpack-dev-server": "2.1.0-beta.2",
        "webpack-merge": "^1.1.2"
    }
}
```

package.express.json

```json
{
    "dependencies":
    {
        "body-parser": "^1.15.2",
        "cookie-parser": "^1.4.3",
        "express": "^4.14.0"
    }
}
```

## Usage

Drop your package files into project (eg: config/package.dev.json, config/package.express.json)

Run
```
npm-generate-dep config/package.dev.json config/package.express.json
```

or just:

```
npm-generate-dep config/package.*
```

It will merge all dependencies from those files and add them to package.json dependencies section by running "npm install"
